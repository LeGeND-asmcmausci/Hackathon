import { EVENTS, bus, clear, lastDays, load, save, shortDay, todayKey } from '../lib/store';

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element topilmadi: #${id}`);
  return el as T;
};

interface Habit {
  id: string;
  icon: string;
  label: string;
}

const HABITS: Habit[] = [
  { id: 'steps', icon: '🚶', label: '8 000 qadam yurish' },
  { id: 'water', icon: '💧', label: 'Kunlik suv normasini ichish' },
  { id: 'workout', icon: '🏋️', label: '30 daqiqa mashq qilish' },
  { id: 'veg', icon: '🥗', label: '250 g meva yoki sabzavot' },
  { id: 'sleep', icon: '😴', label: '7+ soat uxlash' },
  { id: 'break', icon: '⏱️', label: '45 daqiqada bir dam olish' },
];

interface History {
  [day: string]: number; // 0..100
}

const history = load<History>('history', {} as History);
let todayChecks = load<Record<string, boolean>>('checks', {} as Record<string, boolean>);

function pctOf(checks: Record<string, boolean>): number {
  const done = HABITS.filter((h) => checks[h.id]).length;
  return Math.round((done / HABITS.length) * 100);
}

function currentPct(): number {
  const saved = history[todayKey()];
  return typeof saved === 'number' ? saved : pctOf(todayChecks);
}

function streak(): number {
  let n = 0;
  const days = lastDays(60); // eski → yangi
  for (let i = days.length - 1; i >= 0; i--) {
    const day = days[i];
    const pct = history[day];
    if (pct === undefined) {
      if (day === todayKey()) continue; // bugun hali yakunlanmagan — e'vaz qilamiz
      break;
    }
    if (pct >= 60) n++;
    else break;
  }
  return n;
}

function setScoreUi(): void {
  const pct = currentPct();
  const nav = document.getElementById('navScore');
  if (nav) nav.textContent = `${pct}%`;
  const heroScore = document.getElementById('heroScore');
  if (heroScore) heroScore.textContent = `${pct}%`;
  const ring = document.getElementById('heroRing');
  if (ring) {
    const r = 52;
    const c = 2 * Math.PI * r;
    ring.style.strokeDasharray = String(c);
    ring.style.strokeDashoffset = String(c * (1 - pct / 100));
  }
  const water = document.getElementById('heroWater');
  if (water) water.textContent = todayChecks.water ? '2 / 2 L' : '0 / 2 L';
  bus.emit(EVENTS.SCORE, pct);
}

function renderHabits(): void {
  $('habitsList').innerHTML = HABITS.map(
    (h) => `
    <li>
      <label class="habit ${todayChecks[h.id] ? 'is-done' : ''}" data-habit="${h.id}">
        <input type="checkbox" ${todayChecks[h.id] ? 'checked' : ''} />
        <span class="habit__box">✓</span>
        <span class="habit__text">${h.icon} ${h.label}</span>
      </label>
    </li>`
  ).join('');
}

function renderKpis(): void {
  const days = lastDays(7);
  const values = days.map((d) => history[d] ?? 0);
  const best = Math.max(...values, 0);
  const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  const full = days.filter((d) => (history[d] ?? 0) >= 80).length;

  $('kpiBest').textContent = `${best}%`;
  $('kpiAvg').textContent = `${avg}%`;
  $('kpiDone').textContent = String(full);
  $('streakValue').textContent = String(streak());
}

