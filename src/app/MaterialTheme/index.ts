/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * Import qismi — tema yaratish uchun zarur bog'liqliklar:
 * createTheme — MUI temasi yaratuvchi funksiya; palette, typography,
 *   shadows, components kabi sozlamalarni qabul qiladi.
 * common — MUI ranglari kutubxonasidan oq (white) va qora (black)
 *   standart rang qiymatlarini beradi.
 * shadow — ./shadow.ts dan olingan 25 ta CSS box-shadow qiymatlari
 *   massivi (elevation 0 dan 24 gacha).
 * typography — ./typography.ts dan olingan h1–h6 va overline uchun
 *   shrift o'lchamlari va og'irliklari ob'ekti.
 * maxWidth — import qilingan lekin bu faylda ishlatilmagan; olib
 *   tashlash mumkin (unused import).
 * ──────────────────────────────────────────────────────────────────
 */
import { createTheme } from '@mui/material/styles';
import { common } from '@mui/material/colors';
import shadow from './shadow';
import typography from './typography';
import { maxWidth } from '@mui/system';

/**
 * LIGHT THEME (DEFAULT)
 */

/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * light — yorug' (light) rejim uchun tema sozlamalari ob'ekti.
 *
 * palette.type: 'light' — MUI v4 sintaksisi; v5 da bu 'mode' deyiladi,
 *   lekin v4 bilan muvofiq ishlaydi.
 *
 * background.default: '#f8f8ff' — sahifa foni, deyarli oq, ko'kimtir
 *   soyali ghost white rang.
 * background.paper: common.white — kartalar, dialog, popover fonlari
 *   uchun sof oq rang.
 *
 * primary — asosiy rang. contrastText (matn rangi): ochiq oltin/bronza
 *   '#d7b586'; main (fon rangi): to'q kulrang '#343434'.
 * secondary — ikkilamchi rang. main: oltin/bronza '#d7b586';
 *   contrastText: to'q kulrang '#343434'. Button color='secondary'
 *   shu rangni ishlatadi.
 *
 * text.primary / text.secondary / text.dark — matn rang darajalari.
 *
 * components.MuiContainer.styleOverrides.root.height: '100%' —
 *   barcha Container elementlari balandligini ota elementiga teng
 *   qiladi.
 *
 * components.MuiCssBaseline — global HTML/body stillarini qayta
 *   yozadi: html va body 100% balandlikda, body foni '#f4f6f8'.
 *
 * shadow — 25 elementli CSS box-shadow massivi elevation tizimi uchun.
 * typography — h1–h6 shrift sozlamalari.
 * ──────────────────────────────────────────────────────────────────
 */
const light = {
	palette: {
		type: 'light',
		background: {
			default: '#f8f8ff',
			paper: common.white,
		},
		primary: {
			contrastText: '#d7b586',
			main: '#343434',
		},
		secondary: {
			contrastText: '#343434',
			main: '#d7b586',
		},
		text: {
			primary: '#343434',
			secondary: '#d7b586',
			dark: common.black,
		},
	},
	components: {
		MuiContainer: {
			styleOverrides: {
				root: {
					height: '100%',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				html: { height: '100%' },
				body: { background: '#f4f6f8', height: '100%', minHeight: '100%' },
			},
		},
	},
	shadow,
	typography,
};

/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * Ikki bosqichli tema yaratish (two-pass createTheme pattern):
 *
 * 1-bosqich: let theme = createTheme(light)
 *   light ob'ektidagi palette, typography, shadow, components
 *   sozlamalaridan asosiy tema yaratiladi. Bu qadam breakpoints
 *   ob'ektini ham ishga tushiradi.
 *
 * 2-bosqich: theme = createTheme(theme, { components: {...} })
 *   Birinchi createTheme natijasida hosil bo'lgan theme.breakpoints
 *   ob'ektidan foydalanib, MuiContainer.maxWidthLg uchun responsive
 *   max-width qo'shiladi.
 *   [theme.breakpoints.up('lg')] → '@media (min-width: 1200px)'
 *   maxWidth: '1300px' — lg va undan katta ekranlarda kontentni
 *   1300px ga cheklaydi.
 *
 * Bu pattern zarur, chunki birinchi createTheme chaqiruvida
 * theme.breakpoints hali mavjud emas — shuning uchun media-query
 * ishlatadigan overridelarni ikkinchi o'tishda yozish kerak.
 * ──────────────────────────────────────────────────────────────────
 */
// A custom theme for this app
let theme = createTheme(light);
theme = createTheme(theme, {
	components: {
		MuiContainer: {
			styleOverrides: {
				maxWidthLg: {
					[theme.breakpoints.up('lg')]: {
						maxWidth: '1300px',
					},
				},
			},
		},
	},
});

/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * export default theme — yaratilgan tema obyektini default export
 * sifatida chiqaradi. index.tsx faylida ThemeProvider theme={theme}
 * orqali butun ilovaga uzatiladi.
 * ──────────────────────────────────────────────────────────────────
 */
export default theme;
