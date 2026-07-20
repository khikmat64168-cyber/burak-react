# Claude ga beriladigan prompt — Redux to'liq tahlil

> Bu faylni to'liq ko'chirib Claude.ai ga paste qiling.
> Claude sizga barcha kodlarni ketma-ket, sodda tilda tushuntiradi.

---

## ═══ CLAUDE GA PROMPT BOSHLANADI ═══

Men React TypeScript loyihasida ishlayman. Quyida yozgan barcha kodlarimni
ketma-ket, QATLAM QO'YILIB, SODDA TILDA tushuntirib ber.

Har bir kod bloki uchun:
1. Bu fayl/kod NIMA VAZIFA bajaradi (bir jumlada)
2. Har bir qator yoki guruh NIMA UCHUN yozilgan
3. Bu kod rasmdagi Redux sxemasining QAYSI QISMIGA tegishli
4. Bu kod bo'lmasa NIMA ISHLAMAS EDI

---

## RASMDAGI REDUX SXEMASI (mening tushunishim kerak bo'lgan diagram):

```
┌──────────────────────────────────────────────────────────┐
│                    REDUX FLOW                            │
│                                                          │
│   ┌───────────┐                  ┌───────────┐           │
│   │  View/UI  │ ──── dispatch ──→│  Action   │           │
│   │(Component)│                  └─────┬─────┘           │
│   └─────▲─────┘                        │                 │
│         │                              ▼                 │
│         │                       ┌───────────┐            │
│         │                       │ Reducers  │            │
│         │                       └─────┬─────┘            │
│         │                             │                  │
│         │                             ▼                  │
│         │                       ┌───────────┐            │
│         └──── subscribe ────────│   Store   │            │
│                                 └───────────┘            │
└──────────────────────────────────────────────────────────┘
```

---

## QATLAM 0 — ENUM FAYLLAR (Jul 17, birinchi yozilgan)

### `src/lib/enums/product.enum.ts`

```ts
export enum ProductSize {
  SMALL = 'SMALL',
  NORMAL = 'NORMAL',
  LARGE = 'LARGE',
  SET = 'SET',
}

export enum ProductVolume {
  HALF = 0.5,
  ONE = 1,
  ONE_POINT_TWO = 1.2,
  ONE_POINT_FIVE = 1.5,
  TWO = 2,
}

export enum ProductStatus {
  PAUSE = 'PAUSE',
  PROCESS = 'PROCESS',
  DELETE = 'DELETE',
}

export enum ProductCollection {
  DISH = 'DISH',
  SALAD = 'SALAD',
  DESSERT = 'DESSERT',
  DRINK = 'DRINK',
  OTHER = 'OTHER',
}
```

### `src/lib/enums/member.enum.ts`

```ts
export enum MemberType {
  USER = 'USER',
  RESTAURANT = 'RESTAURANT',
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  BLOCK = 'BLOCK',
  DELETE = 'DELETE',
}
```

### `src/lib/enums/order.enum.ts`

```ts
export enum OrderStatus {
  PAUSE = 'PAUSE',
  PROCESS = 'PROCESS',
  FINISH = 'FINISH',
  DELETE = 'DELETE',
}
```

### `src/lib/enums/view.enum.ts`

```ts
export enum ViewGroup {
  PRODUCT = 'PRODUCT',
}
```

**MENGA TUSHUNTIR:**
- Enum nima va nega oddiy string ishlatmasdan enum yozamiz?
- `ProductStatus.PROCESS` va `'PROCESS'` string ning farqi nima?
- Backend bilan qanday bog'lanadi bu enumlar?
- Rasmdagi sxemaning qaysi qismida bu enumlar ishlatiladi?

---

## QATLAM 1 — TYPE/INTERFACE FAYLLAR (Jul 17)

### `src/lib/types/product.ts`

```ts
import {
  ProductCollection,
  ProductSize,
  ProductStatus,
} from '../enums/product.enum';

export interface Product {
  _id: string;
  productStatus: ProductStatus;       // enum dan
  productCollection: ProductCollection; // enum dan
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;           // enum dan
  productVolume: number;
  productDesc?: string;               // ? = ixtiyoriy
  productImages: string[];            // rasmlar massivi
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquery {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  search?: string;
}
```

### `src/lib/types/member.ts`

