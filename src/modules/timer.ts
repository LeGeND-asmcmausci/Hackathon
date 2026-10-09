const $ = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element topilmadi: #${id}`);
  return el as T;
};

const R = 96;
const C = 2 * Math.PI * R;

let totalMs = 45 * 60 * 1000;
let leftMs = totalMs;
let running = false;
let phase: 'work' | 'break' = 'work';
let deadline = 0;
let timer: ReturnType<typeof setInterval> | null = null;

let ctx: AudioContext | null = null;

function beep(times = 3): void {
  try {
    ctx ??= new AudioContext();
    for (let i = 0; i < times; i++) {
      const t = ctx.currentTime + i * 0.25;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = phase === 'work' ? 660 : 880;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.25, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      osc.connect(gain).connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.22);
    }
  } catch {
    /* audio mavjud emas — jim o'tamiz */
  }
}

function fmt(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(s / 60);
  return `${`${m}`.padStart(2, '0')}:${`${s % 60}`.padStart(2, '0')}`;
}

function paint(): void {
  const ratio = totalMs > 0 ? leftMs / totalMs : 0;
  const ring = $('timerRing');
  ring.style.strokeDasharray = String(C);
  ring.style.strokeDashoffset = String(C * (1 - ratio));
  ring.style.stroke = phase === 'work' ? 'var(--brand)' : 'var(--amber)';

  $('timerDisplay').textContent = fmt(leftMs);
  const stateEl = $('timerState');
  if (!running && leftMs === totalMs) stateEl.textContent = 'tayyor';
  else if (running) stateEl.textContent = phase === 'work' ? 'ishda' : 'damda';
  else stateEl.textContent = 'to\'xtatildi';

  $('timerToggle').textContent = running ? 'To\'xtatish ⏸' : 'Boshlash ▶';
  document.title = running ? `${fmt(leftMs)} · Sog'lomQadam` : "Sog'lomQadam — sog'lom turmush tarzi platformasi";
}

function stop(): void {
  if (timer) clearInterval(timer);
  timer = null;
  running = false;
}

function finish(): void {
  stop();
  beep();
  if (phase === 'work') {
    // Ish tugadi → 5 daqiqalik tanaffus avtomatik boshlanadi
    phase = 'break';
    totalMs = 5 * 60 * 1000;
    leftMs = totalMs;
    start();
    $('timerState').textContent = 'dam oling!';
    toast('⏰ Ish vaqti tugadi! 5 daqiqalik tanaffus boshlandi — ko\'zingizni damlang va 200 ml suv iching.');
  } else {
    phase = 'work';
    leftMs = totalMs;
    toast('💪 Tanaffus tugadi. Ishga qayting — keyingi daqiqa sizniki!');
  }
  paint();
}

function toast(text: string): void {
  const el = document.createElement('div');
  el.className = 'toast';
  el.setAttribute('role', 'status');
  el.textContent = text;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add('is-show'));
  setTimeout(() => {
    el.classList.remove('is-show');
    setTimeout(() => el.remove(), 400);
  }, 5000);
}

function start(): void {
  if (running) return;
  running = true;
  deadline = Date.now() + leftMs;
  timer = setInterval(() => {
    leftMs = deadline - Date.now();
    if (leftMs <= 0) {
      leftMs = 0;
      paint();
      finish();
      return;
    }
    paint();
  }, 250);
  paint();
}

export function initTimer(): void {
  $('timerRing').style.strokeDasharray = String(C);

  $('timerToggle').addEventListener('click', () => {
    if (running) {
      leftMs = Math.max(0, deadline - Date.now());
      stop();
      paint();
    } else {
      if (leftMs <= 0) leftMs = totalMs;
      start();
    }
  });

  $('timerReset').addEventListener('click', () => {
    stop();
    phase = 'work';
    leftMs = totalMs;
    paint();
  });

  $('timerPresets').addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-min]');
    if (!btn) return;
    document.querySelectorAll('#timerPresets .chip').forEach((c) => c.classList.remove('is-active'));
    btn.classList.add('is-active');
    stop();
    const min = Number(btn.dataset.min);
    phase = min === 5 ? 'break' : 'work';
    totalMs = min * 60 * 1000;
    leftMs = totalMs;
    paint();
  });

  paint();
}
