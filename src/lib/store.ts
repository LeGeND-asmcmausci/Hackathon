// Kichik pub/sub + localStorage saqlash.
type Handler<T> = (payload: T) => void;

class Bus {
  private map = new Map<string, Set<Handler<never>>>();

  on<T>(event: string, fn: Handler<T>): void {
    if (!this.map.has(event)) this.map.set(event, new Set());
    this.map.get(event)!.add(fn as Handler<never>);
  }

  emit<T>(event: string, payload: T): void {
    this.map.get(event)?.forEach((fn) => (fn as Handler<T>)(payload));
  }
}

export const bus = new Bus();

export const EVENTS = {
  TARGET: 'sq:target', // kunlik kaloriya normasi o'zgardi
  KCAL: 'sq:kcal', // ratson kcal o'zgardi
  SCORE: 'sq:score', // bugungi challenge natijasi o'zgardi
} as const;

const PREFIX = 'sq:v1:';

export function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

export function save(key: string, value: unknown): void {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* kvota to'lgan bo'lsa — jim o'tamiz */
  }
}

export function clear(key: string): void {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {
    /* no-op */
  }
}

/** Bugungi sana kaliti: 2026-10-09 */
export function todayKey(d = new Date()): string {
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  const day = `${d.getDate()}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}-${day}`;
}

/** 7 kunlik verja (eski → yangi) */
export function lastDays(n: number, from = new Date()): string[] {
  const out: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(from);
    d.setDate(from.getDate() - i);
    out.push(todayKey(d));
  }
  return out;
}

export const DAY_NAMES_UZ = ['Yak', 'Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan'];

export function shortDay(key: string): string {
  const [y, m, d] = key.split('-').map(Number);
  return DAY_NAMES_UZ[new Date(y, m - 1, d).getDay()];
}
