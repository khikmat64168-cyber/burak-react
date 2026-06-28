/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * Import qismi — bu fayl ilovaning asosiy kirish nuqtasi (entry point).
 * React va ReactDOM — UI yaratish va uni real DOMga ulash uchun.
 * Provider (react-redux) — Redux store'ni butun ilovaga tarqatadi.
 * store — Redux Toolkit bilan yaratilgan markaziy holat boshqaruvchi.
 * App — ilovaning ildiz (root) komponenti.
 * reportWebVitals — ilovaning ishlash ko'rsatkichlarini o'lchash uchun.
 * CssBaseline — brauzerlar o'rtasidagi CSS farqlarini normallashtiradi.
 * ThemeProvider — MUI tema obyektini butun komponent daraxtiga uzatadi.
 * theme — MaterialTheme/index.ts dan olingan maxsus MUI temasi.
 * ──────────────────────────────────────────────────────────────────
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import './css/index.css';
import theme from './app/MaterialTheme';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root')!;
const root = createRoot(container);
/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * ReactDOM.render() — Virtual DOMdagi komponent daraxtini haqiqiy
 * brauzer DOMidagi #root elementiga chiqaradi (render qiladi).
 *
 * React.StrictMode — faqat development rejimida ishlaydi; noto'g'ri
 * API ishlatishlar, eskirgan metodlar va kutilmagan yon ta'sirlar
 * haqida ogohlantirishlar beradi.
 *
 * Provider store={store} — Redux store'ni ilovaning barcha
 * komponentlariga useSelector/useDispatch orqali yetkazib beradi.
 *
 * ThemeProvider theme={theme} — MUI komponentlari uchun maxsus rang,
 * tipografiya va shadow sozlamalarini o'rnatadi.
 *
 * CssBaseline — <body>, <html>, elementlarning default margin/padding
 * va box-sizing qoidalarini tekislaydi; temadagi styleOverrides
 * qoidalari shu yerda qo'llanadi.
 *
 * document.getElementById('root') — public/index.html ichidagi
 * <div id="root"> elementini topib, React daraxtini shu joyga ulaydi.
 * ──────────────────────────────────────────────────────────────────
 */
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <App />
        </Router>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
//boilerplate ishlashi  redax toolkit // real dom va virtual dom
//Material UI da 3 ta asosiy element : Container.  ,   Stack     ,    Box. U emotion enginedan foydalanadi

/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * reportWebVitals() — argumentsiz chaqirilganda natijalarni
 * konsolga chiqarmaydi. Agar loglash kerak bo'lsa:
 * reportWebVitals(console.log) ko'rinishida ishlatiladi.
 * CLS, FID, LCP, TTFB, FCP kabi Core Web Vitals ko'rsatkichlarini
 * o'lchaydi va analytics xizmatiga yuborish imkonini beradi.
 * ──────────────────────────────────────────────────────────────────
 */
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
