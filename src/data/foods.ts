// O'zbek milliy taomlari bazasi — porsiya bo'yicha o'rtacha qiymatlar.
// Manba: umumiy oziq-ovqat tarkibi jadvali (Yevrofiruq, 2021) asosida soddalashtirilgan.
export type FoodCategory =
  | 'Asosiy taom'
  | 'Non mahsulotlari'
  | 'Sut va tuxum'
  | 'Go\'sht va baliq'
  | 'Garnir'
  | 'Yengil va meva'
  | 'Shirinlik'
  | 'Ichimlik';

export interface Food {
  id: string;
  name: string;
  category: FoodCategory;
  portion: string;
  kcal: number;
  p: number; // oqsil, g
  c: number; // uglerod, g
  f: number; // yog', g
}

export const FOOD_CATEGORIES: FoodCategory[] = [
  'Asosiy taom',
  'Non mahsulotlari',
  'Sut va tuxum',
  'Go\'sht va baliq',
  'Garnir',
  'Yengil va meva',
  'Shirinlik',
  'Ichimlik',
];

export const FOODS: Food[] = [
  { id: 'osh', name: 'O\'sh (palov)', category: 'Asosiy taom', portion: '1 kosa · 350 g', kcal: 690, p: 28, c: 82, f: 26 },
  { id: 'somsa', name: 'Somsa (go\'shtli)', category: 'Asosiy taom', portion: '1 dona · 120 g', kcal: 380, p: 15, c: 34, f: 20 },
  { id: 'lagmon', name: 'Lag\'mon', category: 'Asosiy taom', portion: '1 kosa · 400 g', kcal: 520, p: 24, c: 66, f: 16 },
  { id: 'chuchvara', name: 'Chuchvara', category: 'Asosiy taom', portion: '1 kosa · 300 g', kcal: 340, p: 16, c: 44, f: 9 },
  { id: 'manti', name: 'Manti', category: 'Asosiy taom', portion: '1 dona · 110 g', kcal: 300, p: 13, c: 32, f: 14 },
  { id: 'norin', name: 'Norin', category: 'Asosiy taom', portion: '1 porsiya · 250 g', kcal: 410, p: 22, c: 58, f: 10 },
  { id: 'mastava', name: 'Mastava', category: 'Asosiy taom', portion: '1 kosa · 350 g', kcal: 280, p: 18, c: 30, f: 9 },
  { id: 'shurva', name: 'Sho\'rva', category: 'Asosiy taom', portion: '1 kosa · 350 g', kcal: 250, p: 12, c: 32, f: 7 },
  { id: 'dimlama', name: 'Dimlama', category: 'Asosiy taom', portion: '1 porsiya · 350 g', kcal: 350, p: 20, c: 38, f: 13 },
  { id: 'qozonkabob', name: 'Qozonkabob', category: 'Asosiy taom', portion: '1 porsiya · 200 g', kcal: 430, p: 38, c: 24, f: 20 },
  { id: 'shashlik', name: 'Shashlik (tovuq)', category: 'Go\'sht va baliq', portion: '1 six · 120 g', kcal: 250, p: 32, c: 3, f: 12 },
  { id: 'tovuq', name: 'Tovuq go\'shti (qaynatilgan)', category: 'Go\'sht va baliq', portion: '100 g', kcal: 165, p: 31, c: 0, f: 4 },
  { id: 'go\'sht', name: 'Go\'sht (qaynatilgan)', category: 'Go\'sht va baliq', portion: '100 g', kcal: 250, p: 26, c: 0, f: 16 },
  { id: 'baliq', name: 'Baliq (bug\'da)', category: 'Go\'sht va baliq', portion: '150 g', kcal: 210, p: 34, c: 0, f: 8 },
  { id: 'suyuq', name: 'Suyuq non', category: 'Non mahsulotlari', portion: '1 dona · 90 g', kcal: 260, p: 8, c: 50, f: 3 },
  { id: 'obinon', name: 'Obi non', category: 'Non mahsulotlari', portion: '1 dona · 150 g', kcal: 400, p: 11, c: 74, f: 7 },
  { id: 'patir', name: 'Patir non', category: 'Non mahsulotlari', portion: '100 g', kcal: 470, p: 9, c: 55, f: 23 },
  { id: 'bugdoy', name: 'Bug\'doniy non (1/4)', category: 'Non mahsulotlari', portion: '1/4 dona · 60 g', kcal: 160, p: 5, c: 32, f: 1 },
  { id: 'qatiq', name: 'Qatiq', category: 'Sut va tuxum', portion: '250 ml', kcal: 150, p: 8, c: 12, f: 7 },
  { id: 'ayron', name: 'Ayron', category: 'Sut va tuxum', portion: '250 ml', kcal: 90, p: 5, c: 7, f: 4 },
  { id: 'sut', name: 'Sut (2,5%)', category: 'Sut va tuxum', portion: '250 ml', kcal: 155, p: 8, c: 12, f: 8 },
  { id: 'tuxum', name: 'Tuxum (qaynatilgan)', category: 'Sut va tuxum', portion: '1 dona · 55 g', kcal: 78, p: 6, c: 1, f: 5 },
  { id: 'smetana', name: 'Smetana', category: 'Sut va tuxum', portion: '50 g', kcal: 120, p: 2, c: 3, f: 11 },
  { id: 'qurut', name: 'Qurut / pishloq', category: 'Sut va tuxum', portion: '50 g', kcal: 130, p: 10, c: 3, f: 9 },
  { id: 'guruch', name: 'Guruch (qaynatilgan)', category: 'Garnir', portion: '100 g', kcal: 130, p: 3, c: 28, f: 1 },
  { id: 'kartoshka', name: 'Kartoshka (qaynatilgan)', category: 'Garnir', portion: '100 g', kcal: 87, p: 2, c: 20, f: 1 },
  { id: 'makaron', name: 'Makaron (qaynatilgan)', category: 'Garnir', portion: '100 g', kcal: 150, p: 6, c: 31, f: 1 },
  { id: 'olma', name: 'Olma', category: 'Yengil va meva', portion: '1 dona · 180 g', kcal: 95, p: 1, c: 25, f: 1 },
  { id: 'tarvuz', name: 'Tarvuz', category: 'Yengil va meva', portion: '1 porsiya · 300 g', kcal: 95, p: 2, c: 22, f: 1 },
  { id: 'chalop', name: 'Chalop', category: 'Yengil va meva', portion: '1 porsiya · 250 g', kcal: 140, p: 7, c: 18, f: 4 },
  { id: 'salat', name: 'Achchiq-chuchuk salat', category: 'Yengil va meva', portion: '1 porsiya · 200 g', kcal: 60, p: 2, c: 8, f: 2 },
  { id: 'halva', name: 'Halva', category: 'Shirinlik', portion: '50 g', kcal: 260, p: 5, c: 24, f: 16 },
  { id: 'chakchak', name: 'Chak-chak', category: 'Shirinlik', portion: '50 g', kcal: 230, p: 2, c: 30, f: 11 },
  { id: 'bogirsoq', name: 'Bo\'g\'irsoq', category: 'Shirinlik', portion: '1 dona · 40 g', kcal: 150, p: 3, c: 24, f: 5 },
  { id: 'shokolad', name: 'Qora shokolad', category: 'Shirinlik', portion: '25 g', kcal: 135, p: 2, c: 12, f: 9 },
  { id: 'yonvoq', name: 'Yong\'oq / bodom', category: 'Shirinlik', portion: '30 g', kcal: 175, p: 6, c: 6, f: 15 },
  { id: 'choy', name: 'Ko\'k choy (shakarsiz)', category: 'Ichimlik', portion: '1 chashka · 250 ml', kcal: 2, p: 0, c: 0, f: 0 },
  { id: 'kompot', name: 'Kompot', category: 'Ichimlik', portion: '1 stakan · 250 ml', kcal: 120, p: 0, c: 30, f: 0 },
  { id: 'sok', name: 'Sok (qadoqlangan)', category: 'Ichimlik', portion: '250 ml', kcal: 110, p: 1, c: 26, f: 0 },
  { id: 'gazli', name: 'Gazli ichimlik', category: 'Ichimlik', portion: '330 ml', kcal: 140, p: 0, c: 35, f: 0 },
];
