// Sog'lomQadam prezentatsiyasini .pptx formatida yaratadi.
// Ishga tushirish: npm run pptx
import pptxgen from 'pptxgenjs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const OUT = join(dirname(fileURLToPath(import.meta.url)), 'SoglamQadam-prezentatsiya.pptx');

// —— Dizayn tokenlari (slides.html bilan bir xil) ——
const C = {
  ink: '0C1A15',
  ink2: '33443D',
  muted: '64766E',
  brand: '0D9B63',
  brand500: '22C98A',
  brand700: '0A7D51',
  soft: 'E4F6EE',
  bg: 'F5F8F6',
  line: 'E2EAE5',
  white: 'FFFFFF',
  lime: '7DD36C',
};

const DEMO = 'https://site-a759875af4e24f2b96edba0601ae7c0d.freebuff.page';

const pptx = new pptxgen();
pptx.defineLayout({ name: 'HACK16x9', width: 13.33, height: 7.5 });
pptx.layout = 'HACK16x9';
pptx.author = 'SaglamQadam jamoasi';
pptx.title = "Sog'lomQadam — Hackathon 2026";

let pageNo = 0;
const TOTAL = 11;

/** Yorug' fonli kontent slaydi uchun shablon */
function contentSlide(kicker, title) {
  pageNo += 1;
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  s.addText(kicker.toUpperCase(), {
    x: 0.7, y: 0.45, w: 6, h: 0.35, fontSize: 12, bold: true, color: C.brand, charSpacing: 2,
  });
  s.addText(title, {
    x: 0.7, y: 0.8, w: 12, h: 0.85, fontSize: 30, bold: true, color: C.ink,
  });
  footer(s);
  return s;
}

function footer(s) {
  s.addText(`Sog'lomQadam · Hackathon 2026`, {
    x: 0.7, y: 7.05, w: 5, h: 0.3, fontSize: 9, color: C.muted,
  });
  s.addText(`${pageNo} / ${TOTAL}`, {
    x: 11.6, y: 7.05, w: 1.1, h: 0.3, fontSize: 9, color: C.muted, align: 'right',
  });
  s.addShape(pptx.ShapeType.rect, {
    x: 0, y: 7.42, w: 13.33 * (pageNo / TOTAL), h: 0.08, fill: { color: C.brand500 },
  });
}

/** Oq karta */
function card(s, x, y, w, h) {
  s.addShape(pptx.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.12,
    fill: { color: C.white }, line: { color: C.line, width: 1 },
  });
}

function statCard(s, x, y, w, h, value, label) {
  card(s, x, y, w, h);
  s.addText(value, {
    x: x + 0.2, y: y + 0.25, w: w - 0.4, h: 0.8, fontSize: 34, bold: true, color: C.brand, align: 'left',
  });
  s.addText(label, {
    x: x + 0.2, y: y + 1.05, w: w - 0.4, h: h - 1.2, fontSize: 12, color: C.ink2, align: 'left', valign: 'top',
  });
}

function iconCard(s, x, y, w, h, icon, title, body) {
  card(s, x, y, w, h);
  s.addText(icon, { x: x + 0.2, y: y + 0.15, w: 1, h: 0.5, fontSize: 20 });
  s.addText(title, { x: x + 0.2, y: y + 0.65, w: w - 0.4, h: 0.4, fontSize: 15, bold: true, color: C.ink });
  s.addText(body, {
    x: x + 0.2, y: y + 1.05, w: w - 0.4, h: h - 1.2, fontSize: 11.5, color: C.muted, valign: 'top', lineSpacingMultiple: 1.15,
  });
}