```ts
import { MemberStatus, MemberType } from '../enums/member.enum';

export interface Member {
  _id: string;
  memberType: MemberType;
  memberStatus?: MemberStatus;
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

export interface LoginInput {
  memberNick: string;
  memberPassword: string;
}

export interface MemberUpdateInput {
  memberNick?: string;
  memberPhone?: string;
  memberPassword?: string;
  memberAddress?: string;
  memberDesc?: string;
  memberImage?: string;
}
```

### `src/lib/types/screen.ts` ← ENG MUHIM

```ts
import { Member } from './member';
import { Product } from './product';

/** REACT APP STATE */
export interface AppRootState {
  homePage: HomePageState;
}

/** HOMEPAGE */
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/** PRODUCTS PAGE */
/** ORDERS PAGE */
```

**MENGA TUSHUNTIR:**
- Interface va Enum ning farqi nima, ikkalasi ham "tip" emas mi?
- `Product[]` — bu nima degani ([] belgisi)?
- `?` belgisi qaysi fieldlarda bor va nima uchun?
- `screen.ts` dagi `AppRootState` — bu butun store ning "xaritasi" deyiladi, nima degani?
- `homePage: HomePageState` — store.ts ga qanday bog'lanadi?
- Rasmdagi "Store" qutisining ichida aynan nima bo'ladi? screen.ts bilan qanday bog'liq?

---

## QATLAM 2 — SLICE (Jul 18, 00:43) ← Reducer + Action birlashgan

### `src/app/screens/homePage/slice.ts`

```ts
import { createSlice } from '@reduxjs/toolkit';
import { HomePageState } from '../../../lib/types/screen';

const initialState: HomePageState = {
  popularDishes: [],
  newDishes: [],
  topUsers: [],
};

const homePageSlice = createSlice({
  name: 'homePage',
  initialState,
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload;
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload;
    },
    settopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

export const { setPopularDishes, setNewDishes, settopUsers } =
  homePageSlice.actions;

const HomePageReducor = homePageSlice.reducer;
export default HomePageReducor;
```

**MENGA TUSHUNTIR:**
- `createSlice` nima va nega avval Reducer va Action alohida yozilardi?
- `name: 'homePage'` — bu nom store da kalit sifatida ishlaydi, qanday?
- `initialState` — nima va nima uchun kerak?
- `reducers` ichidagi har bir funksiya — bu ham Action, ham Reducer, qanday qilib?
- `state.popularDishes = action.payload` — bu qatorni batafsil tushuntir:
  - `state` nima?
  - `action` nima?
  - `payload` nima?
- `homePageSlice.actions` va `homePageSlice.reducer` — ikkalasini alohida export qilish nima uchun?
- Rasmdagi "Action" va "Reducers" qutilari — slice.ts da qayerda?

---

## QATLAM 3 — STORE (Jul 18, 00:43 va 00:51)

### `src/app/store.ts` (to'liq, logger bilan)

```ts
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger, { logger } from 'redux-logger';
import HomePageReducor from './screens/homePage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger as any),
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

**MENGA TUSHUNTIR:**
- `configureStore` nima qiladi?
- `reducer: { homePage: HomePageReducor }` — bu qatorda "homePage" kaliti qaerdan keldi va screen.ts dagi `AppRootState.homePage` bilan qanday bog'liq?
- `middleware` — nima va `getDefaultMiddleware().concat(reduxLogger)` qanday ishlaydi?
- `redux-logger` qanday yordam beradi, console da nima ko'rinadi?
- `AppDispatch`, `RootState`, `AppThunk` — bu type exportlar nima uchun kerak?
- `ReturnType<typeof store.getState>` — bu murakkab TypeScript syntax nima ma'no beradi?
- Rasmdagi "Store" qutisi — store.ts da aynan qaysi qator?

---

## QATLAM 4 — SELECTOR (Jul 18, 00:43)

### `src/app/screens/homePage/selector.ts`

```ts
import { createSelector } from '@reduxjs/toolkit';
import { AppRootState } from '../../../lib/types/screen';

const selectHomPage = (state: AppRootState) => state.homePage;

export const retrievePopularDishes = createSelector(
  selectHomPage,
  (homePage) => homePage.popularDishes,
);

export const retrieveNewDishes = createSelector(
  selectHomPage,
  (homePage) => homePage.newDishes,
);

