# 28 va 30 July — PPT Slide Prompts
## Context API, Token/Cookie, Auth Flow

---

## SLIDE 1 — Title

**Sarlavha:** React Context API & Authentication Flow
**Pastki sarlavha:** Global state, Token, Cookie va Auth jarayoni — Bumarak loyihasida
**Vizual:** Chapda Bumarak logosi, o'ngda yashil "LOGIN" va avatar ikonkasi
**Rang:** Qoʻngʻir/oltin (#A0845C) fon, oq matn

---

## SLIDE 2 — Muammo: Prop Drilling nima edi?

**Sarlavha:** Prop Drilling — Eski yondashuv

**Chap tomon (qizil X bilan):**
```
index.tsx
  └── App.tsx  ← authMember shu yerda
        └── OtherNavbar (props orqali uzatiladi)
              └── Basket (props orqali uzatiladi)
                    └── UserAvatar (props orqali uzatiladi)
                                    ↑ bu yerga yetib kelishi uchun
                                    4 qavat props kerak!
```

**O'ng tomon (yashil ✓ bilan):**
```
ContextProvider (authMember shu yerda saqlaydi)
       ↓ istalgan komponent to'g'ridan to'g'ri oladi
  OtherNavbar → useGlobals() → authMember ✓
  Basket      → useGlobals() → authMember ✓
  App.tsx     → useGlobals() → authMember ✓
```

**Pastda matn:** Props drilling — ma'lumotni yuqoridan pastga har bir komponentdan "uzatib" o'tish. Context API — istalgan komponent to'g'ridan context dan oladi.

---

## SLIDE 3 — Context API 3 qadami

**Sarlavha:** React Context API — 3 asosiy qadam

**3 ta katta raqamli blok (gorizontal):**

**① YARATISH**
```ts
// useGlobals.ts
export const GlobalContext =
  createContext<GlobalInterface | undefined>(
    undefined
  );
```
Fayl: `src/app/hooks/useGlobals.ts`
Vazifa: Bo'sh idish yaratamiz — hali ma'lumot yo'q

**② BERISH (Provide)**
```tsx
// ContextProvider.tsx
<GlobalContext.Provider
  value={{ authMember, setAuthMember }}
>
  {children}
</GlobalContext.Provider>
```
Fayl: `src/app/context/ContextProvider.tsx`
Vazifa: Idishni to'ldiramiz va barcha farzand componentlarga beramiz

**③ OLISH (Consume)**
```ts
// istalgan component
const { authMember } = useGlobals();
```
Fayl: App.tsx, OtherNavbar.tsx, HomeNavbar.tsx, auth/index.tsx
Vazifa: Idishdan kerakli ma'lumotni olamiz

---

## SLIDE 4 — GlobalContext va GlobalInterface

**Sarlavha:** GlobalContext — `useGlobals.ts` fayli anatomiyasi

**To'liq kod bloki (syntax highlight bilan):**
```ts
// src/app/hooks/useGlobals.ts

import { createContext, useContext } from 'react';
import { Member } from '../../lib/types/member';

// 1. TypeScript interface — qanday ma'lumot saqlanadi?
interface GlobalInterface {
  authMember: Member | null;          // login bo'lgan user yoki null
  setAuthMember: (member: Member | null) => void;  // user o'zgartirish funksiyasi
}

// 2. Context yaratamiz — boshlang'ich qiymat: undefined
export const GlobalContext = createContext<GlobalInterface | undefined>(
  undefined,
);

// 3. Custom hook — har joyda ishlatish uchun
export const useGlobals = () => {
  const context = useContext(GlobalContext);
  if (context === undefined)
    throw new Error('useGlobals within Provider');
  return context;  // { authMember, setAuthMember }
};
```

**O'ng tomonda annotatsiya o'qlari:**
- `Member | null` → "Login bo'lgan user ma'lumotlari yoki null (login bo'lmagan)"
- `setAuthMember` → "Context ni yangilash funksiyasi"
- `createContext(undefined)` → "Boshlang'ich qiymat — Provider bo'lmasa undefined"
- `useContext(GlobalContext)` → "React hook — context dan ma'lumot oladi"
- `throw new Error(...)` → "Provider dan tashqarida ishlatilsa — xato"

---

## SLIDE 5 — ContextProvider anatomiyasi (asosiy slide)

**Sarlavha:** ContextProvider.tsx — Global State ning "saqlovchisi"

**Chapda to'liq kod (syntax highlight):**
```tsx
// src/app/context/ContextProvider.tsx

import React, { ReactNode, useState } from 'react';
import Cookies from 'universal-cookie';
import { Member } from '../../lib/types/member';
import { GlobalContext } from '../hooks/useGlobals';

const ContextProvider: React.FC<{ children: ReactNode }> =
  ({ children }) => {

  // 1. Cookie tekshirish
  const cookies = new Cookies();
  if (cookies.get('accessToken'))
    localStorage.removeItem('memberData');

  // 2. State — localStorage dan o'qib boshlaydi
  const [authMember, setAuthMember] = useState<Member | null>(
    localStorage.getItem('memberData')
      ? JSON.parse(localStorage.getItem('memberData') as string)
      : null,
  );

  // 3. Barcha farzand componentlarga beradi
  return (
    <GlobalContext.Provider value={{ authMember, setAuthMember }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;
```

**O'ng tomonda numbered annotatsiyalar:**

🔴 **1 — Cookie tekshirish**
`accessToken` cookie mavjud bo'lsa → localStorage tozalanadi
(sessiya boshqa qurilmada ochilgan holat)

🟡 **2 — useState + localStorage**
App birinchi yuklanganda localStorage dan `memberData` o'qiydi.
Agar mavjud → JSON.parse → `authMember` state ga qo'yadi.
Agar yo'q → `null` (login bo'lmagan holat).

