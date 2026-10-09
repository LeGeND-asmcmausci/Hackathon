// Uy sharoitidagi mashqlar bazasi (jihozsiz).
export type Level = 'beginner' | 'medium' | 'advanced';
export type Kind = 'kuch' | 'kardio' | 'cho\'zilish';

export interface Exercise {
  id: string;
  name: string;
  kind: Kind;
  target: string; // ishlanadigan soha
  note: string; // texnika eslatmasi
  rx: Record<Level, string>; // darajaga ko'ra to'plam × takrorlash
}

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: 'Boshlang\'ich',
  medium: 'O\'rta',
  advanced: 'Ilg\'or',
};

export const GOAL_LABEL: Record<string, string> = {
  fat: 'Vazn kamaytirish',
  strength: 'Kuch va rivojlanish',
  cardio: 'Chaqqonlik va yurak',
};

export const EXERCISES: Exercise[] = [
  // ——— Kuch ———
  { id: 'squat', name: 'O\'tirib-turish (squat)', kind: 'kuch', target: 'Oyoq, ko\'tarqi', note: 'Tizza barmoq uchidan oshmasin, ko\'kragingizni oldinga qarating.', rx: { beginner: '3×12', medium: '4×18', advanced: '5×25' } },
  { id: 'pushup', name: 'Qo\'l bosish (push-up)', kind: 'kuch', target: 'Ko\'krak, qo\'l', note: 'Tana chizig\'i to\'g\'ri qolsin; qiyin bo\'lsa — tizza ustida.', rx: { beginner: '3×8 (tizza ustida)', medium: '4×14', advanced: '5×22' } },
  { id: 'plank', name: 'Plank (dazmol)', kind: 'kuch', target: 'Yadro', note: 'Son va ko\'kra bir chiziqda, nafasni ushlab qolmang.', rx: { beginner: '3×20 soniya', medium: '3×40 soniya', advanced: '3×60 soniya' } },
  { id: 'lunge', name: 'Oldinga qadam (lunge)', kind: 'kuch', target: 'Oyoq, ko\'tarqi', note: 'Orqa tizza polga tegmasin, korpus tik.', rx: { beginner: '3×10 (har tomon)', medium: '4×14', advanced: '4×20' } },
  { id: 'bridge', name: 'Tosh ko\'tarish (glute bridge)', kind: 'kuch', target: 'Ko\'tarqi, orqa', note: 'To\'pponlarni bosib, yuqorida 1 soniya turing.', rx: { beginner: '3×12', medium: '4×18', advanced: '4×25' } },
  { id: 'twist', name: 'Russian twist', kind: 'kuch', target: 'Yadro, qorin', note: 'Oyog\'ingiz ko\'tarilgan holda yoningizni burang.', rx: { beginner: '3×16', medium: '4×24', advanced: '4×36' } },
  { id: 'deadbug', name: 'Dead bug', kind: 'kuch', target: 'Yadro', note: 'Bel polga yopishib tursin, sekin harakat.', rx: { beginner: '3×10', medium: '3×14', advanced: '4×18' } },
  { id: 'superman', name: 'Supermen', kind: 'kuch', target: 'Orqa', note: 'Qo\'l va oyoqni bir vaqtda ko\'tarib, 2 soniya turing.', rx: { beginner: '3×10', medium: '3×15', advanced: '4×20' } },
  { id: 'sidelank', name: 'Yon plank', kind: 'kuch', target: 'Yadro, yon qorin', note: 'Tirsak to\'g\'ri yel ostida bo\'lsin.', rx: { beginner: '3×15 soniya', medium: '3×30 soniya', advanced: '3×45 soniya' } },
  { id: 'wall-sit', name: 'Devorga suyanib o\'tirish', kind: 'kuch', target: 'Oyoq', note: 'Sonlar polga parallel, tizza 90°.', rx: { beginner: '3×20 soniya', medium: '3×35 soniya', advanced: '4×50 soniya' } },
  { id: 'stepup', name: 'O\'riqqa chiqish (step-up)', kind: 'kuch', target: 'Oyoq, ko\'tarqi', note: 'Chiqayotganda to\'pponni ishlating, tizza qattiq bosilmasin.', rx: { beginner: '3×10', medium: '4×14', advanced: '4×20' } },
  { id: 'calf', name: 'Barmoq uchida turish', kind: 'kuch', target: 'Sikra', note: 'Yuqorida 1 soniya turing, pastga sekin tushing.', rx: { beginner: '3×15', medium: '4×20', advanced: '4×30' } },
  { id: 'birddog', name: 'Bird dog', kind: 'kuch', target: 'Orqa, yadro', note: 'Qo\'l-oyoq qarama-qarshi tomonga cho\'zilsin.', rx: { beginner: '3×10', medium: '3×14', advanced: '4×18' } },
  { id: 'burpee', name: 'Burpee', kind: 'kuch', target: 'Butun tana', note: 'Zo\'r mashq — ammo texnika buzilmasin.', rx: { beginner: '3×6', medium: '4×10', advanced: '5×15' } },

  // ——— Kardio ———
  { id: 'jack', name: 'Jumping jacks', kind: 'kardio', target: 'Yurak, oyoq', note: 'Qo\'l yuqoriga to\'liq ochilsin, tizza yumshoq.', rx: { beginner: '3×30 soniya', medium: '4×40 soniya', advanced: '4×60 soniya' } },
  { id: 'highknees', name: 'Baland tizzalar', kind: 'kardio', target: 'Yurak, yadro', note: 'Tizza bel bo\'yiga ko\'tarilsin, qo\'l qatormiz.', rx: { beginner: '3×25 soniya', medium: '4×35 soniya', advanced: '4×50 soniya' } },
  { id: 'climber', name: 'Mountain climbers', kind: 'kardio', target: 'Yurak, yadro', note: 'Sonlarni tez torting, ko\'kra pasaymasin.', rx: { beginner: '3×20 soniya', medium: '3×35 soniya', advanced: '4×50 soniya' } },
  { id: 'skater', name: 'Skater jumps', kind: 'kardio', target: 'Yoqish, oyoq', note: 'Chap-o\'ng sakrab, korpusni ergashdiring.', rx: { beginner: '3×30 soniya', medium: '4×40 soniya', advanced: '4×60 soniya' } },
  { id: 'squatjump', name: 'Squat jump', kind: 'kardio', target: 'Oyoq, kuchli', note: 'Qo\'nib yumshoq tushing.', rx: { beginner: '3×10', medium: '4×15', advanced: '4×22' } },
  { id: 'runplace', name: 'Jo\'g\'lda yugurish', kind: 'kardio', target: 'Yurak', note: 'Tezlikni asta oshiring, nafas burundan.', rx: { beginner: '3×40 soniya', medium: '4×60 soniya', advanced: '5×90 soniya' } },

  // ——— Cho'zilish ———
  { id: 'neck', name: 'Bo\'yni cho\'zish', kind: 'cho\'zilish', target: 'Bo\'yn', note: 'Sekin, ogriqsiz chegarada ushlang.', rx: { beginner: '2×30 soniya', medium: '2×30 soniya', advanced: '2×30 soniya' } },
  { id: 'sidestretch', name: 'Yon tomonni cho\'zish', kind: 'cho\'zilish', target: 'Yon tanoq', note: 'Qo\'lni quloq orqasidan uzating.', rx: { beginner: '2×30 soniya', medium: '2×30 soniya', advanced: '2×30 soniya' } },
  { id: 'hamstring', name: 'Orqa oyoq cho\'zish', kind: 'cho\'zilish', target: 'Orqa son', note: 'Belni bukmang, ko\'krakni oldinga uzating.', rx: { beginner: '2×30 soniya', medium: '2×30 soniya', advanced: '2×30 soniya' } },
  { id: 'catcow', name: 'Cat–cow', kind: 'cho\'zilish', target: 'Orqa umurtqa', note: 'Nafas bilan moslab, yumshoq harakat.', rx: { beginner: '2×10 marta', medium: '2×10 marta', advanced: '2×12 marta' } },
  { id: 'chest', name: 'Ko\'krakni cho\'zish', kind: 'cho\'zilish', target: 'Ko\'krak, yelka', note: 'Eshik tokchasida tirsak 90°.', rx: { beginner: '2×30 soniya', medium: '2×30 soniya', advanced: '2×30 soniya' } },
];
