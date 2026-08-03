# 1 avgust — PPT Slide Prompts
## Orders tizimi: Redux, Service, Context, Business Logic

> Git da 5 ta commit, 05:46 dan 17:25 gacha.
> Asosiy mavzu: Buyurtmalar (Orders) tizimini to'liq qurish.

---

## SLIDE 1 — Title

**Sarlavha:** Orders tizimi — 1 avgust
**Kichik sarlavha:** TypeScript types → Redux slice → API service → Business logic
**Vizual:** 4 ta blok chap-o'ng ketma-ket: `Types` → `Redux` → `Service` → `UI`
**Rang:** Qoʻngʻir/oltin Bumarak uslubida

---

## SLIDE 2 — Kun rejasi: 5 bosqich

**Sarlavha:** 1 avgust — Nima qildik? (5 commit, 5 bosqich)

**Vertikal timeline (soatlar bilan):**

```
05:46  📦 COMMIT 1 — OrderPage Redux konfiguratsiyasi
       order.ts | screen.ts | slice.ts | selector.ts | store.ts

15:40  🛒 COMMIT 2 — createOrder va getMyOrders
       OrderService.ts | Basket.tsx | ordersPage/index.tsx

16:10  ⚙️  COMMIT 3 — ProcessOrders va FinishedOrders
       ProcessOrders.tsx | FinishedOrders.tsx | OrderService.ts

17:16  🔄 COMMIT 4 — orderBuilder (order rebuild mexanizmi)
       useGlobals.ts | ContextProvider.tsx | PausedOrders.tsx

17:25  🐛 COMMIT 5 — Buglarni tuzatish
       selector.ts | OrderService.ts | Basket.tsx | screen.ts
```

---

## SLIDE 3 — TypeScript Interfaces (order.ts)

**Sarlavha:** `src/lib/types/order.ts` — Buyurtma tuzilishi

**Chapda kod (syntax highlight):**
```ts
// src/lib/types/order.ts

export interface OrderItem {
  _id: string;
  itemQuantity: number;   // nechta mahsulot
  itemPrice: number;      // narxi
  productId: string;      // qaysi mahsulot
  orderId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  _id: string;
  orderTotal: number;     // umumiy summa
  orderDelivery: number;  // yetkazib berish narxi
  orderStatus: OrderStatus; // PAUSE | PROCESS | FINISH | DELETE
  memberId: string;       // kim buyurtma berdi
  orderItems: OrderItem[]; // buyurtmadagi mahsulotlar
  productData: Product[];  // aggregatsiyadan kelgan mahsulot ma'lumotlari
}

export interface OrderInquiry {
  page: number;
  limit: number;
  orderStatus: OrderStatus; // qaysi status bo'yicha filter
}

export interface OrderUpdateInput {
  orderId: string;
  orderStatus: OrderStatus; // yangi status
}
```

**O'ngda schema diagrammasi:**
```
Order
├── _id (string)
├── orderTotal ($)
├── orderDelivery ($)
├── orderStatus ─── OrderStatus enum
│                   ├── PAUSE
│                   ├── PROCESS
│                   ├── FINISH
│                   └── DELETE
├── memberId
├── orderItems[]
│   ├── itemQuantity
│   ├── itemPrice
│   └── productId ──→ Product._id
└── productData[]  ← Backend aggregation
    └── Product objects
```

---

## SLIDE 4 — Redux uchun State type (screen.ts)

**Sarlavha:** `AppRootState` — Butun Redux store ning xaritasi

**Kod:**
```ts
// src/lib/types/screen.ts

export interface AppRootState {
  homePage: HomePageState;      // ← avval bor edi
  productsPage: ProductsPageState; // ← avval bor edi
  ordersPage: OrderPageState;   // ← 1 avgust qo'shildi ✨
}

// yangi interface:
export interface OrderPageState {
  pauseOrders: Order[];      // to'xtatilgan buyurtmalar
  processOrders: Order[];    // jarayondagi buyurtmalar
  finishedOrders: Order[];   // yakunlangan buyurtmalar
}
```

**O'ngda vizual tuzilish:**
```
Redux Store
├── homePage
│   ├── popularDishes[]
│   ├── newDishes[]
│   └── topUsers[]
├── productsPage
│   ├── restaurant
│   ├── choosenProduct
│   └── products[]
└── ordersPage  ← YANGI ✨
    ├── pauseOrders[]
    ├── processOrders[]
    └── finishedOrders[]
```