🟢 **3 — Provider + children**
`{children}` — ichidagi BARCHA componentlar endi
`{ authMember, setAuthMember }` ga ega bo'ladi.
Bu bo'lmasa → oq ekran!

---

## SLIDE 6 — Token va Cookie nima? (nazariya)

**Sarlavha:** Token, Cookie, Session — farqi nima?

**3 ta ustun:**

**🍪 Cookie**
```
Brauzer → Backend ga
har so'rovda avtomatik yuboradi

Bizning loyihada:
connect.sid = s%3AM9zHTF...

httpOnly: true → JS o'qiy olmaydi
Faqat backend ko'radi
```

**🔑 Token (accessToken)**
```
Backend login/signup da beradi
Frontendda localStorage da saqlanadi

{ memberNick, memberPhone, ... }
  → JSON.stringify()
  → localStorage 'memberData'

JS o'qiy oladi
```

**🔄 Session**
```
Backend (Express) da saqlanadi
connect.sid → session ID

logout → backend session o'chiradi
         → Set-Cookie: expires=past
         → Brauzer cookie o'chiradi
```

**Pastda muhim farq:**
| | Cookie (connect.sid) | localStorage (memberData) |
|---|---|---|
| Kim o'chiradi? | Backend (logout) | Frontend (JS) |
| JS ko'ra oladimi? | httpOnly bo'lsa YO'Q | HA |
| Brauzer yopilsa? | Saqlanadi | Saqlanadi |

---

## SLIDE 7 — withCredentials va CORS

**Sarlavha:** `withCredentials: true` — Cookie ni so'rov bilan yuborish

**Markazda katta diagram:**

```
FRONTEND (localhost:3000)          BACKEND (localhost:3003)
                                   
axios.post('/member/signup', data, {
  withCredentials: true  ─────────────────────────────→  Express server
})                                                         req.session.member = ...
                                                           ↓
                         ←─────────────────────────────  Set-Cookie: connect.sid=...
                                                           200 OK + { member: {...} }
                         
Brauzer: connect.sid cookie ni saqlaydi ✓

axios.post('/member/logout', {}, {
  withCredentials: true  ─────────────────────────────→  Express server
})                              Cookie: connect.sid=...    ↓ session topiladi?
                                                           ↓ YO'Q → 401 Unauthorized
                         ←─────────────────────────────  401 (session expired)
```

**Pastda 2 ta quti:**

🟢 **withCredentials: true bo'lmasa:**
Cookie yuborilmaydi → Backend sessiyani topa olmaydi → 401

