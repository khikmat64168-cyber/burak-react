# Yozilgan Kodlar Jamlanmasi — July 13–18

> Har bir kod bloki tepasida fayl manzili ko'rsatilgan.
> Commit tartibida, sanama-sana ketma-ket joylashtirilgan.

---

## July 13 — Dushanba

### Commit 1: `feat: create Test1 class component` (11:35)

---

`README.md` — Publishing Rules qo'shildi

```md
## Publishing Rules

- Layout Components

Container 1300px
Stack
Box

- Type of Components

- Screen Components: HomePage & ProductsPage
- Sectional Components: Statistics & PopularDishes
- Common (Reusable) Component: Header & Footer

## Available Scripts

### `yarn run start`
Runs the app in the development mode.

### `yarn run build`
Builds the app for production to the build folder.

### Hook lar orqali biz funcsiyalarimiz ichida huddi classlar kabi
### funksiyalarning suniy statelarini hosil qiamiz
```

---

`src/app/screens/Test1.tsx` — yangi fayl yaratildi

```tsx
//@ts-nocheck
import React, { Component } from 'react';

class Test1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: 'Ford',
      model: 'Mustang',
      color: 'red',
      year: 1964,
    };
  }

  changeDetail = () => {
    this.setState({
      color: 'blue',
      brand: 'Tesla',
      model: 'ModelS',
      year: 2023,
    });
  };

  componentDidMount() {
    console.log('componentDidMount');
    // runs after first render
    // backendimizdan datani olish uchun life cycle metodi ishga tushadi
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    // runs before component unmount
    // a pagedan b page ga o'tganda a pageni yashiradi
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}
          {this.state.model}
          from {this.state.year}.
        </p>
        <button type="button" onClick={this.changeDetail}>
          Change Detail
        </button>
      </div>
    );
  }
}

export default Test1;
```

---

### Commit 2: `feat: practise useEffect & useState hooks` (16:19)

---

`src/app/components/headers/HomeNavbar.tsx` — useState va useEffect qo'shildi

```tsx
import { Box, Button, Container, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Basket from './Basket';
import { useEffect, useState } from 'react';

export default function HomeNavbar() {
  const authMember = null;

  // useState — sonni saqlash uchun, boshlang'ich qiymati 0
  const [count, setCount] = useState<number>(0);

  // useState — boolean saqlash uchun, boshlang'ich qiymati true
  const [value, setvalue] = useState<boolean>(true);

  useEffect(() => {
    console.log('componentDidiMount');
    setCount(count + 1);
    console.log('componentUpdate');

    // cleanup funksiyasi — componentWillUnmount o'rnida
    return () => {
      console.log('componentWillUnmount');
    };
  }, [value]); // value o'zgarganda qayta ishga tushadi = componentDidUpdate

  /** HANDLERS */
  const buttonHandler = () => {
    setvalue(!value); // true → false → true ... toggle
  };

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img className="brand-logo" src="/icons/bumarak.svg" />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={'hover-line'}>
              <NavLink to="/" activeClassName={'underline'}>Home</NavLink>
            </Box>
            <Box className={'hover-line'}>
              <NavLink to="/products" activeClassName={'underline'}>Products</NavLink>
            </Box>
            {authMember ? (
              <Box className={'hover-line'}>
                <NavLink to="/orders" activeClassName={'underline'}>Orders</NavLink>
              </Box>
            ) : (true)}
            {authMember ? (
              <Box className={'hover-line'}>
                <NavLink to="/member-page" activeClassName={'underline'}>My Page</NavLink>
              </Box>
            ) : null}
            <Box className={'hover-line'}>
              <NavLink to="/help" activeClassName={'underline'}>Help</NavLink>
            </Box>
            <Basket />
            {!authMember ? (
              <Box>
                <Button variant="contained" className="login-button">Login</Button>
              </Box>
            ) : (
              <img className="user-avatar" src={'/icons/default-user.svg'} aria-haspopup={'true'} />
            )}
          </Stack>
        </Stack>

        <Stack className={'header-frame'}>
          <Stack className={'detail'}>
            <Box className={'head-main-txt'}>World's Most Delicious Cousine</Box>
            <Box className={'wel-txt'}>The Choice, not just a choice</Box>
            {/* count state — SIGN UP bosilganda raqam o'zgaradi */}
            <Box className={'service-txt'}> {count} hours service</Box>
            <Box className={'signup'}>
              {!authMember ? (
                <Button
                  variant={'contained'}
                  className={'signup-button'}
                  onClick={() => buttonHandler()}
                >
                  SIGN UP
                </Button>
              ) : null}
            </Box>
          </Stack>
          <Box className={'logo-frame'}>
            <div className={'logo-img'}></div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
```

