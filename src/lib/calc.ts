// Sog'lom hisoblash funksiyalari — sof (pure), DOM'siz.
export type Gender = 'm' | 'f';

export interface BmiResult {
  value: number;
  label: string;
  tone: 'low' | 'ok' | 'high' | 'risk';
  ideal: [number, number]; // ideal vazn diapazoni, kg
  marker: number; // shkaladagi joylashuv, 0..100
}

/** Tana massasi indeksi (kg / m²) */
export function bmi(weightKg: number, heightCm: number): number {
  const h = heightCm / 100;
  if (h <= 0 || weightKg <= 0) return 0;
  return weightKg / (h * h);
}

export function bmiResult(weightKg: number, heightCm: number): BmiResult {
  const v = bmi(weightKg, heightCm);
  const h = heightCm / 100;
  const ideal: [number, number] = [round(18.5 * h * h), round(24.9 * h * h)];

  let label = 'Norma';
  let tone: BmiResult['tone'] = 'ok';
  if (v < 18.5) {
    label = 'Yetarli emas';
    tone = 'low';
  } else if (v >= 25 && v < 30) {
    label = 'Ortiqcha vazn';
    tone = 'high';
  } else if (v >= 30) {
    label = 'Semirish';
    tone = 'risk';
  }

  // Shkala 15 → 40 oralig'ida
  const marker = clamp(((v - 15) / 25) * 100, 0, 100);
  return { value: round(v), label, tone, ideal, marker };
}

/** BMR — Mifflin–St Jeor formulasi */
export function bmr(g: Gender, weightKg: number, heightCm: number, age: number): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return g === 'm' ? base + 5 : base - 161;
}

export interface KcalResult {
  tdee: number;
  daily: number; // maqsadga mos kunlik norma
  bmr: number;
  protein: number;
  carbs: number;
  fat: number;
}

/** TDEE + maqsad koeffitsienti (-15 / 0 / +10 %) */
export function kcalPlan(
  g: Gender,
  weightKg: number,
  heightCm: number,
  age: number,
  activity: number,
  goalPct: number
): KcalResult {
  const b = bmr(g, weightKg, heightCm, age);
  const tdee = b * activity;
  const daily = Math.max(1200, tdee * (1 + goalPct / 100));

  // Oqsil: vazn × 1,6–1,8 g; yog': vazn × 0,9 g; qolgan — uglevod
  const protein = Math.round(weightKg * (goalPct < 0 ? 1.8 : 1.6));
  const fat = Math.round(weightKg * 0.9);
  const carbs = Math.max(0, Math.round((daily - protein * 4 - fat * 9) / 4));

  return { tdee: Math.round(tdee), daily: Math.round(daily), bmr: Math.round(b), protein, carbs, fat };
}

/** Suv normasi: vazn × ml/1kg (faollikga qarab) */
export function waterLiters(weightKg: number, mlPerKg: number): number {
  return Math.round(weightKg * mlPerKg) / 1000;
}

export interface StepsResult {
  goal: number;
  strideM: number;
  km: number;
  kcal: number;
}

/** Kunlik qadam maqsadi va yurishda yo'qiladigan kcal */
export function stepsPlan(heightCm: number, weightKg: number): StepsResult {
  const strideM = heightCm * 0.00415; // qadam uzunligi, m
  const goal = 8000;
  const km = round((goal * strideM) / 1000);
  const kcal = Math.round(km * weightKg * 1.0); // yurishda ~1 kcal/kg/km
  return { goal, strideM: round(strideM), km, kcal };
}

export function round(v: number, d = 1): number {
  const p = 10 ** d;
  return Math.round(v * p) / p;
}

export function clamp(v: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, v));
}

/** FS: raqamlarni 1000 dan ajratib formatlash (12 400) */
export function nf(v: number): string {
  return new Intl.NumberFormat('uz-UZ').format(v);
}