🔴 **CORS xatosi chiqishi uchun:**
Backend da `Access-Control-Allow-Credentials: true` bo'lishi kerak
`Access-Control-Allow-Origin: *` EMAS — aniq origin bo'lishi kerak

---

## SLIDE 8 — index.tsx — Provider o'rash (wrapping)

**Sarlavha:** `index.tsx` — ContextProvider barcha componentni o'raydi

**Kod bloki (o'ng tomon katta vizual bilan):**
```tsx
// src/index.tsx

root.render(
  <React.StrictMode>
    <Provider store={store}>         {/* Redux store */}
      <ContextProvider>              {/* ← Global auth state */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />                  {/* ← barcha sahifalar */}
          </Router>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>,
);
```

**O'ng tomonda daraxt shakli:**
```
React.StrictMode
  └── Provider (Redux)
        └── ContextProvider  ← authMember bu yerda
              └── ThemeProvider
                    └── Router
                          └── App
                                ├── HomeNavbar   → useGlobals() ✓
                                ├── OtherNavbar  → useGlobals() ✓
                                ├── ProductsPage
                                ├── UserPage
                                └── AuthModal    → useGlobals() ✓
```

**Muhim eslatma quti:**
`{children}` bo'lmasa → ContextProvider ichidagi hech narsa ko'rinmaydi → Oq ekran!
Bu loyihada duch kelgan eng katta bug! Fix: `{children}` qo'shildi.

---

## SLIDE 9 — Signup flow — to'liq jarayon

**Sarlavha:** Signup — foydalanuvchi ro'yxatdan o'tganda nima bo'ladi?

**Vertikal oqim (numbered stepslar bilan):**

```
① Foydalanuvchi forma to'ldiradi
   [username] [phone] [password]
   → handleUsername, handleMemberPhone, handleMemberPassword
   → useState: memberNick, memberPhone, memberPassword
   Fayl: src/app/components/auth/index.tsx

② "SIGNUP" tugmasi bosiladi
   → handleSignupRequest() chaqiriladi
   → Validatsiya: barcha maydonlar to'ldirilganmi?

③ Backend ga so'rov
   → new MemberService().signup({ memberNick, memberPassword, memberPhone })
   → axios.post('http://localhost:3003/member/signup', input, { withCredentials: true })
   Fayl: src/app/services/MemberService.ts

④ Backend javob beradi
   → 201 Created
   → response: { member: { _id, memberNick, memberPhone, ... } }
   → Set-Cookie: connect.sid=... (sessiya cookie)

⑤ Frontend saqlaydi
   → localStorage.setItem('memberData', JSON.stringify(member))
   → return member;
   Fayl: src/app/services/MemberService.ts

⑥ Context yangilanadi
   → setAuthMember(result)
   → GlobalContext.Provider value yangilanadi
   → Barcha componentlar qayta render bo'ladi
   Fayl: src/app/components/auth/index.tsx

⑦ UI yangilanadi
   → authMember !== null → Login tugmasi YO'QOLADI
   → Avatar rasm paydo bo'ladi
   Fayl: OtherNavbar.tsx, HomeNavbar.tsx
```

---

## SLIDE 10 — Login flow

**Sarlavha:** Login — qaytib kirish jarayoni

**Chap-o'ng parallel diagram:**

**CHAP — Ko'rsatiladi:**
```
authMember === null bo'lganda:

{!authMember ? (
  <Button onClick={() => setLoginOpen(true)}>
    LOGIN
  </Button>
) : (
  <img src={avatar} onClick={handleLogoutClick} />
)}
```

**O'RTA — Flow o'qi:**
```
LOGIN tugmasi bosiladi
        ↓
loginOpen = true
        ↓
<Modal open={loginOpen}>
        ↓
handleLoginRequest()
        ↓
MemberService.login()
        ↓
axios.post('/member/login')
withCredentials: true
        ↓
Backend → 200 OK + member
        ↓
localStorage + setAuthMember()
        ↓
loginOpen = false
        ↓
UI: Avatar ko'rinadi
```

**O'NG — Keyin ko'rsatiladi:**
```
authMember !== null bo'lganda:

{!authMember ? (
  <Button>LOGIN</Button>
) : (
  <img
    src={serverApi/memberImage}
    onClick={handleLogoutClick}  ← Logout menu ochadi
  />
)}
```

---

## SLIDE 11 — Logout flow + muammo tahlili

**Sarlavha:** Logout — nima bo'lishi kerak va nima muammo bor?

**Chap — MAQSAD (ideal jarayon):**
```
① Avatar ustiga bosadi
   → handleLogoutClick() → anchorEl = e.currentTarget
   → MUI Menu ochiladi

② "Logout" MenuItem bosiladi
   → handleLogoutRequest() → App.tsx

③ Backend ga so'rov
   → MemberService.logout()
   → POST /member/logout
   → withCredentials: true
   → Cookie: connect.sid=... yuboriladi

④ Backend (ideal)
   → Session o'chiradi
   → Set-Cookie: connect.sid=; expires=past
   → return { logout: true }

⑤ Frontend
   → localStorage.removeItem('memberData')
   → setAuthMember(null)
   → sweetAlert: "success"
   → Avatar yo'qoladi, LOGIN tugmasi chiqadi
```

**O'ng — HAQIQIY MUAMMO:**
```
❌ Backend → 401 Unauthorized

Sabab: Backend sessiyasi yo'q
(server restart yoki sessiya expired)

connect.sid cookie brauzerda bor,
lekin backend uni topolmaydi!

httpOnly cookie → JS o'chira olmaydi
Faqat backend o'chira oladi

Result:
→ catch(err) → sweetErrorHandling()
→ "Something went wrong" 🔴
→ Cookie brauzerda qoladi 🔴
→ localStorage tozalanmaydi 🔴
```

**Pastda yashil quti — Yechim yo'li:**
Backend logout endpointini autentifikatsiyasiz ishlashiga ruxsat berish kerak
YOKI frontend da `finally` bloki orqali localStorage tozalash

---

## SLIDE 12 — useGlobals — Custom Hook chuqurroq

**Sarlavha:** `useGlobals()` — Nima uchun custom hook yasadik?

**Chap tomon — BEFORE (useGlobals yo'q):**
```tsx
// Har bir componentda:
import { useContext } from 'react';
import { GlobalContext } from '../hooks/useGlobals';

const context = useContext(GlobalContext);
if (context === undefined) {
  throw new Error('...');
}
const { authMember, setAuthMember } = context;
```
❌ Har joyda 5 qator takrorlash
❌ Xato teksiruvini unutish mumkin

**O'ng tomon — AFTER (useGlobals bilan):**
```tsx
// Har bir componentda faqat:
import { useGlobals } from '../../hooks/useGlobals';

const { authMember, setAuthMember } = useGlobals();
```
✅ 1 qator
✅ Xato tekshiruvi ichida yashiringan
✅ Hamma joyda bir xil

**Pastda — kim ishlatadi useGlobals():**
| Fayl | Nima oladi | Nima uchun |
|---|---|---|
| App.tsx | `setAuthMember` | Logout da null qilish |
| HomeNavbar.tsx | `authMember` | Avatar/Login ko'rsatish |
| OtherNavbar.tsx | `authMember` | Avatar/Login ko'rsatish |
| auth/index.tsx | `setAuthMember` | Signup/Login dan keyin set qilish |

---

## SLIDE 13 — setAuthMember — Qanday ishlaydi?

**Sarlavha:** `setAuthMember()` — Context yangilanishi va re-render

**Markazda katta flow diagram:**

```
                    setAuthMember(member)
                           ↓
              ContextProvider dagi useState yangilanadi
              authMember = member  (endi null emas)
                           ↓
         GlobalContext.Provider value yangilanadi
         value = { authMember: member, setAuthMember }
                           ↓
    ┌──────────────────────┼──────────────────────┐
    ↓                      ↓                      ↓
App.tsx                OtherNavbar.tsx        auth/index.tsx
(re-render)            (re-render)            (re-render)
    ↓                      ↓
anchorEl state         authMember !== null
saqlanadi              ↓
                    LOGIN → Avatar
                    ko'rinadi!
```

**Pastda muhim izoh:**
`setAuthMember` — bu React ning `useState` dan kelgan setter funksiyasi.
U har chaqirilganda ContextProvider qayta render bo'ladi.
Uning ichidagi BARCHA componentlar ham yangi `authMember` ni oladi.
Bu — React ning reaktivligi (reactivity).

---

## SLIDE 14 — localStorage + Context sinxronizatsiyasi

**Sarlavha:** localStorage va Context — ikki xotira

**Ikki tomon diagram:**

**🧠 React Context (RAM xotira)**
```
Brauzer tab ochiq bo'lganda ishlaydi.
Tab yopilsa → yo'qoladi.

authMember = {
  _id: "...",
  memberNick: "Martin",
  memberPhone: "821...",
  ...
}

→ UI ni boshqaradi
→ Tezkor (RAM)
→ Qayta yuklaganda yo'qoladi
```

**💾 localStorage (disk xotira)**
```
Brauzer yopilsa ham saqlanadi.
Foydalanuvchi login qolganda muhim.

localStorage['memberData'] =
  '{"_id":"...","memberNick":"Martin",...}'

→ Sayt qayta yuklanganda
  ContextProvider bu yerdan o'qiydi
→ Sekin (disk)
→ Qayta yuklaganda ham qoladi
```

**O'RTA — sinxronizatsiya:**
```
Signup/Login:
  ① Backend javob beradi
  ② localStorage.setItem('memberData', JSON.stringify(member))
  ③ setAuthMember(member)
  Ikkalasi bir vaqtda yangilanadi ✓

Logout:
  ① localStorage.removeItem('memberData')
  ② setAuthMember(null)
  Ikkalasi bir vaqtda tozalanadi ✓

Sahifa qayta yuklaganda:
  ContextProvider → localStorage dan o'qiydi
  → authMember state ni tiklaydi
  Context tiklangan ✓
```

---

## SLIDE 15 — To'liq Data Flow Diagram

**Sarlavha:** 28-30 July — Barcha bog'liqliklar xaritasi

**Katta vizual diagram (Excalidraw uslubida):**

```
┌─────────────────────────────────────────────────────────────────┐
│                         index.tsx                               │
│  <ContextProvider>  ←─── authMember va setAuthMember shu yerda  │
│    <App>                                                        │
└────────────────────────────┬────────────────────────────────────┘
                             │ props orqali emas — Context orqali
          ┌──────────────────┼──────────────────┐
          │                  │                  │
          ↓                  ↓                  ↓
  ┌───────────────┐  ┌──────────────┐  ┌──────────────────┐
  │  HomeNavbar   │  │  OtherNavbar │  │  auth/index.tsx  │
  │  useGlobals() │  │  useGlobals()│  │  useGlobals()    │
  │  authMember   │  │  authMember  │  │  setAuthMember   │
  │  →LOGIN/Avatar│  │  →LOGIN/Avar │  │  → signup/login  │
  └───────┬───────┘  └──────┬───────┘  └────────┬─────────┘
          │                  │                   │
          │ handleLogout     │ handleLogout       │ handleSignup/Login
          │ Click/Request    │ Click/Request      │ Request
          └──────────┬───────┘                   │
                     ↓                           ↓
              ┌─────────────┐          ┌──────────────────┐
              │   App.tsx   │          │  MemberService   │
              │ setAuthMember│         │  .signup()       │
              │ (null)      │          │  .login()        │
              │ sweetAlert  │          │  .logout()       │
              └──────┬──────┘          └────────┬─────────┘
                     │                          │ axios + withCredentials
                     │                          ↓
                     │                ┌──────────────────┐
                     │                │  Backend API     │
                     │                │  localhost:3003  │
                     │                │  /member/signup  │
                     │                │  /member/login   │
                     │                │  /member/logout  │
                     │                └────────┬─────────┘
                     │                         │
                     │              ┌──────────┴──────────┐
                     │              │                     │
                     │         Set-Cookie:           memberData
                     │         connect.sid          (response)
                     │              │                     │
                     │         Brauzer                localStorage
                     │         Cookie                 .setItem()
                     │              │                     │
                     └──────────────┴─────────────────────┘
                                setAuthMember(member) ↑
```

---

## SLIDE 16 — Yangi fayllar va o'zgarishlar xulosa jadvali

**Sarlavha:** 28-30 July — Qaysi fayllarda nima qilindi?

**Katta jadval:**

| Fayl | Status | Qilingan amal |
|---|---|---|
| `src/app/hooks/useGlobals.ts` | 🆕 YANGI | `GlobalContext`, `GlobalInterface`, `useGlobals` hook yaratildi |
| `src/app/context/ContextProvider.tsx` | 🆕 YANGI | `authMember` state, localStorage o'qish, Provider wrapping |
| `src/index.tsx` | ✏️ O'ZGARGAN | `<ContextProvider>` bilan barcha app o'ralgan |
| `src/app/App.tsx` | ✏️ O'ZGARGAN | `useGlobals()`, `handleLogoutRequest`, `anchorEl`, logout Menu |
| `src/app/components/auth/index.tsx` | ✏️ O'ZGARGAN | `useGlobals()`, `setAuthMember(result)` signup/login dan keyin |
| `src/app/components/headers/HomeNavbar.tsx` | ✏️ O'ZGARGAN | `useGlobals()`, logout Menu, Avatar/Login conditional render |
| `src/app/components/headers/OtherNavbar.tsx` | ✏️ O'ZGARGAN | `onClick={handleLogoutClick}` avatar ga qo'shildi |
| `src/app/services/MemberService.ts` | ✏️ O'ZGARGAN | `logout()` metodi, `withCredentials: true` |

**Pastda xulosa:**
2 ta yangi fayl + 6 ta o'zgargan fayl = Auth tizimi to'liq ishlaydi

---

## SLIDE 17 — Xato va Buglar xulosa

**Sarlavha:** 30 July — Topilgan va tuzatilgan buglar

**4 ta bug karti (2x2 grid):**

**Bug #1 — Oq ekran**
```
Sabab: ContextProvider da
{children} yo'q edi!

<GlobalContext.Provider value={...}>
  ❌ // bo'sh — hech narsa ko'rinmadi
</GlobalContext.Provider>

Fix: {children} qo'shildi ✓
```

**Bug #2 — Typo: stAuthMember**
```
Sabab: setAuthMember o'rniga
stAuthMember yozilgan (typo)

const [authMember, stAuthMember] = useState(...)
❌ stAuthMember — bu mavjud emas!

Fix: setAuthMember deb to'g'irlandi ✓
```

**Bug #3 — memberData bo'sh joy**
```
localStorage.getItem('memberData ')
                              ↑ bu yerda bo'sh joy bor edi!

'memberData ' !== 'memberData'
Shuning uchun har doim null qaytardi

Fix: bo'sh joy olib tashlandi ✓
```

**Bug #4 — onClick yo'q**
```
OtherNavbar da avatar img ga
onClick={handleLogoutClick} yo'q edi

→ Avatar bosib bo'lmasdi
→ Logout menu chiqmasdi

Fix: onClick={handleLogoutClick} qo'shildi ✓
```

---

## SLIDE 18 — Yakuniy xulosa

**Sarlavha:** Nima o'rgandik?

**6 ta karta (2x3 grid):**

**🧩 Context API**
createContext → Provider → useContext
Global state uchun ideal yechim

**🔐 Authentication**
Signup/Login → Backend → Cookie + localStorage
setAuthMember → UI yangilanadi

**🍪 Cookie vs localStorage**
connect.sid (httpOnly) — backend boshqaradi
memberData — frontend boshqaradi

**🪝 Custom Hook**
useGlobals() = useContext + xato tekshiruvi
Har joyda 1 qatorda ishlatiladi

**🔄 Re-render**
setAuthMember chaqirilsa → Provider yangilanadi
→ Barcha farzandlar yangi qiymat oladi

**🐛 Debug**
Typo, bo'sh joy, {children} — kichik xatolar
katta muammo tug'diradi. Konsol doim ochiq!

---

*Fayl: 28-30-july-ppt-prompts.md*
*Muallif: Bumarak loyihasi*
*Sana: July 30, 2026*
