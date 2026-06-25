/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * shadow.ts — MUI elevation tizimi uchun 25 ta CSS box-shadow
 * qiymatidan iborat massiv (indeks 0 dan 24 gacha).
 *
 * MUI standart tizimida har bir elevation darajasiga mos soya
 * qiymati mavjud. Bu massiv o'sha standart qiymatlarni loyiha
 * dizayni uchun maxsus qilib qayta belgilaydi.
 *
 * [0]  'none'    — soyasiz (elevation: 0, tekis qatlam).
 * [1]            — juda yengil ikki qavatli soya; kartalar,
 *                  tugmalar kabi engil ko'tarilgan elementlar uchun.
 * [2]–[8]        — asta-sekin kuchayib boruvchi soyalar;
 *                  dialog, dropdown, tooltip kabi elementlar uchun.
 * [9]–[16]       — o'rta darajali soyalar; drawer, modal va
 *                  oynaviy komponentlar uchun.
 * [17]–[24]      — eng kuchli soyalar; snackbar, full-screen
 *                  dialog yoki "floating" elementlar uchun.
 *
 * Har bir qiymat ikkita qatlamdan iborat:
 *   1) '0 0 1px 0 rgba(0,0,0,0.31)' — kontur (outline) soyasi;
 *      elementning chekkasini aniqlashtiradi.
 *   2) '0 Npx Mpx -Xpx rgba(0,0,0,0.25)' — asosiy ko'tarilish
 *      soyasi; Y offset va blur ortib boradi.
 *
 * Bu massiv index.ts dagi light ob'ektiga shadow: shadow ko'rinishida
 * qo'shiladi va createTheme() orqali tema ichiga yuklanadi.
 * ──────────────────────────────────────────────────────────────────
 */
export default [
	'none',
	'0 0 0 1px rgba(63,63,68,0.05), 0 1px 2px 0 rgba(63,63,68,0.15)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 2px 2px -2px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 3px 4px -2px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 4px 6px -2px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 4px 8px -2px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 5px 8px -2px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 6px 12px -4px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 7px 12px -4px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 6px 16px -4px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 7px 16px -4px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 8px 18px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 9px 18px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 10px 20px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 11px 20px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 12px 22px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 13px 22px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 14px 24px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 16px 28px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 18px 30px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 20px 32px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 22px 34px -8px rgba(0,0,0,0.25)',
	'0 0 1px 0 rgba(0,0,0,0.31), 0 24px 36px -8px rgba(0,0,0,0.25)',
];