**Muhim eslatma:**
`AppRootState` — TypeScript ning "xaritasi". Selector lar `state.ordersPage` deb yozganda,
TypeScript bu xaritadan foydalanib, to'g'ri type ni tekshiradi.

---

## SLIDE 5 — Redux Slice (ordersPage/slice.ts)

**Sarlavha:** `slice.ts` — Orders uchun Redux "bo'limi"

**Chap — to'liq kod:**
```ts
// src/app/screens/ordersPage/slice.ts

import { createSlice } from '@reduxjs/toolkit';
import { OrderPageState } from '../../../lib/types/screen';

const initialState: OrderPageState = {
  pauseOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const orderPageSlice = createSlice({
  name: 'ordersPage',         // ← store dagi kalit
  initialState,
  reducers: {
    setPauseOrders: (state, action) => {
      state.pauseOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const {
  setPauseOrders,
  setProcessOrders,
  setFinishedOrders
} = orderPageSlice.actions;

export default orderPageSlice.reducer;
```

**O'ngda annotatsiyalar:**
- `name: 'ordersPage'` → store da qanday key bilan saqlanadi
- `initialState` → boshlang'ich qiymat: barcha arraylar bo'sh `[]`
- `reducers` → 3 ta action: har biri o'zining array ini almashtiradi
- `action.payload` → dispatch ga uzatilgan ma'lumot

---

## SLIDE 6 — Selector (ordersPage/selector.ts)

**Sarlavha:** `selector.ts` — Redux store dan ma'lumot "tanlab olish"

**Kod:**
```ts
// src/app/screens/ordersPage/selector.ts

import { createSelector } from '@reduxjs/toolkit';
import { AppRootState } from '../../../lib/types/screen';

// 1. Asosiy selector — ordersPage ni butunligicha oladi
const selectOrdersPage = (state: AppRootState) => state.ordersPage;

// 2. Derived selectors — har bir buyurtma turiga alohida
export const retrievePauseOrders = createSelector(
  selectOrdersPage,
  (ordersPage) => ordersPage.pauseOrders,   // faqat pause buyurtmalar
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (ordersPage) => ordersPage.processOrders, // faqat process buyurtmalar
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (ordersPage) => ordersPage.finishedOrders, // faqat finish buyurtmalar
);
```

**O'ngda data oqimi:**
```
Redux Store
  └── state.ordersPage
           ↓ selectOrdersPage()
    { pauseOrders, processOrders, finishedOrders }
           ↓ retrievePauseOrders()
    [ order1, order2, ... ]
           ↓ useSelector(pauseOrdersRetriever)
    PausedOrders component da ko'rsatiladi
```