function drawChart(): void {
  const canvas = $<HTMLCanvasElement>('weekChart');
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 520;
  const cssH = 260;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;
  canvas.style.height = `${cssH}px`;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssW, cssH);

  const days = lastDays(7);
  const pad = { l: 34, r: 8, t: 16, b: 30 };
  const w = cssW - pad.l - pad.r;
  const h = cssH - pad.t - pad.b;

  // Setkalar
  ctx.strokeStyle = '#e2eae5';
  ctx.fillStyle = '#64766e';
  ctx.font = '11px Manrope, sans-serif';
  ctx.textAlign = 'right';
  for (const g of [0, 25, 50, 75, 100]) {
    const y = pad.t + h - (g / 100) * h;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(pad.l + w, y);
    ctx.stroke();
    ctx.fillText(`${g}`, pad.l - 6, y + 4);
  }

  const slot = w / days.length;
  const barW = Math.min(38, slot * 0.55);

  days.forEach((day, i) => {
    const pct = history[day] ?? 0;
    const isToday = day === todayKey();
    const x = pad.l + slot * i + (slot - barW) / 2;
    const barH = (pct / 100) * h;
    const y = pad.t + h - barH;

    // Orqa fon (to'liq balandlik)
    ctx.fillStyle = isToday ? 'rgba(13,155,99,0.08)' : 'rgba(12,26,21,0.05)';
    roundRect(ctx, x, pad.t, barW, h, 7);
    ctx.fill();

    if (pct > 0) {
      ctx.fillStyle = pct >= 80 ? '#0d9b63' : pct >= 40 ? '#f59e0b' : '#ef4444';
      roundRect(ctx, x, y, barW, barH, 7);
      ctx.fill();
      ctx.fillStyle = '#33443d';
      ctx.textAlign = 'center';
      ctx.fillText(`${pct}`, x + barW / 2, y - 5);
    }

    ctx.fillStyle = isToday ? '#0d9b63' : '#64766e';
    ctx.textAlign = 'center';
    ctx.font = `${isToday ? '700' : '500'} 11px Manrope, sans-serif`;
    ctx.fillText(shortDay(day), x + barW / 2, pad.t + h + 18);
  });
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, w / 2, Math.max(h, 0.1) / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function refresh(): void {
  renderHabits();
  renderKpis();
  drawChart();
  setScoreUi();
}

export function initChallenge(): void {
  const dateEl = $('challengeDate');
  dateEl.textContent = new Intl.DateTimeFormat('uz-UZ', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  }).format(new Date());

  $('habitsList').addEventListener('click', (e) => {
    const label = (e.target as HTMLElement).closest<HTMLElement>('[data-habit]');
    if (!label) return;
    e.preventDefault();
    const id = label.dataset.habit as string;
    todayChecks[id] = !todayChecks[id];
    save('checks', todayChecks);
    // Kun yakunlangan bo'lsa — yangilaymiz
    if (history[todayKey()] !== undefined) delete history[todayKey()];
    save('history', history);
    refresh();
  });

  $('finishDay').addEventListener('click', () => {
    const pct = pctOf(todayChecks);
    history[todayKey()] = pct;
    save('history', history);
    const msg = $('challengeMsg');
    if (pct === 100) msg.textContent = '🏆 A\'lo! Barcha vazifalar bajarildi — streak yangilandi!';
    else if (pct >= 60) msg.textContent = `✅ Yaxshi natija (${pct}%). Streak saqlanib qoldi!`;
    else if (pct > 0) msg.textContent = `🙂 ${pct}%. Ertaga yana urinib ko'ring — kamida 60% kerak.`;
    else msg.textContent = 'Hali hech narsa belgilanmagan. Vazifalarni boshlang 👇';
    refresh();
  });

  $('resetAll').addEventListener('click', () => {
    if (!confirm('Barcha natijalar o\'chirilsinmi?')) return;
    clear('history');
    clear('checks');
    for (const k of Object.keys(history)) delete history[k];
    todayChecks = {};
    $('challengeMsg').textContent = '';
    refresh();
  });

  $('navStats').addEventListener('click', () => {
    document.getElementById('challenge')?.scrollIntoView({ behavior: 'smooth' });
  });

  window.addEventListener('resize', () => {
    clearTimeout(drawTimer);
    drawTimer = setTimeout(drawChart, 150);
  });

  refresh();
}

let drawTimer: ReturnType<typeof setTimeout>;
