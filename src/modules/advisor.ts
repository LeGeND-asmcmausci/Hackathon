// Qoidalar asosidagi maslahatchi — hech qanday tashqi API yo'q.
interface Rule {
  keys: string[];
  answer: () => string;
}

const $ = (id: string): HTMLElement => {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element topilmadi: #${id}`);
  return el;
};

const text = (id: string, fallback = '—'): string => $(id).textContent?.trim() || fallback;

/** o'/g'/0 harflarini soddalashtirish (mushtasaro qidiruv uchun) */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ʼ'ʻ`]/g, '')
    .replace(/o'/g, 'o')
    .replace(/g'/g, 'g')
    .replace(/sh|ch/g, 's')
    .replace(/[^a-z0-9\s]/g, ' ');
}

const RULES: Rule[] = [
  {
    keys: ['salom', 'assalomu', 'salomu', 'hey'],
    answer: () => 'Salom! 👋 Men Sog\'lov maslahatchiman. BMI, kaloriya, suv, mashq va ovqatlanish bo\'yicha savol bering — yoki pastdagi tayyor savollarni tanlang.',
  },
  {
    keys: ['suv', 'ichimlik', 'litr', 'stakan'],
    answer: () => `Sizning normangiz: <b>${text('waterValue')} litr</b> (${text('waterTag')}). Qoida: har ovqatdan yarim soat oldin bir stakan, terlaganda +300–500 ml. Odamning 60–70% tarkibi suv — yetishmasa charchash va bosh og'rig'i kuchayadi.`,
  },
  {
    keys: ['kaloriya', 'kcal', 'norma', 'ratsion', 'parhez', 'kamaytir', 'semir'],
    answer: () => `Kunlik normangiz: <b>${text('kcalValue')} kcal</b> (${text('kcalTag')}). Vazn kamaytirish uchun bu qiymatdan 10–15% kam yeying (kuniga ~150–250 kcal defitsit) — bu haftada 0,3–0,5 kg yo'qishga teng. Oqsilni ko'paytiring (tovuq, tuxum, qurut, loviya) va«och qolish»ga o'tmang.`,
  },
  {
    keys: ['bmi', 'massa', 'indeks', 'normal vazn'],
    answer: () => `Sizning BMI: <b>${text('bmiValue')}</b> — ${text('bmiTag').toLowerCase()}. ${text('bmiNote')}. BMI faqat boshlang'ich bahodir: mushak ko'p bo'lsa u yuqori ko'rinadi, shuning uchun bel atrofi (erkak <94 sm, ayol <80 sm) bilan birga kuzating.`,
  },
  {
    keys: ['mashq', 'trenajyor', 'sport', 'fitnes', 'boshlash'],
    answer: () => "Boshlang'ich uchun: haftada 3 kun × 30 daqiqa. Yuqoridagi «Uy sharoitidagi mashq rejasi» bo'limidan reja oling. Tartib: 5 daqiqalik yengil yurish (qizinish) → asosiy mashqlar → 5 daqiqa cho'zilish. Birinchi 2 haftada og'riq emas, yengillik his qilishingiz kerak — 48 soatdan ortiq davom etadigan og'riq bo'lsa, shifokorga murojaat qiling.",
  },
  {
    keys: ['ovqat', 'taom', 'yeyish', 'nonushta', 'tushlik', 'kechki', 'nima yey'],
    answer: () => {
      const target = text('foodTarget', '2000');
      const eaten = text('foodKcal', '0');
      return `Bugun hozirgacha: <b>${eaten} / ${target} kcal</b>. Tavsiya: tushlikda o'rikli oshning yarim porsiyasi (≈350 kcal) + achchiq-chuchuk salat, kechki ovqat yengilroq — baliq yoki tovuq + sabzavot. «Milliy taomlar bazasi» bo'limidan taom qo'shsangiz, hisob avtomatik yuradi.`;
    },
  },
  {
    keys: ['qadam', 'yurish', 'piyoda', 'garov'],
    answer: () => `Kunlik maqsad: <b>${text('stepGoal', '8 000')} qadam</b> (${text('stepNote', '')}). Eng oson yo'l: har bir qo'ng'iroqda turib yurish, lift o'rniga zinapoya. 8 000 qadam ≈ ${text('stepKcal', '250')} kcal — bu kunlik bir dona chak-chak kalmori bilan deyarli teng.`,
  },
  {
    keys: ['uyqu', 'uxlash', 'uxov', 'charchagan'],
    answer: () => 'Kattalarga 7–9 soat uyqu kerak. Yotishdan 1 soat oldin ekranni yoping, xona salqin va qorong\'i bo\'lsin, kofeini 16:00 dan keyin ichmang. Uyqu yetmasa ishtaha gormoni (grelin) oshadi — vazn nazorati qiyinlashadi.',
  },
  {
    keys: ['stress', 'asab', 'qo\'rq', 'davom et'],
    answer: () => '4-7-8 nafas: 4 soniyada nafas oling, 7 soniya ushlab, 8 soniyada chiqaring — 4 marta. Kuniga 20 daqiqalik sayr ham stressni sezilarli pasaytiradi. Agar holat 2 haftadan ortiq davom etsa — mutaxassis bilan gaplashing.',
  },
  {
    keys: ['motivatsiya', 'vazifa', 'toxtat', 'davom etolmay'],
    answer: () => 'Motivatsiya emas, odat g\'alaba keltiradi. Kichik boshlang: kuniga bitta vazifa, 7 kun ketma-ket. «7 kunlik challenge» bo\'limidagi streak sizga aynan shu ko\'nikmani beradi — 60% bajaril ham streak\'ni saqlaydi.',
  },
  {
    keys: ['ogriq', 'kasal', 'bemor', 'diabet', 'homilador', 'bosim', 'shifokor', 'dori'],
    answer: () => '⚠️ Men tibbiy maslahat bera olmayman — bu yerda faqat umumiy sog\'lom turmush yo\'riqnomalari bor. Og\'ir simptom, surunkali kasallik yoki dori qabul qilsangiz — albatta shifokorga murojaat qiling. Homiladorlik va bolalar rejasi ham faqat shifokor nazoratida bo\'lishi kerak.',
  },
  {
    keys: ['reklama', 'obuna', 'pul', 'bepul', 'maxfiy', 'malumot'],
    answer: () => 'Platforma 100% bepul, reklama va obuna yo\'q. Barcha ma\'lumotlar faqat sizning brauzeringizda (localStorage) saqlanadi — bizga yuborilmaydi. «Boshidan boshlash» tugmasi bilan istalgan vaqtda o\'chirishingiz mumkin.',
  },
];

const FALLBACK =
  'Buni aniq anglay olmadim. Men quyidagi mavzular bo\'yicha yaxshi yordam bera olaman: <b>suv normasi, kaloriya, BMI, mashq rejasi, ovqatlanish, uyqu, motivatsiya</b>. Savolingizni boshqacha so\'zlab ko\'ring. 🙂';

function answerFor(question: string): string {
  const q = norm(question);
  let best: { rule: Rule; score: number } | null = null;

  for (const rule of RULES) {
    let score = 0;
    for (const k of rule.keys) {
      if (q.includes(norm(k))) score += k.length;
    }
    if (score > 0 && (!best || score > best.score)) best = { rule, score };
  }
  return best ? best.rule.answer() : FALLBACK;
}

function push(who: 'bot' | 'user', html: string): void {
  const box = $('advisorMsgs');
  const div = document.createElement('div');
  div.className = `msg msg--${who}`;
  div.innerHTML = html;
  box.appendChild(div);
  box.scrollTop = box.scrollHeight;
}

let typingEl: HTMLElement | null = null;

function reply(question: string): void {
  if (typingEl) typingEl.remove();
  typingEl = document.createElement('div');
  typingEl.className = 'msg msg--bot';
  typingEl.innerHTML = '<i>yozmoqda…</i>';
  $('advisorMsgs').appendChild(typingEl);
  $('advisorMsgs').scrollTop = $('advisorMsgs').scrollHeight;

  setTimeout(() => {
    typingEl?.remove();
    typingEl = null;
    push('bot', answerFor(question));
  }, 420);
}

export function initAdvisor(): void {
  push(
    'bot',
    "Assalomu alaykum! 👋 Men <b>Sog'lom maslahatchi</b>man — suv, kaloriya, BMI, mashq va ovqatlanish bo\'yicha savollaringizga javob beraman. Ma\'lumotlaringiz qurilmangizdan chiqmaydi."
  );

  $('advisorForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('advisorInput') as HTMLInputElement;
    const q = input.value.trim();
    if (!q) return;
    push('user', q.replace(/</g, '&lt;'));
    input.value = '';
    reply(q);
  });

  $('advisorChips').addEventListener('click', (e) => {
    const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('.chip');
    if (!btn) return;
    const q = btn.textContent?.trim();
    if (!q) return;
    push('user', q);
    reply(q);
  });
}