**Bug izoh quti (qizil):**
❌ Dastlab: `state.orderPage` (s yo'q) — undefined qaytardi!
✅ Fix: `state.ordersPage` (s bilan) — store kalit bilan mos keldi

---

## SLIDE 7 — Store ga qo'shish (store.ts)

**Sarlavha:** `store.ts` — OrdersPageReducer ni ro'yxatga olish

**Kod (diff ko'rinishida):**
```ts
// src/app/store.ts

import HomePageReducor from './screens/homePage/slice';
import ProductPageReducer from './screens/productsPage/slice';
+ import OrdersPageReducor from './screens/ordersPage/slice'; // YANGI

export const store = configureStore({
  reducer: {
    homePage: HomePageReducor,
    productsPage: ProductPageReducer,
+   ordersPage: OrdersPageReducor,  // YANGI ← bu kalit selector da ishlatiladi
  },
});
```

**Pastda izoh:**
```
store.ts          slice.ts          selector.ts
   |                  |                  |
ordersPage  ←  name: 'ordersPage'  →  state.ordersPage
   ↑                                       ↓
   └────── Bu ikki joy bir xil bo'lishi SHART ───┘
           Aks holda: undefined xatosi!
```

---

## SLIDE 8 — OrderService: createOrder (Basket → Backend)

**Sarlavha:** `OrderService.createOrder()` — Savatdan buyurtma yaratish

**Chap — kod:**
```ts
// src/app/services/OrderService.ts

public async createOrder(input: CartItem[]): Promise<Order> {
  try {
    // CartItem[] ni OrderItemInput[] ga aylantirish
    const orderItem: OrderItemInput[] = input.map((cartItem) => {
      return {
        itemQuantity: cartItem.quantity,
        itemPrice: cartItem.price,
        productId: cartItem._id,
      };
    });

    const url = this.path + '/order/create';
    const result = await axios.post(url, orderItem, {
      withCredentials: true,   // cookie yuborish
    });

    return result.data as Order;
  } catch (err) {
    throw err;
  }
}
```

**O'ng — to'liq oqim:**
```
Basket.tsx
  cartItems: CartItem[]
  [{ _id, name, price, quantity, image }, ...]
           ↓ proceedOrderHandler()
  createOrder(cartItems)
           ↓ .map() — format o'zgartiriladi
  OrderItemInput[]
  [{ productId, itemPrice, itemQuantity }, ...]
           ↓ axios.POST /order/create
           ↓ withCredentials: true (cookie)
  Backend
           ↓ 201 Created
  Order object qaytadi
           ↓
  onDeleteAll() — savatni tozalaydi
  history.push('/orders') — orders sahifaga o'tadi
```

---

## SLIDE 9 — Basket.tsx — proceedOrderHandler

**Sarlavha:** `Basket.tsx` — "Order" tugmasi bosilganda nima bo'ladi?

**Kod:**
```tsx
// src/app/components/headers/Basket.tsx

const { authMember } = useGlobals();  // login bo'lganmi?

const proceedOrderHandler = async () => {
  try {
    handleClose();  // basket menyuni yopadi

    // 1. Login tekshiruvi
    if (!authMember) throw new Error(Messages.error2);

    // 2. Buyurtma yaratish
    const order = new OrderService();
    await order.createOrder(cartItems);

    // 3. Savatni tozalash
    onDeleteAll();

    // 4. Orders sahifaga yo'naltirish
    history.push('/orders');

  } catch (err) {
    sweetErrorHandling(err).then();  // xato alerti
  }
};

// JSX da tugmaga ulash:
<Button onClick={proceedOrderHandler}>
  Order
</Button>
```

**O'ngda holatlar:**
```
authMember === null
   ↓
Messages.error2: "Please login first"
sweetAlert ko'rsatiladi 🔴

authMember !== null
   ↓
createOrder() → Backend
savatni tozalash
/orders sahifaga o'tish 🟢
```

---

## SLIDE 10 — OrderService: getMyOrders

**Sarlavha:** `getMyOrders()` — Foydalanuvchi buyurtmalarini olish

**Chap — kod (xato va fix bilan):**
```ts
// XATOLI VERSIYA (dastlabki):
const url = `${this.path}/ order / all`;
//                        ↑ bo'sh joylar!
const query = `?page =${input.page}&orderStatus=${OrderStatus}`;
//                   ↑ bo'sh joy    ↑ enum objectni o'zi!

// TO'G'RI VERSIYA (fix dan keyin):
const url = `${this.path}/order/all`;
const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;
//                                                                    ↑ input dan keladi

const result = await axios.get(url + query, { withCredentials: true });

// Javob array emasligiga qarshi himoya:
const data = result.data;
return Array.isArray(data) ? data : (data?.list ?? data?.data ?? []);
```

**O'ngda 3 so'rov parallel (index.tsx useEffect):**
```ts
useEffect(() => {
  const order = new OrderService();

  // 3 ta parallel so'rov — har bir status uchun alohida
  order.getMyOrders({ ...orderInquiry, orderStatus: PAUSE })
    .then((data) => setPauseOrders(data));

  order.getMyOrders({ ...orderInquiry, orderStatus: PROCESS })
    .then((data) => setProcessOrders(data));

  order.getMyOrders({ ...orderInquiry, orderStatus: FINISH })
    .then((data) => setFinishedOrders(data));

}, [orderInquiry, orderBuilder]);  // ← orderBuilder o'zgarganda qayta ishlaydi
```

---

## SLIDE 11 — orderBuilder: Buyurtmalar Qayta Yuklash Mexanizmi

**Sarlavha:** `orderBuilder` — "Refresh trigger" pattern

**Muammo:**
```
Foydalanuvchi "Cancel" yoki "Payment" bosadi
         ↓
Backend da order statusi o'zgaradi
         ↓
Lekin UI avtomatik yangilanmaydi!
Chunki useEffect dependency o'zgarmadi.
```

**Yechim — orderBuilder:**
```ts
// useGlobals.ts — GlobalInterface ga qo'shildi:
interface GlobalInterface {
  authMember: Member | null;
  setAuthMember: (member: Member | null) => void;
  orderBuilder: Date;             // ← YANGI
  setOrderBuilder: (date: Date) => void; // ← YANGI
}

// ContextProvider.tsx da useState:
const [orderBuilder, setOrderBuilder] = useState<Date>(new Date());
// boshlang'ich qiymat: hozirgi vaqt
```

**Qanday ishlaydi:**
```
PausedOrders.tsx          useGlobals()       ordersPage/index.tsx
     |                         |                      |
"Cancel" bosildi               |              useEffect([..., orderBuilder])
     |                         |                      |
deleteOrderHandler()           |                      |
     |                         |                      |
await order.updateOrder()      |                      |
     |                         |                      |
setOrderBuilder(new Date()) ───→ orderBuilder o'zgaradi
                                         ↓
                                useEffect qayta ishlaydi!
                                         ↓
                                getMyOrders() qayta chaqiriladi
                                         ↓
                                Redux store yangilanadi
                                         ↓
                                UI yangilangan ro'yxat ko'rsatadi ✓
```

---

## SLIDE 12 — PausedOrders: Delete va Payment handlerlari

**Sarlavha:** `PausedOrders.tsx` — Buyurtmani bekor qilish yoki to'lash

**Ikki handler yonma-yon:**

**deleteOrderHandler:**
```ts
const deleteOrderHandler = async (e: T) => {
  try {
    if (!authMember) throw new Error(Messages.error2);

    const orderId = e.target.value;  // button.value = order._id
    const input: OrderUpdateInput = {
      orderId: orderId,
      orderStatus: OrderStatus.DELETE,  // ← statusi DELETE ga o'zgaradi
    };

    const order = new OrderService();
    await order.updateOrder(input);

    setOrderBuilder(new Date());  // ← UI ni qayta yuklash signali
    window.confirm('Do you want to delete?');
  } catch (err) {
    sweetErrorHandling(err).then();
  }
};
```

**processOrderHandler (Payment):**
```ts
const processOrderHandler = async (e: T) => {
  try {
    if (!authMember) throw new Error(Messages.error2);

    const orderId = e.target.value;
    const input: OrderUpdateInput = {
      orderId: orderId,
      orderStatus: OrderStatus.PROCESS,  // ← PAUSE → PROCESS
    };

    await new OrderService().updateOrder(input);

    setValues('2');            // ← Tab ni "Process Orders" ga o'tkazadi
    setOrderBuilder(new Date()); // ← UI refresh
  } catch (err) {
    sweetErrorHandling(err).then();
  }
};
```

---

## SLIDE 13 — ProcessOrders: finishOrderHandler

**Sarlavha:** `ProcessOrders.tsx` — Buyurtmani yakunlash

**Kod:**
```ts
// src/app/screens/ordersPage/ProcessOrders.tsx

const finishOrderHandler = async (e: T) => {
  try {
    if (!authMember) throw new Error(Messages.error2);

    const orderId = e.target.value;
    const input: OrderUpdateInput = {
      orderId: orderId,
      orderStatus: OrderStatus.FINISH,  // ← PROCESS → FINISH
    };

    await new OrderService().updateOrder(input);

    setValues('3');              // ← "Finished Orders" tabiga o'tadi
    setOrderBuilder(new Date()); // ← UI refresh
    window.confirm('Have you received this order?');
  } catch (err) {
    sweetErrorHandling(err).then();
  }
};
```

**JSX da tugmaga ulash:**
```tsx
<Button
  value={order._id}          // ← e.target.value bu orqali orderId olinadi
  variant="contained"
  onClick={finishOrderHandler}
>
  Verify to Fulfil
</Button>
```

---

## SLIDE 14 — OrderStatus: Buyurtma hayot sikli

**Sarlavha:** `OrderStatus` — Buyurtma qanday o'zgaradi?

**Markazda katta oqim diagrammasi:**
```
🛒 Savat → [Order tugmasi]
           ↓
        OrderService.createOrder()
           ↓ POST /order/create
           ↓
    ┌─── PAUSE ────────────────────────────────┐
    │   ordersPage (Paused Orders tab)          │
    │                                           │
    │  [Cancel]              [Payment]          │
    │     ↓                     ↓              │
    │  DELETE              PROCESS              │
    │  (o'chiriladi)    ────────┼───────────── │
    └───────────────────────────┼──────────────┘
                                ↓
                    ┌─── PROCESS ──────────────┐
                    │  ordersPage (Process tab) │
                    │                           │
                    │  [Verify to Fulfil]       │
                    │         ↓                │
                    │       FINISH             │
                    │  ─────────────────────── │
                    └───────────────────────────┘
                                ↓
                    ┌─── FINISH ───────────────┐
                    │  ordersPage (Finished)   │
                    │  Yakunlangan buyurtmalar │
                    └───────────────────────────┘
```

**Har bir o'tishda:**
1. `updateOrder({ orderId, orderStatus })` → Backend ga so'rov
2. `setOrderBuilder(new Date())` → UI refresh trigger
3. `setValues('N')` → Tegishli tabga o'tish

---

## SLIDE 15 — updateOrder (OrderService)

**Sarlavha:** `OrderService.updateOrder()` — Buyurtma statusini yangilash

**Kod:**
```ts
// src/app/services/OrderService.ts

public async updateOrder(input: OrderUpdateInput): Promise<Order> {
  try {
    const url = `${this.path}/order/update`;
    const result = await axios.post(url, input, {
      withCredentials: true,
    });
    return result.data as Order;
  } catch (err) {
    throw err;
  }
}
```

**Input interface:**
```ts
interface OrderUpdateInput {
  orderId: string;       // qaysi order
  orderStatus: OrderStatus; // yangi status
}
```

**3 joydan chaqiriladi:**
| Komponent | Status | Sabab |
|---|---|---|
| `PausedOrders` | `DELETE` | "Cancel" bosilganda |
| `PausedOrders` | `PROCESS` | "Payment" bosilganda |
| `ProcessOrders` | `FINISH` | "Verify" bosilganda |

---

## SLIDE 16 — Bug ov: 5 ta xato

**Sarlavha:** Commit 5 (17:25) — Topilgan va tuzatilgan buglar

**5 ta bug karti:**

**Bug 1 — URL bo'sh joy**
```ts
// ❌ XATO:
`${this.path}/ order / all`
// → http://localhost:3003/ order / all  (404!)

// ✅ FIX:
`${this.path}/order/all`
```

**Bug 2 — Query bo'sh joy + noto'g'ri o'zgaruvchi**
```ts
// ❌ XATO:
`?page =${input.page}&orderStatus=${OrderStatus}`
//     ↑ bo'sh joy    ↑ enum objectning o'zi!

// ✅ FIX:
`?page=${input.page}&orderStatus=${input.orderStatus}`
```

**Bug 3 — Selector kalit noto'g'ri**
```ts
// ❌ XATO:
(state: AppRootState) => state.orderPage   // 's' yo'q!

// ✅ FIX:
(state: AppRootState) => state.ordersPage  // store kalit bilan mos
```

**Bug 4 — AppRootState type noto'g'ri**
```ts
// ❌ XATO:
export interface AppRootState {
  orderPage: OrderPageState;  // 's' yo'q!
}
// ✅ FIX:
  ordersPage: OrderPageState; // store bilan mos
```

**Bug 5 — .then qavssiz**
```ts
// ❌ XATO:
sweetErrorHandling(err).then;   // bu faqat property ni o'qiydi!

// ✅ FIX:
sweetErrorHandling(err).then(); // bu chaqiradi!
```

---

## SLIDE 17 — To'liq Data Flow Diagrammasi

**Sarlavha:** 1 avgust — Barcha qismlar qanday bog'langan?

**Katta diagram:**
```
FOYDALANUVCHI
     |
[Mahsulot → Savat → Order tugmasi]
     |
     ↓
Basket.tsx: proceedOrderHandler()
     |
     ↓
OrderService.createOrder(cartItems)
     | POST /order/create (withCredentials)
     ↓
BACKEND — Order yaratadi, status = PAUSE
     |
     ↓
history.push('/orders')
     |
     ↓
ordersPage/index.tsx
├── useEffect([orderInquiry, orderBuilder])
│   ├── getMyOrders(PAUSE) → setPauseOrders(data) → Redux store
│   ├── getMyOrders(PROCESS) → setProcessOrders(data) → Redux store
│   └── getMyOrders(FINISH) → setFinishedOrders(data) → Redux store
│
└── TABS
    ├── Tab 1: PausedOrders
    │   ├── useSelector(retrievePauseOrders) ← Redux store
    │   ├── [Cancel] → deleteOrderHandler → updateOrder(DELETE)
    │   │              → setOrderBuilder(new Date())
    │   │              → useEffect qayta ishlaydi → UI yangilanadi
    │   └── [Payment] → processOrderHandler → updateOrder(PROCESS)
    │                   → setValues('2') → Process tabiga o'tish
    │
    ├── Tab 2: ProcessOrders
    │   ├── useSelector(retrieveProcessOrders) ← Redux store
    │   └── [Verify] → finishOrderHandler → updateOrder(FINISH)
    │                  → setValues('3') → Finished tabiga o'tish
    │
    └── Tab 3: FinishedOrders
        └── useSelector(retrieveFinishedOrders) ← Redux store
```

---

## SLIDE 18 — Yangi fayllar va o'zgarishlar jadvali

**Sarlavha:** 1 avgust — Qaysi fayl, qachon, nima uchun?

| Vaqt | Fayl | Status | Amal |
|---|---|---|---|
| 05:46 | `src/lib/types/order.ts` | 🆕 YANGI | Order, OrderItem, OrderInquiry, OrderUpdateInput interfacelari |
| 05:46 | `src/lib/types/screen.ts` | ✏️ | `OrderPageState` qo'shildi, `AppRootState` yangilandi |
| 05:46 | `ordersPage/slice.ts` | 🆕 YANGI | Redux slice — 3 ta action |
| 05:46 | `ordersPage/selector.ts` | 🆕 YANGI | 3 ta selector |
| 05:46 | `src/app/store.ts` | ✏️ | `ordersPage: OrdersPageReducor` qo'shildi |
| 15:40 | `OrderService.ts` | ✏️ | `createOrder()`, `getMyOrders()` qo'shildi |
| 15:40 | `Basket.tsx` | ✏️ | `proceedOrderHandler` — savat → order |
| 15:40 | `ordersPage/index.tsx` | ✏️ | `useEffect` — 3 ta parallel fetch |
| 16:10 | `ProcessOrders.tsx` | ✏️ | `finishOrderHandler` qo'shildi |
| 16:10 | `FinishedOrders.tsx` | ✏️ | Ko'rsatish logikasi |
| 17:16 | `useGlobals.ts` | ✏️ | `orderBuilder`, `setOrderBuilder` GlobalInterface ga |
| 17:16 | `ContextProvider.tsx` | ✏️ | `useState<Date>` orderBuilder uchun |
| 17:16 | `PausedOrders.tsx` | ✏️ | `deleteOrderHandler`, `processOrderHandler` |
| 17:25 | `OrderService.ts` | 🐛 FIX | URL bo'sh joy, query bug |
| 17:25 | `selector.ts` | 🐛 FIX | `orderPage` → `ordersPage` |
| 17:25 | `screen.ts` | 🐛 FIX | `orderPage` → `ordersPage` |
| 17:25 | `Basket.tsx` | 🐛 FIX | `.then` → `.then()` |

---

## SLIDE 19 — Yakuniy xulosa

**Sarlavha:** 1 avgust — Nima o'rgandik?

**6 ta kalit tushuncha:**

**📦 TypeScript Interfaces**
order.ts — backend bilan kelishuv:
har ikki tomon bir xil "til" da gapiradi

**🗃️ Redux Slice**
initialState + reducers = buyurtmalar
saqlash va yangilash mexanizmi

**🔍 Selectors**
`createSelector` — storedan kerakli
qismni "tanib olish" uchun

**🌐 OrderService**
`createOrder` + `getMyOrders` + `updateOrder`
= backend bilan 3 xil muloqot

**🔄 orderBuilder pattern**
`useState<Date>` → `useEffect([..., orderBuilder])`
= order o'zgarganda UI avtomatik yangilanadi

**🐛 Debugging**
URL bo'sh joy, enum vs instance, type mismatch —
kichik xato katta muammo. Har doim console + Network tab!

---

*Fayl: 01-august-ppt-prompts.md*
*Loyiha: Bumarak Restaurant*
*Sana: 1 avgust 2026*