/* ============ 1. SARLAVHA ============ */
{
  pageNo += 1;
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.7, y: 0.7, w: 5.6, h: 0.5, rectRadius: 0.24,
    fill: { color: '1A2E27' }, line: { color: '2C4740', width: 1 },
  });
  s.addText("🏆 Hackathon 2026 · Senior · «Sog'liq va sport»", {
    x: 0.85, y: 0.78, w: 5.4, h: 0.34, fontSize: 12, bold: true, color: 'CFE8DD',
  });
  s.addText([
    { text: "Sog'lom", options: { color: C.white } },
    { text: 'Qadam', options: { color: C.lime } },
  ], { x: 0.7, y: 1.7, w: 12, h: 1.4, fontSize: 60, bold: true });
  s.addText("Sog'lom hayot — bir qadamdan boshlanadi. O'zbek sharoitidagi birinchi to'liq o'zbek tilidagi sog'lom turmush tarzi platformasi.", {
    x: 0.7, y: 3.15, w: 9.5, h: 1.1, fontSize: 19, color: 'B9CCC4', lineSpacingMultiple: 1.25,
  });

  const badges = ['🧮 4 kalkulyator', '🍲 40 milliy taom', '🏋️ 26 mashq', '🎯 7 kunlik challenge', '🤖 maslahatchi'];
  let bx = 0.7;
  for (const b of badges) {
    const w = 0.28 + b.length * 0.115;
    s.addShape(pptx.ShapeType.roundRect, {
      x: bx, y: 4.5, w, h: 0.5, rectRadius: 0.24,
      fill: { color: '16241E' }, line: { color: '2C4740', width: 1 },
    });
    s.addText(b, { x: bx, y: 4.58, w, h: 0.34, fontSize: 12, color: 'CFE8DD', align: 'center' });
    bx += w + 0.18;
  }

  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.7, y: 5.6, w: 8.4, h: 0.66, rectRadius: 0.33, fill: { color: C.brand },
  });
  s.addText(`🔗  Demo: ${DEMO.replace('https://', '')}`, {
    x: 0.7, y: 5.72, w: 8.4, h: 0.42, fontSize: 15, bold: true, color: C.white, align: 'center',
  });
  s.addText("Jamoa: __________________", { x: 0.7, y: 6.7, w: 6, h: 0.4, fontSize: 12, color: '7F968C' });
  s.addText(`1 / ${TOTAL}`, { x: 11.6, y: 6.7, w: 1.1, h: 0.4, fontSize: 12, color: '7F968C', align: 'right' });
}

/* ============ 2. MUAMMO ============ */
{
  const s = contentSlide('Muammo', "Sog'lik — eng katta, lekin eng e'tiborsiz reja");
  statCard(s, 0.7, 1.9, 2.95, 2.3, '1/3', 'kattalar jismoniy faollik normasiga yetmaydi (JSST)');
  statCard(s, 3.85, 1.9, 2.95, 2.3, '№1', 'yurak-qon tomir kasalliklari — vafot sabablari boshida');
  statCard(s, 7.0, 1.9, 2.95, 2.3, '70%', "«parhez» hisobsiz boshlanadi va tez to'xtaydi");
  statCard(s, 10.15, 1.9, 2.45, 2.3, '0', "o'zbek taomlari bazasi bor bepul ilova");

  s.addShape(pptx.ShapeType.roundRect, {
    x: 0.7, y: 4.6, w: 11.9, h: 1.9, rectRadius: 0.12, fill: { color: C.white }, line: { color: C.line, width: 1 },
  });
  s.addText(
    "Muammo faqat «ko'proq sport qiling» da emas: odamda o'z normasini biladigan, milliy ovqatini hisoblaydigan va odatni ushlab turadigan vosita yo'q. Chet el ilovalari esa o'zbekcha emas va mahalliy taomlarni tanimaydi.",
    { x: 1.0, y: 4.85, w: 11.3, h: 1.4, fontSize: 17, color: C.ink2, lineSpacingMultiple: 1.3 }
  );
}

