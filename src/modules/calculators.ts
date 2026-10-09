import { bmiResult, kcalPlan, nf, stepsPlan, waterLiters } from '../lib/calc';
import { EVENTS, bus, load, save } from '../lib/store';

const $ = <T extends HTMLElement = HTMLElement>(id: string): T => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element topilmadi: #${id}`);
  return el as T;
};

const num = (el: HTMLInputElement, fallback: number): number => {
  const v = parseFloat(el.value);
  return Number.isFinite(v) && v > 0 ? v : fallback;
};

const set = (id: string, text: string): void => {
  $(id).textContent = text;
};

interface SavedProfile {
  gender: 'm' | 'f';
  age: number;
  height: number;
  weight: number;
}

export function initCalculators(): void {
  const bmiHeight = $<HTMLInputElement>('bmiHeight');
  const bmiWeight = $<HTMLInputElement>('bmiWeight');
  const kcalGender = $<HTMLSelectElement>('kcalGender');
  const kcalAge = $<HTMLInputElement>('kcalAge');
  const kcalHeight = $<HTMLInputElement>('kcalHeight');
  const kcalWeight = $<HTMLInputElement>('kcalWeight');
  const kcalActivity = $<HTMLSelectElement>('kcalActivity');
  const kcalGoal = $<HTMLSelectElement>('kcalGoal');
  const waterWeight = $<HTMLInputElement>('waterWeight');
  const waterActivity = $<HTMLSelectElement>('waterActivity');
  const stepHeight = $<HTMLInputElement>('stepHeight');
  const stepWeight = $<HTMLInputElement>('stepWeight');

  // —— Avvalgi ma'lumotlarni tiklash ——
  const profile = load<SavedProfile | null>('profile', null);
  if (profile) {
    kcalGender.value = profile.gender;
    kcalAge.value = String(profile.age);
    for (const el of [bmiHeight, kcalHeight, stepHeight]) el.value = String(profile.height);
    for (const el of [bmiWeight, kcalWeight, waterWeight, stepWeight]) el.value = String(profile.weight);
  }

  let bmiTone = 'ok';

  const renderBmi = (): void => {
    const r = bmiResult(num(bmiWeight, 70), num(bmiHeight, 172));
    bmiTone = r.tone;
    set('bmiValue', r.value ? String(r.value) : '—');
    const tag = $('bmiTag');
    tag.textContent = r.label;
    tag.style.color =
      r.tone === 'ok' ? 'var(--brand-700)' : r.tone === 'low' ? '#0369a1' : r.tone === 'high' ? '#b45309' : '#b91c1c';
    $('bmiMarker').style.left = `${r.marker}%`;
    $('bmiNote').innerHTML = `Ideal vazn diapazoni: <b>${r.ideal[0]} – ${r.ideal[1]} kg</b> · bo'y ${num(bmiHeight, 172)} sm uchun`;
  };

  const renderKcal = (): void => {
    const plan = kcalPlan(
      kcalGender.value as 'm' | 'f',
      num(kcalWeight, 70),
      num(kcalHeight, 172),
      num(kcalAge, 24),
      parseFloat(kcalActivity.value),
      parseFloat(kcalGoal.value)
    );
    set('kcalValue', nf(plan.daily));
    set('kcalTag', plan.tdee > 0 ? `Sutoningiz: ${nf(plan.tdee)} kcal` : '—');

    const macros = document.querySelectorAll('#kcalMacros .macro b');
    if (macros.length === 3) {
      macros[0].textContent = `${plan.protein} g`;
      macros[1].textContent = `${plan.carbs} g`;
      macros[2].textContent = `${plan.fat} g`;
    }

    save('profile', {
      gender: kcalGender.value as 'm' | 'f',
      age: num(kcalAge, 24),
      height: num(kcalHeight, 172),
      weight: num(kcalWeight, 70),
    } satisfies SavedProfile);

    bus.emit(EVENTS.TARGET, plan.daily);
  };

  const renderWater = (): void => {
    const l = waterLiters(num(waterWeight, 70), parseFloat(waterActivity.value));
    set('waterValue', String(l));
    set('waterTag', `≈ ${Math.round(l * 1000 / 250)} stakan (250 ml)`);
  };

  const renderSteps = (): void => {
    const p = stepsPlan(num(stepHeight, 172), num(stepWeight, 70));
    set('stepGoal', nf(p.goal));
    set('stepKcal', `≈ ${p.kcal}`);
    set('stepNote', `Qadamlar masofasi: <b>${p.km} km</b> (qadam ${p.strideM} m) · vazn ${num(stepWeight, 70)} kg uchun`);
  };

  const renderAll = (): void => {
    renderBmi();
    renderKcal();
    renderWater();
    renderSteps();
  };

  // —— Bir xil maydonlarni sinxronlash (bo'y / vazn) ——
  const syncGroup = (els: HTMLInputElement[]): void => {
    els.forEach((el) =>
      el.addEventListener('input', () => {
        const v = el.value;
        els.forEach((other) => {
          if (other !== el && document.activeElement !== other) other.value = v;
        });
        renderAll();
      })
    );
  };

  syncGroup([bmiHeight, kcalHeight, stepHeight]);
  syncGroup([bmiWeight, kcalWeight, waterWeight, stepWeight]);

  for (const el of [kcalGender, kcalAge, kcalActivity, kcalGoal]) {
    el.addEventListener('input', renderAll);
    el.addEventListener('change', renderAll);
  }
  waterActivity.addEventListener('change', renderWater);

  renderAll();

  // BMI holatini boshqa joyda ishlatish uchun (maslahatchi)
  (window as unknown as Record<string, unknown>).__sqBmiTone = (): string => bmiTone;
}