---

## July 14 — Seshanba

### Commit 3: `fix: modify homepage screen component` (08:13)

---

`src/app/App.tsx` — Test1 o'chirildi, HomePage qaytarildi

```tsx
// O'ZGARGAN QISM (faqat Route "/" qismi):

// OLDIN:
<Route path="/">
  <Test1 />
  {/* <HomePage /> */}
</Route>

// KEYIN:
<Route path="/">
  {/* <Test1 /> */}
  <HomePage />
</Route>
```

---

## July 15 — Chorshanba

### Commit 4: `feat: redux tushuncha md da` (17:51)

---

`README.md` — MVC va Redux konspekt qo'shildi

```md
### Functional componentlarimiz ichida ---- class componentimizning suniy statini
### hosil qilib beradigan vosita use state hook i va har uchala phaseni hosil
### qilishga yordam beradigan hook use effect hisoblanadi

### mvc vs flux vs redux architecture lari. farqlari bular?..
### redux da ikkita oqim bor va reduxda reducer degan tushuncha bor.
### Redux 4 qisimdan iborat: view, action, reducer, store.

action creator va action typelar
dispatch(slice) va subscribe(selector) jarayonlar

mvc va redux da flow directionlar farqlari:
  mvc  ---- bidirectional
  redux --- unidirectional

storelar: mvc store yo'q, redux single store

react component initiating change with and without redux

reduxda controller o'rnida reducer amal bajaradi

debugging farqi

redux toolkit -- afzalliklari
```

---

## July 17 — Juma

### Commit 5: `feat: develop AppRootState and HomePage type integrations` (23:36)

---

`src/lib/enums/product.enum.ts` — yangi fayl yaratildi

```ts
// Mahsulot o'lchami
export enum ProductSize {
  SMALL = 'SMALL',
  NORMAL = 'NORMAL',
  LARGE = 'LARGE',
  SET = 'SET',
}

// Ichimlik hajmi (litr, float qiymat)
export enum ProductVolume {
  HALF = 0.5,
  ONE = 1,
  ONE_POINT_TWO = 1.2,
  ONE_POINT_FIVE = 1.5,
  TWO = 2,
}

// Mahsulot holati
export enum ProductStatus {
  PAUSE = 'PAUSE',     // ko'rsatilmaydi
  PROCESS = 'PROCESS', // aktiv, sotuvda
  DELETE = 'DELETE',   // o'chirilgan
}

// Mahsulot kategoriyasi
export enum ProductCollection {
  DISH = 'DISH',
  SALAD = 'SALAD',
  DESSERT = 'DESSERT',
  DRINK = 'DRINK',
  OTHER = 'OTHER',
}
```

---

`src/lib/enums/member.enum.ts` — yangi fayl yaratildi

```ts
// Foydalanuvchi turi
export enum MemberType {
  USER = 'USER',
  RESTAURANT = 'RESTAURANT',
}

// Foydalanuvchi holati
export enum MemberStatus {
  ACTIVE = 'ACTIVE',  // kirishi mumkin
  BLOCK = 'BLOCK',    // bloklangan
  DELETE = 'DELETE',  // o'chirilgan
}
```

---

`src/lib/enums/order.enum.ts` — yangi fayl yaratildi

```ts
// Buyurtma holati
export enum OrderStatus {
  PAUSE = 'PAUSE',     // kutish
  PROCESS = 'PROCESS', // tayyorlanmoqda
  FINISH = 'FINISH',   // yetkazildi
  DELETE = 'DELETE',   // bekor qilindi
}
```

---

`src/lib/enums/view.enum.ts` — yangi fayl yaratildi

```ts
export enum ViewGroup {
  PRODUCT = 'PRODUCT',
}
```

---

`src/lib/types/product.ts` — yangi fayl yaratildi

```ts
import {
  ProductCollection,
  ProductSize,
  ProductStatus,
} from '../enums/product.enum';

// Mahsulot obyektining to'liq shakli (backend dan keladi)
export interface Product {
  _id: string;
  productStatus: ProductStatus;         // enum: PAUSE | PROCESS | DELETE
  productCollection: ProductCollection; // enum: DISH | SALAD | ...
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;             // enum: SMALL | NORMAL | LARGE | SET
  productVolume: number;
  productDesc?: string;                 // ? = ixtiyoriy, bo'lmasligi mumkin
  productImages: string[];              // rasmlar massivi
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

// Mahsulotlarni so'rash (filter) uchun shakl
export interface ProductInquery {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  search?: string;
}
```

---

`src/lib/types/member.ts` — yangi fayl yaratildi

