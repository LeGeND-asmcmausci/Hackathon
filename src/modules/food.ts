import { FOODS, FOOD_CATEGORIES, type Food } from '../data/foods';
import { EVENTS, bus, clear, load, save, todayKey } from '../lib/store';

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element topilmadi: #${id}`);
  return el as T;
};

interface Entry {
  id: string;
  n: number; // necha marta qo'shilgan
}

const state = {
  target: load<number>('target', 2000),
  entries: load<Entry[]>('rationson', [] as Entry[]),
  query: '',
  cat: '' as string,
};

const RING_R = 60;
const RING_C = 2 * Math.PI * RING_R;

function todayEntries(): Entry[] {
  const day = todayKey();
  const savedDay = load<string>('rationsonDay', '');
  if (savedDay !== day) {
    state.entries = [];
    save('rationsonDay', day);
    save('rationson', state.entries);
  }
  return state.entries;
}

function totalKcal(): number {
  const entries = todayEntries();
  return entries.reduce((sum, e) => {
    const f = FOODS.find((x) => x.id === e.id);
    return sum + (f ? f.kcal * e.n : 0);
  }, 0);
}

function renderCatalog(): void {
  const grid = $('foodGrid');
  const q = state.query.trim().toLowerCase();
  const list = FOODS.filter(
    (f) => (!state.cat || f.category === state.cat) && (!q || f.name.toLowerCase().includes(q))
  );

  $('foodEmpty').hidden = list.length > 0;
  grid.innerHTML = list
    .map(
      (f) => `
      <article class="food-card">
        <div class="food-card__top">
          <span class="food-card__name">${f.name}</span>
          <span class="food-card__kcal">${f.kcal} kcal</span>
        </div>
        <div class="food-card__meta">${f.portion} · ${f.category}</div>
        <div class="food-card__macros"><span>Oqsil ${f.p} g</span><span>Uglerod ${f.c} g</span><span>Yog' ${f.f} g</span></div>
        <button class="food-card__add" type="button" data-id="${f.id}">+ Ratsonga qo'shish</button>
      </article>`
    )
    .join('');
}

function renderRation(): void {
  const kcal = totalKcal();
  const pct = state.target > 0 ? kcal / state.target : 0;
  const shown = Math.min(pct, 1);

  $('foodKcal').textContent = String(kcal);
  $('foodTarget').textContent = String(state.target);

  const ring = $('foodRing');
  ring.style.strokeDasharray = String(RING_C);
  ring.style.strokeDashoffset = String(RING_C * (1 - shown));
  ring.style.stroke = pct > 1 ? 'var(--red)' : pct > 0.85 ? 'var(--amber)' : 'var(--brand)';

  $('foodBar').style.width = `${shown * 100}%`;

  const hint = $('foodHint');
  if (kcal === 0) hint.textContent = 'Taom qo\'shing — hisob boshlansin.';
  else if (pct <= 1) hint.textContent = `Normagacha ${state.target - kcal} kcal qoldi ✅`;
  else hint.textContent = `Norma ${kcal - state.target} kcal ortdi ⚠️ — yengilroq ovqatlaning`;

  const ul = $('foodList');
  if (state.entries.length === 0) {
    ul.innerHTML = '<li style="justify-content:center;color:var(--muted)">Hozircha bo\'sh</li>';
  } else {
    ul.innerHTML = state.entries
      .map((e, i) => {
        const f = FOODS.find((x) => x.id === e.id) as Food;
        return `<li><span>${f.name}${e.n > 1 ? ` ×${e.n}` : ''}</span><b>${f.kcal * e.n} kcal</b>
          <button type="button" data-rm="${i}" aria-label="O'chirish">✕</button></li>`;
      })
      .join('');
  }

  const heroKcal = document.getElementById('heroKcal');
  if (heroKcal) heroKcal.textContent = `${kcal} / ${state.target}`;
}

function persist(): void {
  save('rationson', state.entries);
  save('rationsonDay', todayKey());
  bus.emit(EVENTS.KCAL, totalKcal());
  renderRation();
}

export function initFood(): void {
  // Toifalar
  $('foodCats').innerHTML = ['<button class="chip is-active" type="button" data-cat="">Barchasi</button>']
    .concat(FOOD_CATEGORIES.map((c) => `<button class="chip" type="button" data-cat="${c}">${c}</button>`))
    .join('');

  $('foodCats').addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-cat]');
    if (!btn) return;
    state.cat = btn.dataset.cat ?? '';
    document.querySelectorAll('#foodCats .chip').forEach((c) => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    renderCatalog();
  });

  $('foodSearch').addEventListener('input', (e) => {
    state.query = (e.target as HTMLInputElement).value;
    renderCatalog();
  });

  $('foodGrid').addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-id]');
    if (!btn) return;
    const id = btn.dataset.id as string;
    todayEntries();
    const found = state.entries.find((x) => x.id === id);
    if (found) found.n += 1;
    else state.entries.push({ id, n: 1 });
    btn.textContent = '✓ Qo\'shildi';
    setTimeout(() => (btn.textContent = "+ Ratsonga qo'shish"), 700);
    persist();
  });

  $('foodList').addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-rm]');
    if (!btn) return;
    const idx = Number(btn.dataset.rm);
    const entry = state.entries[idx];
    if (!entry) return;
    entry.n -= 1;
    if (entry.n <= 0) state.entries.splice(idx, 1);
    persist();
  });

  $('foodClear').addEventListener('click', () => {
    state.entries = [];
    clear('rationson');
    persist();
  });

  bus.on<number>(EVENTS.TARGET, (target) => {
    state.target = target;
    save('target', target);
    renderRation();
  });

  renderCatalog();
  todayEntries();
  renderRation();
  bus.emit(EVENTS.KCAL, totalKcal());
}
