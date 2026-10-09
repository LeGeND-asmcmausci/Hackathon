import { EXERCISES, GOAL_LABEL, LEVEL_LABEL, type Exercise, type Kind, type Level } from '../data/exercises';

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element topilmadi: #${id}`);
  return el as T;
};

type Goal = 'fat' | 'strength' | 'cardio';

const DAY_SETS: Record<string, string[]> = {
  '3': ['Dushanba', 'Chorshanba', 'Juma'],
  '4': ['Dushanba', 'Seshanba', 'Chorshanba', 'Juma'],
  '5': ['Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma'],
};

const MAIN_COUNT: Record<string, number> = { '15': 4, '30': 6, '45': 8 };

/** Maqsadga mos harakat nisbati */
function kindMix(goal: Goal): Kind[] {
  if (goal === 'fat') return ['kuch', 'kardio', 'kuch', 'kardio', 'kuch', 'kardio', 'kuch', 'kardio'];
  if (goal === 'cardio') return ['kardio', 'kardio', 'kuch', 'kardio', 'kardio', 'kuch', 'kardio', 'kardio'];
  return ['kuch', 'kuch', 'kuch', 'kardio', 'kuch', 'kuch', 'kardio', 'kuch'];
}

/** Oldingi kundan farqli reja uchun sekin aylanma tanlash */
function pickPlan(goal: Goal, count: number, seed: number): Exercise[] {
  const mix = kindMix(goal);
  const pool: Exercise[] = [];
  for (let i = 0; i < count; i++) {
    const kind = mix[i % mix.length];
    const candidates = EXERCISES.filter((e) => e.kind === kind);
    // Har bir mashq reja davomida bir marta ishlatilsin
    const fresh = candidates.filter((e) => !pool.includes(e));
    const source = fresh.length > 0 ? fresh : candidates;
    const idx = (seed * 3 + i * 2) % source.length;
    pool.push(source[idx]);
  }
  // Oxirida 2 ta cho'zilish
  const stretch = EXERCISES.filter((e) => e.kind === "cho'zilish");
  pool.push(stretch[seed % stretch.length], stretch[(seed + 3) % stretch.length]);
  return pool;
}

function renderPlan(goal: Goal, level: Level, days: string, duration: string): void {
  const dayNames = DAY_SETS[days];
  const count = MAIN_COUNT[duration];
  const planEl = $('workoutPlan');

  planEl.innerHTML = dayNames
    .map((day, i) => {
      const exs = pickPlan(goal, count, i);
      const rows = exs
        .map(
          (e) => `<li>
            <div><b>${e.name}</b><br /><span>${e.note}</span></div>
            <b>${e.rx[level]}</b>
          </li>`
        )
        .join('');
      return `
        <article class="plan__day">
          <div class="plan__dayhead"><b>${day}</b><span>${duration} daqiqa</span></div>
          <ul class="plan__exs">${rows}</ul>
          <div class="plan__warm">
            🔥 Kirish: 3 daq yengil yurish + bo'yin/oyoq aylantirish ·
            ❄️ Yakun: 5 daq cho'zilish va 200–300 ml suv
          </div>
        </article>`;
    })
    .join('');

  const summary = document.createElement('p');
  summary.className = 'calc__note';
  summary.style.gridColumn = '1 / -1';
  summary.innerHTML = `Reja: <b>${GOAL_LABEL[goal]}</b> · <b>${LEVEL_LABEL[level]}</b> daraja ·
    haftada <b>${days} kun</b> · jami <b>${count}+2</b> mashq/kun. Har hafta rejani yangilab turing.`;
  planEl.appendChild(summary);
}

export function initWorkout(): void {
  const form = $<HTMLFormElement>('workoutForm');

  const generate = (): void => {
    renderPlan(
      $<HTMLSelectElement>('wGoal').value as Goal,
      $<HTMLSelectElement>('wLevel').value as Level,
      $<HTMLSelectElement>('wDays').value,
      $<HTMLSelectElement>('wDuration').value
    );
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    generate();
  });
  for (const id of ['wGoal', 'wLevel', 'wDays', 'wDuration']) {
    $(id).addEventListener('change', generate);
  }

  generate();
}