```ts
import { MemberStatus, MemberType } from '../enums/member.enum';

// Foydalanuvchi (backend dan keladi)
export interface Member {
  _id: string;
  memberType: MemberType;       // USER yoki RESTAURANT
  memberStatus?: MemberStatus;  // ACTIVE | BLOCK | DELETE
  memberNick: string;
  memberPhone: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

// Ro'yxatdan o'tish uchun yuboriladi
export interface MemberInput {
  memberType?: MemberType;
  memberStatus?: MemberStatus;
  memberNick: string;
  memberPhone: string;
  memberPassword: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
  memberPoints?: number;
}

// Login uchun yuboriladi
export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

// Profil yangilash uchun
export interface MemberUpdateInput {
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}
```

---

`src/lib/types/screen.ts` — yangi fayl yaratildi

```ts
import { Member } from './member';
import { Product } from './product';

/** REACT APP STATE — butun Redux store ning xaritasi */
export interface AppRootState {
  homePage: HomePageState;
  // productsPage: ProductsPageState;  ← keyincha
  // ordersPage: OrdersPageState;      ← keyincha
}

/** HOMEPAGE — store.homePage ichida nima bo'ladi */
export interface HomePageState {
  popularDishes: Product[]; // mashhur taomlar ro'yxati
  newDishes: Product[];     // yangi taomlar ro'yxati
  topUsers: Member[];       // top foydalanuvchilar
}

/** PRODUCTS PAGE */

/** ORDERS PAGE */
```

---

## July 18 — Shanba

### Commit 6: `feat: create homePage Redux configuration` (00:43)

---

`src/app/screens/homePage/slice.ts` — yangi fayl yaratildi

```ts
import { createSlice } from '@reduxjs/toolkit';
import { HomePageState } from '../../../lib/types/screen';

// Store birinchi ochilganda homePage qanday ko'rinadi
const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

// createSlice — Action va Reducer ni bitta joyda yozish
const homePageSlice = createSlice({
  name: 'homePage',    // store da kalit: state.homePage
  initialState,
  reducers: {
    // har bir funksiya = bitta Action + bitta Reducer

    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload; // kelgan ma'lumot bilan almashtiriladi
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    settopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

// Action Creator lar — dispatch uchun ishlatiladi
export const { setPopularDishes, setNewDishes, settopUsers } =
  homePageSlice.actions;

// Reducer — store.ts ga uzatiladi
const HomePageReducor = homePageSlice.reducer;
export default HomePageReducor;
```

---

`src/app/screens/homePage/selector.ts` — yangi fayl yaratildi

```ts
import { createSelector } from '@reduxjs/toolkit';
import { AppRootState } from '../../../lib/types/screen';

// 1-qadam: butun store dan faqat homePage ni ajrat
const selectHomPage = (state: AppRootState) => state.homePage;

// 2-qadam: homePage dan faqat popularDishes ni ajrat
export const retrievePopularDishes = createSelector(
  selectHomPage,
  (homePage) => homePage.popularDishes,
);

// 2-qadam: homePage dan faqat newDishes ni ajrat
export const retrieveNewDishes = createSelector(
  selectHomPage,
  (homePage) => homePage.newDishes,
);

// 2-qadam: homePage dan faqat topUsers ni ajrat
export const retrieveTopUsers = createSelector(
  selectHomPage,
  (homePage) => homePage.topUsers,
);
```

---

`src/app/store.ts` — HomePageReducor ulandi

```ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import HomePageReducor from './screens/homePage/slice';

export const store = configureStore({
  reducer: {
    homePage: HomePageReducor, // ← bo'sh {} o'rniga reducer ulandi
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

---

`src/app/screens/homePage/index.tsx` — useEffect skeleti qo'shildi

```tsx
import React, { useEffect } from 'react';
// ... (import lar)

export default function HomePage() {
  useEffect(() => {
    // Backend server data request => Data   (hozircha bo'sh)
    // slice: backenddan kelgan Data => store (hozircha bo'sh)
  }, []);

  return (
    <div className={'homepage'}>
      <Statistics />
      <PopularDishes />
      {/* ... */}
    </div>
  );
}
```

---

### Commit 7: `feat: middleware integration redux logger` (00:51)

---

`src/app/store.ts` — redux-logger middleware qo'shildi

```ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger, { logger } from 'redux-logger'; // logger import
import HomePageReducor from './screens/homePage/slice';

