/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * Import qismi — App.tsx faylining bog'liqliklari (dependencies):
 * React — JSX sintaksisini JavaScript'ga aylantirish uchun zarur.
 * '../css/app.css' — komponentga xos global CSS stillari.
 * Box, Button, Container, Stack, Typography — MUI'ning tayyor
 *   layout va UI komponentlari; har biri sx prop orqali inline
 *   stil qabul qiladi va tema qiymatlariga murojaat qila oladi.
 * RippleBadge — styled.ts dan import qilingan maxsus Badge
 *   komponenti; uning ustida jonli to'lqin (ripple) animatsiyasi bor.
 * ──────────────────────────────────────────────────────────────────
 */
import React from 'react';
import '../css/app.css';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import { About } from './screens/About';
import { Users } from './screens/Users';

/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * App() — ilovaning ildiz funksional komponenti.
 *
 * Container sx={{ background: 'orange' }}
 *   MUI Container — ichidagi kontentni gorizontal markazlaydi va
 *   max-width cheklovini qo'llaydi (theme'da maxWidthLg = 1300px).
 *   sx prop — emotion orqali inline stil beradi; bu yerda fon rangi
 *   orange qilib o'rnatilgan (namoyish maqsadida).
 *
 * Stack direction="column"
 *   Flexbox asosidagi layout komponenti. direction="column" bolalar
 *   elementlarni vertikal (yuqoridan pastga) tartibda joylashtiradi.
 *
 * Box sx={{ my: 4 }}
 *   Oddiy div o'rnini bosuvchi MUI Box. my: 4 → margin-top va
 *   margin-bottom = theme.spacing(4) = 32px.
 *
 * Typography variant="h4" component={'h4'}
 *   Matnni stillashtirish komponenti. variant="h4" vizual ko'rinishni,
 *   component={'h4'} esa HTML tegini belgilaydi (semantik to'g'rilik).
 *
 * RippleBadge badgeContent={4}
 *   Bolasining ustiga raqamli nishon (badge) qo'yadi. badgeContent=4
 *   nishon ichida "4" raqamini ko'rsatadi va ripple animatsiyasi
 *   ishlaydi.
 *
 * Button variant="contained" color={'secondary'}
 *   MUI tugmasi. variant="contained" to'liq rang bilan to'ldirilgan
 *   ko'rinish. color='secondary' — temadagi secondary: main: '#d7b586'
 *   rangini qo'llaydi.
 * ──────────────────────────────────────────────────────────────────
 */
function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
        </ul>
      </nav>

      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

function Home() {
  return <Container>Home</Container>;
}

/**
 * ─── KOD TAHLILI ──────────────────────────────────────────────────
 * export default App — App komponentini default export sifatida
 * chiqaradi. index.tsx import App from './app/App' deb uni
 * import qiladi va ReactDOM.render ichida ishlatadi.
 * ──────────────────────────────────────────────────────────────────
 */
export default App;