/* ============ 3. NOYOB QIYMAT ============ */
{
  const s = contentSlide('Nega biz?', "Mavjud ilovalar shu muammoga javob bermaydi");
  iconCard(s, 0.7, 1.9, 3.9, 2.4, '🌍', "Notog'ri bazalar", "Chet el ilovalarida «osh», «somsa», «lag'mon» yo'q — hisob doim yonga chiqadi. Bizda 40 ta milliy taom: porsiya + makronutrientlar.");
  iconCard(s, 4.75, 1.9, 3.9, 2.4, '🔒', "To'siqli kirish", "Ro'yxatdan o'tish, raqam, reklama, obuna. Bizda: och → ishla. Ma'lumot faqat qurilmada (localStorage).");
  iconCard(s, 8.8, 1.9, 3.8, 2.4, '📉', "Motivatsiya so'nadi", "Abunalar 2–3 haftada tugaydi. Bizda streak va kunlik natija — davomiylikni ushlab turuvchi mexanizm.");

  const rows = [
    [
      { text: 'Vosita', options: { bold: true, color: C.brand700, fill: { color: C.soft } } },
      { text: "O'zbekcha", options: { bold: true, color: C.brand700, fill: { color: C.soft } } },
      { text: 'Milliy taomlar bazasi', options: { bold: true, color: C.brand700, fill: { color: C.soft } } },
      { text: 'Ro\'yxatsiz', options: { bold: true, color: C.brand700, fill: { color: C.soft } } },
      { text: 'Streak mexanizmi', options: { bold: true, color: C.brand700, fill: { color: C.soft } } },
    ],
    ['Chet el ilovalari', "Yo'q", "Yo'q", "Ko'pincha yo'q", "Qisman"],
    ['Mahalliy ilovalar', 'Ha', 'Cheklangan', 'Har xil', "Yo'q"],
    [{ text: "Sog'lomQadam", options: { bold: true } }, { text: "Ha, to'liq", options: { bold: true } }, { text: '40 ta + makro', options: { bold: true } }, { text: 'Ha', options: { bold: true } }, { text: 'Ha', options: { bold: true } }],
  ];
  s.addTable(rows, {
    x: 0.7, y: 4.6, w: 11.9, colW: [2.6, 2.2, 3.1, 2.0, 2.0],
    fontSize: 12, border: { type: 'solid', color: C.line, pt: 1 }, fill: { color: C.white },
    rowH: 0.42, valign: 'middle',
  });
}

/* ============ 4. YECHIM ============ */
{
  const s = contentSlide('Yechim', 'Hisobla → Rejalashtir → Bajar → Saqla');
  const steps = [
    ['1. Hisobla', 'BMI, kaloriya (TDEE), suv va qadam normasi — 30 soniyada'],
    ['2. Rejalashtir', "Maqsadga mos uy mashqlari reja + kunlik ratson"],
    ['3. Bajar', '7 kunlik challenge, dam taymeri, maslahatchi yonida'],
    ['4. Saqla', 'Natijalar qurilmada qoladi, grafikda ko\'rinadi'],
  ];
  steps.forEach((st, k) => {
    const x = 0.7 + k * 3.1;
    card(s, x, 2.0, 2.8, 1.9);
    s.addShape(pptx.ShapeType.rect, { x, y: 2.0, w: 2.8, h: 0.12, fill: { color: C.brand500 } });
    s.addText(st[0], { x: x + 0.2, y: 2.25, w: 2.4, h: 0.4, fontSize: 16, bold: true, color: C.ink });
    s.addText(st[1], { x: x + 0.2, y: 2.7, w: 2.4, h: 1.1, fontSize: 12, color: C.muted, valign: 'top' });
    if (k < 3) s.addText('→', { x: x + 2.78, y: 2.7, w: 0.35, h: 0.5, fontSize: 22, bold: true, color: C.brand, align: 'center' });
  });

  iconCard(s, 0.7, 4.3, 5.9, 2.2, '🎯', 'Kim uchun', "O'rta yoshli office xodimlari, talabalar, sportga qaytmoqchi bo'lganlar — ya'ni bizning o'zimiz.");
  iconCard(s, 6.7, 4.3, 5.9, 2.2, '⚡', 'Nega tez ishlaydi', "Server yo'q, kutish yo'q, reklama yo'q. Sahifa ochiladi va darhol ishlaydi — hatto sekin internetda.");
}

