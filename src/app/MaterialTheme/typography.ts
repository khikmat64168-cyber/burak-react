/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * typography.ts — MUI temasi uchun tipografiya sozlamalari ob'ekti.
 * Bu ob'ekt index.ts dagi light.typography maydoniga yuklanadi va
 * createTheme() orqali barcha MUI Typography komponentlariga tatbiq
 * etiladi.
 *
 * h1 — sahifaning eng yirik sarlavhasi.
 *   fontWeight: 500 — yarim qalin (medium) og'irlik.
 *   fontSize: 35    — 35px o'lcham (MUI standart: 6rem = 96px dan kichik).
 *   letterSpacing: '-0.24px' — harflar orasini biroz siqish; katta
 *     shriftlarda o'qishni yaxshilaydi.
 *
 * h2 — ikkinchi darajali sarlavha.
 *   fontSize: 29, letterSpacing: '-0.24px'.
 *
 * h3 — uchinchi darajali sarlavha.
 *   fontSize: 24, letterSpacing: '-0.06px' — kamroq siqilish.
 *
 * h4 — to'rtinchi darajali sarlavha (App.tsx da ishlatilgan).
 *   fontSize: 20, letterSpacing: '-0.06px'.
 *
 * h5 — beshinchi darajali sarlavha.
 *   fontSize: 16, letterSpacing: '-0.05px'.
 *
 * h6 — eng kichik sarlavha.
 *   fontSize: 14, letterSpacing: '-0.05px'.
 *
 * overline — kichik bosh harf uslubidagi matn (masalan, teglar,
 *   kategoriyalar). fontWeight: 500 — faqat og'irlik belgilangan,
 *   qolgan qiymatlar MUI standarti bo'yicha qoladi.
 * ──────────────────────────────────────────────────────────────────
 */
export default {
	h1: {
		fontWeight: 500,
		fontSize: 35,
		letterSpacing: '-0.24px',
	},
	h2: {
		fontWeight: 500,
		fontSize: 29,
		letterSpacing: '-0.24px',
	},
	h3: {
		fontWeight: 500,
		fontSize: 24,
		letterSpacing: '-0.06px',
	},
	h4: {
		fontWeight: 500,
		fontSize: 20,
		letterSpacing: '-0.06px',
	},
	h5: {
		fontWeight: 500,
		fontSize: 16,
		letterSpacing: '-0.05px',
	},
	h6: {
		fontWeight: 500,
		fontSize: 14,
		letterSpacing: '-0.05px',
	},
	overline: {
		fontWeight: 500,
	},
};