export const retrieveTopUsers = createSelector(
  selectHomPage,
  (homePage) => homePage.topUsers,
);
```

**MENGA TUSHUNTIR:**
- Selector nima va nega kerak — `useSelector(state => state.homePage.popularDishes)` deb to'g'ridan yozsam bo'lmaydimi?
- `createSelector` — oddiy funksiyadan farqi nima? "memoization" degani nima?
- `selectHomPage` — bu birinchi "qadam" selector, nima uchun alohida ajratilgan?
- `createSelector(selectHomPage, (homePage) => homePage.popularDishes)` — 2 ta argument, ikkalasi nima?
- Rasmdagi "subscribe" strelkasi — selector.ts da qayerda?

---

## QATLAM 5 — VIEW / UI (Jul 18, 02:47)

### `src/app/screens/homePage/index.tsx` (to'liq)

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
import { setPopularDishes } from './slice';
import { retrievePopularDishes } from './selector';
import { Product } from '../../../lib/types/product';

/** REDUX SLICE & SELECTOR */

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishRetriever);

  useEffect(() => {
    // Hozircha fake data, keyincha real API dan keladi
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
        ],
        productViews: 0,
        createdAt: '2026-06-22T22:05:50.795Z',
        updatedAt: '2026-06-22T22:05:50.795Z',
        __v: 0,
      },
    ];

    setPopularDishes(result);
    //     ↑ Bu aslida: dispatch(setPopularDishesAction(result))
  }, []);

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

**MENGA TUSHUNTIR:**
- `actionDispatch` funksiyasi nima uchun yozilgan — to'g'ridan `useDispatch()` ishlatmay nega bu oraliq funksiya kerak?
- `const { setPopularDishes } = actionDispatch(useDispatch())` — bu qatorni so'z so'z tushuntir
- `useSelector(popularDishRetriever)` — bu qayerdan ma'lumot oladi?
- `popularDishRetriever` — index.tsx da yana bir `createSelector` bor, selector.ts dagi `retrievePopularDishes` bilan farqi nima?
- `useEffect(() => { setPopularDishes(result) }, [])` — bu chaqirilganda nima bo'ladi, qaysi fayllar ishga tushadi, ketma-ketlikda ayt
- `console.log('popularDishes:', popularDishes)` — bu console da nima chiqaradi va qachon chiqadi?
- Rasmdagi to'liq aylana:
  - `setPopularDishes(result)` — bu "dispatch" strelkasi
  - `setPopularDishes` reducer in slice.ts — bu "Reducers" qutisi
  - `store.homePage.popularDishes` — bu "Store" qutisi
  - `useSelector(popularDishRetriever)` — bu "subscribe" strelkasi
  - `const { popularDishes }` — bu "View/UI" ga qaytish

---

## TO'LIQ OQIM SAVOLI

Quyidagi stsenariyni ketma-ket tushuntir:
Sahifa birinchi ochilganda nima bo'ladi?

```
1. index.tsx render bo'ladi
2. useEffect ishlaydi
3. setPopularDishes(result) chaqiriladi
4. ... (shu yerdan davom ettir, oxirigacha)
... (console.log da nima chiqadi?)
... (popularDishes component da ko'rinadimi?)
```

---

## BONUS SAVOLLAR

1. Hozir `<PopularDishes />` component `popularDishes` ni ishlatmayapti (static data bor). Keyincha Redux store dagi `popularDishes` ni qanday ulash kerak?

2. `@ts-ignore` comment nima uchun yozilgan, bu xavfli emasmi?

3. `import { create } from 'domain'` — index.tsx da bu import bor lekin ishlatilmayapti. Bu xato emasmi?

4. `HomePageReducor` (`Reductor` xato yozilgan) — bu TypeScript da xato hisoblanadimi?

5. Keyingi qadam `newDishes` va `topUsers` uchun ham xuddi shunday oqim qilish kerakmi?

## ═══ CLAUDE GA PROMPT TUGADI ═══

---

> **Ishlatish:** Yuqoridagi hamma narsani (`═══ CLAUDE GA PROMPT BOSHLANADI ═══` dan
> `═══ CLAUDE GA PROMPT TUGADI ═══` gacha) ko'chirib Claude.ai ga paste qiling.