/* ============ 5. IMKONIYATLAR ============ */
{
  const s = contentSlide('Imkoniyatlar', 'Bitta sahifada 6 ta vosita');
  const items = [
    ['⚖️', 'BMI + ideal vazn', 'Rangli shkala, holat va shaxsiy vazn diapazoni'],
    ['🔥', 'Kaloriya (TDEE)', 'Mifflin–St Jeor, faollik, maqsad, makronutrientlar'],
    ['💧', 'Suv va qadam', "Vazn va faollikka ko'ra litr, stakan va qadam maqsadi"],
    ['🍲', 'Milliy taomlar bazasi', "40 ta taom: kaloriya + oqsil/uglerod/yog', qidiruv"],
    ['🏋️', 'Mashq rejasi generatori', 'Maqsad × daraja × kun × vaqt → tayyor reja'],
    ['🎯', 'Challenge + taymer', '6 ta odat, streak, 7 kunlik grafik, 45/5 taymer'],
  ];
  items.forEach((it, k) => {
    const x = 0.7 + (k % 3) * 4.05;
    const y = 1.95 + Math.floor(k / 3) * 2.45;
    iconCard(s, x, y, 3.85, 2.25, it[0], it[1], it[2]);
  });
}

/* ============ 6. DEMO ============ */
{
  pageNo += 1;
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  s.addText('DEMO', { x: 0.7, y: 0.5, w: 4, h: 0.35, fontSize: 12, bold: true, color: C.lime, charSpacing: 2 });
  s.addText('Haqiqiy platforma — havolani ochib ko\'ring', { x: 0.7, y: 0.85, w: 12, h: 0.8, fontSize: 30, bold: true, color: C.white });

  const mk = (x, title, lines) => {
    s.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.95, w: 5.9, h: 3.3, rectRadius: 0.12,
      fill: { color: '132420' }, line: { color: '2C4740', width: 1 },
    });
    s.addText(title, { x: x + 0.3, y: 2.15, w: 5.3, h: 0.45, fontSize: 17, bold: true, color: C.white });
    s.addText(
      lines.map((l) => ({ text: l, options: { bullet: { code: '2713', indent: 18 }, color: 'CFE8DD' } })),
      { x: x + 0.3, y: 2.7, w: 5.3, h: 2.4, fontSize: 13.5, lineSpacingMultiple: 1.35 }
    );
  };
  mk(0.7, "🖥️  Nima ko'rasiz", [
    "Hisoblash: vazn 95 kg → BMI va norma darhol yangilanadi",
    "Ratson: «Osh»ni qo'shing → hisob yuradi",
    "Reja: 30 daqiqa, 3 kun → tayyor mashq kartalari",
    "Challenge: odatlarni belgilang → grafik to'ldiriladi",
  ]);
  mk(6.7, '🧪  Tekshirilgan', [
    'TypeScript strict — xato yo\'q',
    'Build: JS 33 kB, CSS 22 kB',
    'O\'flayn ishlaydi, tashqi API yo\'q',
    'Mobil va desktop uchun moslashuvchan',
  ]);

  s.addShape(pptx.ShapeType.roundRect, { x: 0.7, y: 5.6, w: 7.6, h: 0.66, rectRadius: 0.33, fill: { color: C.brand } });
  s.addText(`🔗  ${DEMO.replace('https://', '')}`, { x: 0.7, y: 5.72, w: 7.6, h: 0.42, fontSize: 15, bold: true, color: C.white, align: 'center' });
  footer(s);
}