export const store = configureStore({
  // middleware — dispatch va reducer orasidagi qatlam
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger as any), // ← yangi qo'shildi
  reducer: {
    homePage: HomePageReducor,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
```

---

### Commit 8: `feat: develop slice and selector usage` (02:47)

---

`src/app/screens/homePage/index.tsx` — dispatch va selector ulandi (to'liq fayl)

```tsx
import React, { useEffect } from 'react';
import Statistics from './Statistics';
import PopularDishes from './PopularDishes';
import NewDishes from './NewDishes';
import Advertisement from './Advertisement';
import ActiveUsers from './ActiveUsers';
import Events from './Events';
import '../../../css/home.css';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { setPopularDishes } from './slice';           // Action Creator
import { retrievePopularDishes } from './selector';   // Selector
import { Product } from '../../../lib/types/product'; // Type

/** REDUX SLICE & SELECTOR */

// dispatch ni component ichida qulay ishlatish uchun wrapper
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

// selector.ts dagi retrievePopularDishes ustiga qo'shimcha qatlam
const popularDishRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function HomePage() {
  // dispatch funksiyasini olish
  const { setPopularDishes } = actionDispatch(useDispatch());

  // store dan popularDishes ni o'qish
  const { popularDishes } = useSelector(popularDishRetriever);

  useEffect(() => {
    // Hozircha qo'lda yozilgan fake ma'lumot
    // Keyincha: API ga so'rov yuborib real data olinadi
    const result = [
      {
        _id: '6a39b1be62f1c50577e78170',
        productStatus: 'PROCESS',
        productCollection: 'DISH',
        productName: 'Kebab',
        productPrice: 14,
        productLeftCount: 75,
        productSize: 'NORMAL',
        productVolume: 1,
        productDesc: 'This is delicious kebab',
        productImages: [
          'uploads/products/b25d78ff-14da-4a97-a761-b2c7cf6457f7.jpg',
          'uploads/products/6eb6d2ad-3fab-4b32-bfaa-078392b30f33.jpeg',
          'uploads/products/4eb012c4-2d39-4506-bc2e-6b7a630c09fd.jpeg',
        ],
        productViews: 0,
        createdAt: '2026-06-22T22:05:50.795Z',
        updatedAt: '2026-06-22T22:05:50.795Z',
        __v: 0,
      },
    ];

    // result → dispatch → Action → Reducer → Store yangilanadi
    //@ts-ignore
    setPopularDishes(result);
  }, []); // [] = faqat birinchi render da ishlaydi

  // Store yangilangandan keyin popularDishes bu yerga keladi
  console.log('popularDishes:', popularDishes);

  return (
    <div className={'homepage'}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
```

---

## Fayllar xaritasi (July 13–18)

```
src/
├── app/
│   ├── store.ts                          ← Jul 18 (commit 6, 7)
│   ├── screens/
│   │   ├── Test1.tsx                     ← Jul 13 (commit 1)
│   │   └── homePage/
│   │       ├── index.tsx                 ← Jul 18 (commit 6, 8)
│   │       ├── slice.ts                  ← Jul 18 (commit 6)
│   │       └── selector.ts               ← Jul 18 (commit 6)
│   └── components/
│       └── headers/
│           └── HomeNavbar.tsx            ← Jul 13 (commit 2)
└── lib/
    ├── enums/
    │   ├── product.enum.ts               ← Jul 17 (commit 5)
    │   ├── member.enum.ts                ← Jul 17 (commit 5)
    │   ├── order.enum.ts                 ← Jul 17 (commit 5)
    │   └── view.enum.ts                  ← Jul 17 (commit 5)
    └── types/
        ├── product.ts                    ← Jul 17 (commit 5)
        ├── member.ts                     ← Jul 17 (commit 5)
        └── screen.ts                     ← Jul 17 (commit 5)

README.md                                 ← Jul 13 (commit 1) + Jul 15 (commit 4)
```

---

## Commit xronologiyasi

| # | Sana | Vaqt | Commit nomi | Fayllar |
|---|------|------|-------------|---------|
| 1 | Jul 13 | 11:35 | create Test1 class component | Test1.tsx, README.md |
| 2 | Jul 13 | 16:19 | practise useEffect & useState hooks | HomeNavbar.tsx |
| 3 | Jul 14 | 08:13 | modify homepage screen component | App.tsx |
| 4 | Jul 15 | 17:51 | redux tushuncha md da | README.md |
| 5 | Jul 17 | 23:36 | develop AppRootState and HomePage type | 7 ta yangi fayl |
| 6 | Jul 18 | 00:43 | create homePage Redux configuration | slice.ts, selector.ts, store.ts, index.tsx |
| 7 | Jul 18 | 00:51 | middleware integration redux logger | store.ts |
| 8 | Jul 18 | 02:47 | develop slice and selector usage | index.tsx |
