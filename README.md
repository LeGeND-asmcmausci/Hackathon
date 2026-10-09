# 🏥 Sog'lomQadam

**Sog'lom hayot — bir qadamdan boshlanadi.**
O'zbekiston sharoitiga mos, o'zbek tilidagi bepul sog'lom turmush tarzi platformasi.

> 🏆 **Hackathon 2026 · Senior group · «Sog'liq va sport»**
> 🔗 **Demo:** https://site-a759875af4e24f2b96edba0601ae7c0d.freebuff.page

---

## 💡 Muammo

- Jismoniy harakatsizlik va noto'g'ri ovqatlanish — jahon va O'zbekistondagi eng keng tarqalgan sog'lik sabablari.
- Chet el ilovalari o'zbekcha emas va **milliy taomlarni** (osh, somsa, lag'mon) tanimaydi — hisob doim yonga chiqadi.
- Ro'yxatdan o'tish, reklama va obuna to'siqlari odamni birinchi haftada chetlab chiqaradi.
- Motivatsiya tez so'nadi: odat shakllanishini ushlab turadigan mexanizm yo'q.

## ✅ Yechim: «Hisobla → Rejalashtir → Bajar → Saqla»

| Bo'lim | Nima qiladi |
| --- | --- |
| 🧮 **Kalkulyatorlar** | BMI (rangli shkala + ideal vazn), TDEE kaloriya (Mifflin–St Jeor + makronutrientlar), suv normasi, kunlik qadam maqsadi |
| 🍲 **Milliy taomlar bazasi** | 40 ta taom: porsiya, kaloriya, oqsil/uglerod/yog' + qidiruv, toifalar va kunlik ratson (halqa ko'rinishida) |
| 🏋️ **Mashq rejasi** | Maqsad × daraja × kun soni × vaqt → uy sharoitidagi tayyor haftalik reja (jihozsiz) |
| 🎯 **7 kunlik challenge** | 6 ta sog'lom odat, streak, haftalik Canvas grafik, KPI statistikasi |
| ⏱️ **Dam taymeri** | 45/5 va 25/5 rejimlari, SVG halqa, avtomatik tanaffus + ovozli signal |
| 🤖 **Maslahatchi** | Qoidalar asosidagi offline chat: suv, kaloriya, mashq, uyqu, motivatsiya, tibbiy ogohlantirishlar |

**Maxfiylik:** barcha ma'lumotlar `localStorage`da saqlanadi — serverga hech narsa yuborilmaydi. Tashqi API yo'q.

## 🛠 Texnologiyalar

- **TypeScript (strict)** + **Vite** — frameworksiz, yengil (JS ~33 kB, CSS ~22 kB)
- Modul arxitektura: `data/` (bazalar) → `lib/` (hisob, store) → `modules/` (UI bloklar)
- Canvas (haftalik grafik), SVG (halqa animatsiya), WebAudio (taymer signali)
- Hosting: **Cloudflare Worker** + statik assetlar (`deploy-manifest.json`)

## 🚀 Ishga tushirish

```bash
npm install        # bog'liqliklarni o'rnatish
npm run dev        # lokal server: http://localhost:5173
npm run build      # tsc tekshiruvi + dist/ build
npm run pptx       # presentation/SoglamQadam-prezentatsiya.pptx ni qayta yaratish
```

## 📁 Arxitektura

```
├── index.html              # barcha bo'limlar (semantic HTML)
├── src/
│   ├── main.ts             # bootstrap, navigatsiya, reveal
│   ├── styles.css          # dizayn tizimi (tokenlar, komponentlar)
│   ├── data/
│   │   ├── foods.ts        # milliy taomlar bazasi (40 ta)
│   │   └── exercises.ts    # mashqlar bazasi (26 ta, 3 daraja)
│   ├── lib/
│   │   ├── calc.ts         # BMI/TDEE/suv/qadam — sof funksiyalar
│   │   └── store.ts        # pub/sub + localStorage + sana yordamchilari
│   └── modules/            # calculators, food, workout, challenge, timer, advisor
├── public/favicon.svg
├── worker.js               # Cloudflare Worker (ASSETS)
├── deploy-manifest.json    # sites deploy manifesti
└── presentation/
    ├── slides.html         # HTML slayd-deck (klaviatura bilan boshqariladi)
    ├── generate-pptx.mjs   # PPTX generatori (pptxgenjs)
    └── SoglamQadam-prezentatsiya.pptx
```

## 📤 Topshirish uchun

1. **ZIP** — `saglamqadam-hackathon.zip` (to'liq kodlar + prezentatsiya)
2. **Deploy link** — yuqoridagi demo havolasi (Cloudflare Sites, preview)
3. **Prezentatsiya** — `presentation/slides.html` (brauzerda ochiladi, ← → tugmalari) va `SoglamQadam-prezentatsiya.pptx`

## 🔭 Keyingi qadamlar

- **v1.1** — PWA (telefonga o'rnatish, oflayn), bildirishnomalar
- **v1.2** — fitnes-braslet bilan sinxron (qadam, uyqu)
- **v2.0** — shifokor konsultatsiyasi va shaxsiyatlashtirilgan rejalar

---

⚠️ **Eslatma:** platforma tibbiy maslahat emas. Og'riq, kasallik yoki shubha bo'lsa — shifokorga murojaat qiling.
Taomlar kaloriyasi — porsiya bo'yicha o'rtacha qiymatlar.