/* ============ 7. TEXNIK ============ */
{
  const s = contentSlide('Texnik qism', 'Yengil, xavfsiz va mustaqil arxitektura');
  iconCard(s, 0.7, 1.9, 2.9, 2.3, '⚙️', 'Stack', 'TypeScript (strict) + Vite. Frameworksiz — kam bog\'liqlik, tez build.');
  iconCard(s, 3.75, 1.9, 2.9, 2.3, '🧩', 'Modullar', 'data/ — bazalar, lib/ — hisob va store, modules/ — UI bloklar.');
  iconCard(s, 6.8, 1.9, 2.9, 2.3, '🗄️', 'Ma\'lumot', 'localStorage + kichik pub/sub. Server va ma\'lumot uzatish yo\'q.');
  iconCard(s, 9.85, 1.9, 2.75, 2.3, '🚀', 'Hosting', 'Cloudflare Worker + statik assetlar. Global CDN, TLS.');
  iconCard(s, 0.7, 4.5, 3.9, 2.0, '📈', 'Canvas grafik', "Haftalik natija — DPR aniqligida qo'lda chizilgan.");
  iconCard(s, 4.75, 4.5, 3.9, 2.0, '🎨', 'SVG animatsiya', 'Ring progress: BMI, ratson va taymer bir tilda.');
  iconCard(s, 8.8, 4.5, 3.8, 2.0, '🧠', 'Qoidalar dvigateli', "Maslahatchi — offline, izohlangan qoidalar; LLM/xarajat yo'q.");
}

/* ============ 8. FOYDA ============ */
{
  const s = contentSlide('Foyda', 'Bu qanday yordam beradi — raqamlarda');
  statCard(s, 0.7, 1.9, 2.95, 2.2, '30 son', 'shaxsiy normangizni bilish uchun');
  statCard(s, 3.85, 1.9, 2.95, 2.2, '40 ta', "taom bo'yicha xato hisoblash yo'qoladi");
  statCard(s, 7.0, 1.9, 2.95, 2.2, '7 kun', "odat shakllanishining minimal davri — streak ushlaydi");
  statCard(s, 10.15, 1.9, 2.45, 2.2, '0 ₽', 'reklama va obuna — foydalanuvchiga');

  s.addText([
    { text: "Oshcho'zuvchining «taxminiy» hisobi o'rniga — aniq raqam va chegaraviy ogohlantirish", options: { bullet: { code: '2713', indent: 18 } } },
    { text: 'Uyda mashq qiladiganlar uchun jihoz talab qilmaydigan reja', options: { bullet: { code: '2713', indent: 18 } } },
    { text: 'Maxfiylik: tibbiy ma\'lumot hech qayerga yuborilmaydi', options: { bullet: { code: '2713', indent: 18 } } },
  ], { x: 0.9, y: 4.5, w: 11.5, h: 2.0, fontSize: 16, color: C.ink2, lineSpacingMultiple: 1.5 });
}

/* ============ 9. ROADMAP ============ */
{
  const s = contentSlide('Rivojlanish', 'Keyingi qadamlar');
  const steps = [
    ['v1.0 — Hozir', "MVP: hisob, taomlar, reja, challenge, taymer, maslahatchi"],
    ['v1.1 — +1 oy', "PWA: telefonga o'rnatish, oflayn bildirishnomalar"],
    ['v1.2 — +3 oy', 'Fitnes-braslet bilan sinxron (qadam, uyqu)'],
    ['v2.0', 'Shifokor konsultatsiyasi va shaxsiyatlashtirilgan reja'],
  ];
  steps.forEach((st, k) => {
    const x = 0.7 + k * 3.1;
    card(s, x, 2.0, 2.8, 1.9);
    s.addShape(pptx.ShapeType.rect, { x, y: 2.0, w: 2.8, h: 0.12, fill: { color: C.brand500 } });
    s.addText(st[0], { x: x + 0.2, y: 2.25, w: 2.4, h: 0.4, fontSize: 15, bold: true, color: C.ink });
    s.addText(st[1], { x: x + 0.2, y: 2.7, w: 2.4, h: 1.1, fontSize: 12, color: C.muted, valign: 'top' });
    if (k < 3) s.addText('→', { x: x + 2.78, y: 2.7, w: 0.35, h: 0.5, fontSize: 22, bold: true, color: C.brand, align: 'center' });
  });
  iconCard(s, 0.7, 4.4, 5.9, 2.1, '📢', 'Marketing', "Talabalar va office guruhlari uchun «21 kunlik challenge» — organik tarqalish.");
  iconCard(s, 6.7, 4.4, 5.9, 2.1, '💰', 'Monetizatsiya (istiqbolda)', 'Bepul asos + premium: oilaviy hisob, PDF hisobot, shifokor bilan ulanish.');
}

/* ============ 10. MEZONLAR ============ */
{
  const s = contentSlide('Xulosa', 'Baholash mezonlariga moslik');
  const rows = [
    [
      { text: 'Mezon', options: { bold: true, color: C.brand700, fill: { color: C.soft } } },
      { text: 'Nima taklif qilamiz', options: { bold: true, color: C.brand700, fill: { color: C.soft } } },
    ],
    ["💡 G'oya (50 ball)", "Dolzarb muammo (sog'lik + noto'g'ri hisob) va noyob yechim: milliy taomlar bazasi + davomiylik mexanizmi"],
    ['🎤 Pitch (30 ball)', "«Hisobla → Rejalashtir → Bajar → Saqla» — bitta gapda mohiyat, jonli demo bilan"],
    ['📊 Prezentatsiya (20 ball)', "Bir xil dizayn tizimi, raqamlar va jadval, o'zbek tilida"],
    ['💻 Texnik (10 ball)', 'TypeScript strict, modul arxitektura, tashqi API\'siz xavfsizlik, tez build'],
  ];
  s.addTable(rows, {
    x: 0.7, y: 2.0, w: 11.9, colW: [3.2, 8.7],
    fontSize: 14, border: { type: 'solid', color: C.line, pt: 1 }, fill: { color: C.white },
    rowH: 0.75, valign: 'middle',
  });
}

/* ============ 11. RAHMAT ============ */
{
  pageNo += 1;
  const s = pptx.addSlide();
  s.background = { color: C.ink };
  s.addText('RAHMAT!', { x: 0.7, y: 1.6, w: 8, h: 0.4, fontSize: 13, bold: true, color: C.lime, charSpacing: 2 });
  s.addText([
    { text: 'Savollaringizga ', options: { color: C.white } },
    { text: 'tayyor', options: { color: C.lime } },
  ], { x: 0.7, y: 2.1, w: 12, h: 1.2, fontSize: 52, bold: true });
  s.addText("Sog'lomQadam — sog'likni rejalashtirishni osonlashtiradi, sabrni esa mexanizm saqlaydi.", {
    x: 0.7, y: 3.5, w: 9.5, h: 0.9, fontSize: 18, color: 'B9CCC4', lineSpacingMultiple: 1.25,
  });
  s.addShape(pptx.ShapeType.roundRect, { x: 0.7, y: 4.7, w: 7.6, h: 0.66, rectRadius: 0.33, fill: { color: C.brand } });
  s.addText(`🔗  Demoni sinab ko'ring: ${DEMO.replace('https://', '')}`, {
    x: 0.7, y: 4.82, w: 7.6, h: 0.42, fontSize: 14, bold: true, color: C.white, align: 'center',
  });
  s.addText(`Sog'lomQadam · Hackathon 2026`, { x: 0.7, y: 6.7, w: 6, h: 0.4, fontSize: 11, color: '7F968C' });
  s.addText(`${TOTAL} / ${TOTAL}`, { x: 11.6, y: 6.7, w: 1.1, h: 0.4, fontSize: 11, color: '7F968C', align: 'right' });
}

await pptx.writeFile({ fileName: OUT });
console.log(`✓ Tayyor: ${OUT}`);
