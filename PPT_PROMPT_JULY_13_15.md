# PPT Prompt — July 13–15 | React Hooks, Class vs Functional, MVC vs Redux

> Bu fayl 13–15 iyul commitlarida o'tilgan mavzular asosida
> tayyorlangan. Har bir mavzu uchun **slide prompt** + **chart/diagram**
> + **kod misoli** berilgan. AI image generatorlarga (ChatGPT, Gamma, Canva AI)
> yoki Marp/Reveal.js ga to'g'ridan-to'g'ri paste qilish mumkin.

---

## COMMIT XRONOLOGIYASI

| Sana | Commit | Fayl(lar) | Mavzu |
|------|--------|-----------|-------|
| Jul 13 | `feat: create Test1 class component` | Test1.tsx, README.md | Class component, lifecycle |
| Jul 13 | `feat: practise useEffect & useState hooks` | HomeNavbar.tsx | useState, useEffect hooks |
| Jul 14 | `fix: modify homepage screen component` | App.tsx | Router switch — Test1 → HomePage |
| Jul 15 | `feat: redux tushuncha md da` | README.md | MVC vs Flux vs Redux arxitekturasi |

---

## SLIDE 1 — Muqova

```
PPT PROMPT:
Title slide. Dark background (#1a1a2e). Large white text center:
"React Architecture Deep Dive"
Subtitle: "Class Components · Hooks · MVC vs Redux"
Bottom right: dates "July 13–15, 2026"
Bottom left: project logo text "BURAK"
Style: modern, minimal, tech-themed.
```

---

## SLIDE 2 — Component turlari (README Publishing Rules)

```
PPT PROMPT:
Create a slide titled "React Component Types — Publishing Rules".
Show a 3-column card layout:

Card 1 — "Screen Components" (blue border)
  Examples: HomePage, ProductsPage
  Description: Sahifaning asosiy ekrani. Router orqali ko'rinadi.

Card 2 — "Sectional Components" (green border)
  Examples: Statistics, PopularDishes, NewDishes
  Description: Ekranning bir bo'limi. Screen ichida joylashadi.

Card 3 — "Common / Reusable Components" (orange border)
  Examples: Header, Footer, Divider, Basket
  Description: Barcha sahifalarda qayta ishlatiladi.

Below the cards, add a "Layout Trio" section:
[ Container 1300px ] → [ Stack (flex) ] → [ Box (div) ]
Arrow flow left to right. Gray background strip.
```

**Diagram:**
```
┌─────────────────────────────────────────────────┐
│               BURAK App Sahifasi                │
│  ┌───────────────────────────────────────────┐  │
│  │         Screen Component (App.tsx)        │  │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐  │  │
│  │  │Sectional │  │Sectional │  │Common  │  │  │
│  │  │PopularD  │  │NewDishes │  │Footer  │  │  │
│  │  └──────────┘  └──────────┘  └────────┘  │  │
│  └───────────────────────────────────────────┘  │
│                                                 │
│  Layout:  Container(1300px) > Stack > Box       │
└─────────────────────────────────────────────────┘
```

---

## SLIDE 3 — Class Component nima?

```
PPT PROMPT:
Slide title: "Class Component — Test1.tsx (Jul 13)"
Left side: show the code block below with syntax highlighting.
Right side: a vertical lifecycle diagram with 3 phases:

Phase 1 → MOUNT (componentDidMount) — green circle
Phase 2 → UPDATE (setState triggers re-render) — blue circle  
Phase 3 → UNMOUNT (componentWillUnmount) — red circle

Add a callout: "Class components use 'this.state' and lifecycle methods"
Background: white or light gray.
```

**Kod misoli (Test1.tsx):**
```tsx
class Test1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: 'Ford',
      color: 'red',
      year: 1964,
    };
  }

  // PHASE 1 — MOUNT: birinchi render dan keyin ishlaydi
  componentDidMount() {
    console.log('componentDidMount');
    // Backend dan data olish shu yerda bo'ladi
  }

  // PHASE 3 — UNMOUNT: sahifadan ketganda ishlaydi
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // State ni o'zgartirish
  changeDetail = () => {
    this.setState({ color: 'blue', brand: 'Tesla' });
  };

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <button onClick={this.changeDetail}>Change Detail</button>
      </div>
    );
  }
}
```

**Lifecycle diagram:**
```
  Component hayot sikli (Class)
  ┌─────────────────────────────┐
  │  1. constructor()           │  ← state boshlang'ich qiymati
  │         ↓                  │
  │  2. render()                │  ← DOM ga chizish
  │         ↓                  │
  │  3. componentDidMount()     │  ← API call, subscription
  │         ↓                  │
  │  4. setState() → render()   │  ← UPDATE phase (loop)
  │         ↓                  │
  │  5. componentWillUnmount()  │  ← cleanup, unsubscribe
  └─────────────────────────────┘
```

---

## SLIDE 4 — Functional Component vs Class Component

```
PPT PROMPT:
Side-by-side comparison slide. Title: "Class vs Functional Component"
Left panel (gray background) — "Class Component":
  - this.state, setState()
  - lifecycle methods (componentDidMount etc.)
  - More boilerplate code
  - Older pattern (pre-2019)

Right panel (blue background) — "Functional Component":
  - useState() hook
  - useEffect() hook
  - Cleaner, shorter code
  - Modern React standard

Center divider with VS symbol.
Bottom note: "React 16.8+ dan Hooks paydo bo'lgandan keyin Functional afzal"
```

**Taqqoslash jadvali:**
```
┌────────────────────────┬─────────────────────────────┐
│   CLASS COMPONENT      │   FUNCTIONAL COMPONENT      │
├────────────────────────┼─────────────────────────────┤
│ this.state             │ const [x, setX] = useState()│
│ this.setState()        │ setX(newValue)               │
│ componentDidMount()    │ useEffect(() => {}, [])      │
│ componentWillUnmount() │ useEffect(() => ()=>{}, [])  │
│ componentDidUpdate()   │ useEffect(() => {}, [dep])   │
│ this.props             │ props (argument sifatida)    │
│ extends React.Component│ function Component() {}      │
└────────────────────────┴─────────────────────────────┘
```

---

## SLIDE 5 — useState Hook

```
PPT PROMPT:
Slide title: "useState Hook — Holat boshqaruvi"
Show a simple animation flow diagram:

[Button click] → [setCount(count+1)] → [React re-renders] → [New value shown]

Code block on the right:
  const [count, setCount] = useState<number>(0);
  const [value, setValue] = useState<boolean>(true);

Add a note box: "useState — Class dagi this.state ning functional ekvivalenti"
Include: initial value types — number, boolean, string, object, array
```

**HomeNavbar.tsx dan real misol:**
```tsx
// useState — ikki xil state
const [count, setCount] = useState<number>(0);   // sonlar
const [value, setvalue] = useState<boolean>(true); // true/false

// Handler — buttonni bosganda value teskari bo'ladi
const buttonHandler = () => {
  setvalue(!value);  // true → false → true ...
};

// JSX da ishlatish
<Box className={'service-txt'}> {count} hours service</Box>
<Button onClick={() => buttonHandler()}>SIGN UP</Button>
```

**useState qanday ishlaydi:**
```
useState(initialValue)
      │
      ▼
  [state, setState]
      │              │
  hozirgi qiymat   yangi qiymat o'rnatuvchi
  (o'qish uchun)   (yozish uchun)

setState() chaqirilsa → React component ni qayta render qiladi
```

---

## SLIDE 6 — useEffect Hook (3 Lifecycle ni o'rnini bosadi)

```
PPT PROMPT:
Slide title: "useEffect Hook — 3 ta lifecycle method o'rnida"
Create 3 side-by-side boxes, each showing:

Box 1 (green) — "componentDidMount"
  Class:    componentDidMount() { ... }
  Hooks:    useEffect(() => { ... }, [])
  Trigger:  Birinchi renderdan keyin 1 marta

Box 2 (blue) — "componentDidUpdate"  
  Class:    componentDidUpdate() { ... }
  Hooks:    useEffect(() => { ... }, [value])
  Trigger:  value o'zgarganda har safar

Box 3 (red) — "componentWillUnmount"
  Class:    componentWillUnmount() { ... }
  Hooks:    useEffect(() => { return () => { cleanup } }, [])
  Trigger:  Component o'chirilishidan oldin

Bottom: dependency array [] visualisation
```

**Kod (HomeNavbar.tsx dan):**
```tsx
useEffect(() => {
  // MOUNT: birinchi render da ishlaydi
  console.log('componentDidiMount');
  setCount(count + 1);

  // UNMOUNT: component o'chganda ishlaydi (cleanup)
  return () => {
    console.log('componentWillUnmount');
  };

}, [value]); // dependency: value o'zgarganda UPDATE ishlaydi
//  ^^^^^^^ — componentDidUpdate o'rnida
```

**Dependency array mantiq:**
```
useEffect(fn, [])        → faqat Mount (1 marta)
useEffect(fn, [value])   → Mount + value har o'zgarganda
useEffect(fn)            → har render da (dependency yo'q)
useEffect(() => ()=>{})  → cleanup bilan (Unmount)
```

---

## SLIDE 7 — MVC Arxitekturasi

```
PPT PROMPT:
Slide title: "MVC Architecture — Model View Controller"
Create a triangle or 3-box diagram:

[Model] ←──────────────→ [Controller]
   │                           │
   │                           │
   ▼                           ▼
[View]  ←──────────────→ [Controller]

Highlight: "BIDIRECTIONAL flow" with double-headed arrows (red color)
Add labels:
  Model = Ma'lumotlar (database, state)
  View = Foydalanuvchi ko'radi (UI)
  Controller = Logika boshqaruvi

Note box: "MVC da View ham Controller ga, Controller ham View ga ta'sir qilishi mumkin — bu murakkablashtirganda xatolarga olib keladi"
```

**MVC tushuntirish:**
```
MVC (Model-View-Controller)

MODEL          — Ma'lumot saqlanadi (DB, state)
VIEW           — Foydalanuvchi ko'radigan UI
CONTROLLER     — Biznes logikasi, so'rovlar

Oqim (BIDIRECTIONAL — ikki tomonlama):
  User → View → Controller → Model
                    ↑              ↓
                    └──────────────┘
  Model ham to'g'ridan View ga ta'sir qilishi mumkin!

Muammo: Ko'p komponent bo'lsa oqimni kuzatish qiyinlashadi
```

---

## SLIDE 8 — Flux Arxitekturasi (Redux precursor)

```
PPT PROMPT:
Slide title: "Flux Architecture — Facebook 2014"
Show a circular one-way flow diagram:

Action → Dispatcher → Store → View → Action (loop)

All arrows go CLOCKWISE only (emphasize unidirectional).
Color: blue arrows on dark background.
Add note: "Flux — Redux ning asosi. Facebook React bilan birga chiqargan."
Highlight "UNIDIRECTIONAL" in large yellow text.
```

**Flux oqimi:**
```
╔═══════╗    ╔════════════╗    ╔═══════╗    ╔══════╗
║ACTION ║───→║ DISPATCHER ║───→║ STORE ║───→║ VIEW ║
╚═══════╝    ╚════════════╝    ╚═══════╝    ╚══════╝
    ▲                                           │
    └───────────────────────────────────────────┘
              User action → yangi Action

Faqat BIR tomonga! (Unidirectional)
```

---

## SLIDE 9 — Redux Arxitekturasi (4 qism)

```
PPT PROMPT:
Slide title: "Redux Architecture — 4 ta asosiy qism"
Create a large flow diagram with 4 colored boxes:

[VIEW/Component] 
      │ dispatch(action)
      ▼
[ACTION] { type: 'INCREMENT', payload: 1 }
      │
      ▼
[REDUCER] — pure function, old state + action = new state
      │
      ▼
[STORE] — single source of truth
      │ selector / subscribe
      ▼
[VIEW/Component] — yangilangan state bilan re-render

Add icons for each box. Use circular flow arrows.
Color code: View=blue, Action=orange, Reducer=purple, Store=green
```

**Redux 4 qismi:**
```
┌─────────────────────────────────────────────────────┐
│                    REDUX FLOW                       │
│                                                     │
│   ┌─────────┐                                       │
│   │  VIEW   │ ← useSelector(state => state.data)    │
│   │Component│                                       │
│   └────┬────┘                                       │
│        │ dispatch(actionCreator())                  │
│        ▼                                            │
│   ┌─────────┐                                       │
│   │ ACTION  │ { type: 'FETCH_PRODUCTS', payload }   │
│   └────┬────┘                                       │
│        │                                            │
│        ▼                                            │
│   ┌─────────┐                                       │
│   │ REDUCER │ (state, action) => newState            │
│   └────┬────┘                                       │
│        │                                            │
│        ▼                                            │
│   ┌─────────┐                                       │
│   │  STORE  │ ← configureStore({ reducer: {} })     │
│   └────┬────┘                                       │
│        │                                            │
│        └──────────────────────────────► VIEW        │
└─────────────────────────────────────────────────────┘
```

**Loyihamizda store.ts:**
```ts
// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import reduxLogger from "redux-logger";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger), // har dispatch logga yozadi
  reducer: {},  // hozircha bo'sh, API ulanganda to'ladi
});

// TypeScript types
export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

---

## SLIDE 10 — MVC vs Redux Taqqoslash

```
PPT PROMPT:
Slide title: "MVC vs Redux — Asosiy farqlar"
Create a comparison table (2 columns, 6 rows):

Header row: | MVC | REDUX |

Row 1 — Data Flow:
  MVC: Bidirectional (ikki tomonlama) ↔
  Redux: Unidirectional (bir tomonlama) →

Row 2 — Store:
  MVC: Har Controller da alohida store yo'q
  Redux: Single Store (bitta markaziy)

Row 3 — State boshqaruvi:
  MVC: Controller + Model alohida
  Redux: Reducer + Store birgalikda

Row 4 — Controller:
  MVC: Controller (logika)
  Redux: Reducer (controller o'rnida)

Row 5 — Debugging:
  MVC: Qiyin (ko'p oqim)
  Redux: Oson (Redux DevTools, Logger)

Row 6 — React bilan:
  MVC: Mos emas (React unidirectional)
  Redux: Ideal (ikkalasi ham unidirectional)

Color: MVC column = red/orange, Redux column = blue/green
```

**Vizual taqqoslash:**
```
         MVC (BIDIRECTIONAL)        REDUX (UNIDIRECTIONAL)
         ──────────────────         ──────────────────────

View ←──→ Controller ←──→ Model     View → Action → Reducer → Store → View
  ↑                         ↓              ──────────────────────────►
  └─────────────────────────┘                    (faqat shu tomonga!)

❌ Murakkab katta proyektda         ✅ Katta proyektda ham aniq
❌ Xatolikni topish qiyin           ✅ Redux DevTools bilan oson debug
❌ State bir necha joyda            ✅ Single source of truth
```

---

## SLIDE 11 — Action Creator va Action Types

```
PPT PROMPT:
Slide title: "Action Creator & Action Types"
Left box — "Action Type (string constant)":
  'products/setProducts'
  'orders/setOrders'
  Format: 'sliceName/actionName'

Right box — "Action Creator (function)":
  Returns an action object:
  { type: 'products/setProducts', payload: [...] }

Center: show dispatch() calling the action creator
Arrow: Component → dispatch(setProducts(data)) → Reducer
Add Redux Toolkit note: "createSlice automatically creates action types & creators"
```

**Tushuntirish:**
```ts
// Action Type — qaysi o'zgarish bo'lishini belgilaydi
const SET_PRODUCTS = 'products/setProducts';

// Action Creator — action object qaytaruvchi funksiya
const setProducts = (data) => ({
  type: SET_PRODUCTS,
  payload: data,       // yangi ma'lumot
});

// Ishlatish (Component ichida):
dispatch(setProducts(apiData));
//  ↑ Store ga yetkazuvchi  ↑ action object

// Redux Toolkit slice (zamonaviy usul):
const productsSlice = createSlice({
  name: 'products',
  initialState: { list: [] },
  reducers: {
    setProducts: (state, action) => {
      state.list = action.payload; // immer orqali to'g'ri o'zgartirish
    },
  },
});
export const { setProducts } = productsSlice.actions;
```

---

## SLIDE 12 — dispatch va subscribe / selector

```
PPT PROMPT:
Slide title: "dispatch() va useSelector() — Redux ning 2 asosiy jarayoni"
Split into 2 halves:

Left half — "dispatch()" — YOZISH:
  "State ni o'zgartirish uchun ishlatiladi"
  Flow: Component → dispatch(action) → Reducer → Store updates
  Color: Orange/Red (write operation)

Right half — "useSelector()" — O'QISH:
  "Store dagi state ni o'qish uchun ishlatiladi"
  Flow: Store → useSelector(state => state.x) → Component
  Color: Blue/Green (read operation)

Bottom note: "dispatch = setter, useSelector = getter"
```

**Kod misoli:**
```tsx
import { useDispatch, useSelector } from 'react-redux';

function ProductsPage() {
  // O'QISH — selector orqali store dan data olish
  const products = useSelector(
    (state: RootState) => state.products.list
  );

  const dispatch = useDispatch();

  // YOZISH — dispatch orqali store ni yangilash
  const handleFetch = () => {
    dispatch(setProducts(newData));
  };

  return <div>{products.map(p => <Card key={p.id} />)}</div>;
}
```

---

## SLIDE 13 — Redux Toolkit Afzalliklari

```
PPT PROMPT:
Slide title: "Redux Toolkit — Nima uchun afzal?"
Show 5 feature cards in a grid:

Card 1 — "configureStore" — Reducer, middleware, DevTools avtomatik
Card 2 — "createSlice" — Action + Reducer bitta joyda
Card 3 — "createAsyncThunk" — Async (API) so'rovlar oson
Card 4 — "Immer built-in" — State ni to'g'ridan mutate qilsa ham ishlaydi
Card 5 — "redux-logger" — Har dispatch console ga chiqadi (debug)

Below: "RTK = Redux boilerplate ni 70% kamaytiradi"
Background: dark with colorful cards.
```

**Redux Toolkit vs eski Redux:**
```
ESKI REDUX (manual):                REDUX TOOLKIT:
────────────────────────            ──────────────────────────
1. actionTypes.ts yaratish          createSlice() — bari bitta
2. actionCreators.ts yaratish       ↓
3. reducer.ts yaratish              productsSlice.actions
4. store.ts da combine              productsSlice.reducer
5. Immutability manual              Immer built-in (mutate OK)

~5 fayl, ~100+ qator               ~1 fayl, ~30 qator ✅
```

---

## SLIDE 14 — Debugging farqi (MVC vs Redux)

```
PPT PROMPT:
Slide title: "Debugging Comparison — MVC vs Redux"
Create 2 phone/browser mockup screenshots side by side:

Left (MVC Debug) — Red warning:
  "Qaysi Controller o'zgartirdi? Qaysi Model?"
  "console.log lari hamma joyda tarqoq"
  "State history yo'q"

Right (Redux Debug) — Green checkmark:
  Show Redux DevTools screenshot mockup:
  - Action list (SET_PRODUCTS, SET_USER...)
  - State before / State after
  - Time-travel debugging
  - redux-logger console output

Note: "redux-logger middleware — har dispatch da console da ko'rinadi"
```

**redux-logger console output:**
```
 action products/setProducts @ 14:23:05.123
   prev state  { products: { list: [] } }
   action      { type: 'products/setProducts', payload: [...] }
   next state  { products: { list: [item1, item2] } }
```

---

## SLIDE 15 — App.tsx Router va Sahifa tuzilmasi

```
PPT PROMPT:
Slide title: "App.tsx — Routing va Sahifa Tuzilmasi (Jul 14)"
Show a site map tree:

                    App.tsx
                      │
          ┌───────────┼────────────┐
     HomeNavbar   Switch/Routes  OtherNavbar
     (path="/")                  (boshqa pages)
                      │
         ┌────────────┼────────────┬──────────┐
      /products    /orders    /member-page   /help
      ProductsPage OrdersPage UserPage       HelpPage
                      │
                 path="/"
                 HomePage ✅ (Test1 → HomePage ga o'zgartirildi)

Add note: "Jul 13: Test1 experiment, Jul 14: HomePage ga qaytarildi"
```

**App.tsx o'zgarish (Jul 14 commit):**
```tsx
// BEFORE (Jul 13):
<Route path="/">
  <Test1 />          {/* ← class component test */}
  {/* <HomePage /> */}
</Route>

// AFTER (Jul 14):
<Route path="/">
  {/* <Test1 /> */}  {/* ← comment ga olindi */}
  <HomePage />       {/* ← asosiy sahifa qaytarildi */}
</Route>
```

---

## SLIDE 16 — Yakuniy Xulosa

```
PPT PROMPT:
Slide title: "Xulosa — July 13-15 da nima o'rgandik?"
Create a timeline with 4 stops:

Jul 13 (Morning) — Star icon:
  "Class Component yaratdik (Test1.tsx)"
  "Lifecycle: Mount, Update, Unmount"

Jul 13 (Afternoon) — Lightning icon:
  "Hooks: useState & useEffect (HomeNavbar.tsx)"
  "Functional = Class ni almashtirdi"

Jul 14 — Route icon:
  "App.tsx: Test1 → HomePage switch"
  "Routing tuzilmasi tushunildi"

Jul 15 — Architecture icon:
  "MVC vs Flux vs Redux farqlari"
  "4 qism: View, Action, Reducer, Store"
  "Unidirectional flow"

Bottom banner: "Keyingi qadam: Redux Store ga API ulash"
```

---

## QUICK REFERENCE — PPT Yasash uchun AI Prompt

**Gamma.app yoki ChatGPT uchun to'liq prompt:**

```
Create a professional presentation (16 slides) about React and Redux architecture
for a web development bootcamp audience (intermediate level).

Topics to cover:
1. React Component Types: Screen, Sectional, Reusable — with examples
2. Class Components: constructor, this.state, lifecycle methods
3. useState Hook: syntax, types (number, boolean, string)
4. useEffect Hook: 3 modes (mount, update, unmount), dependency array
5. Class vs Functional comparison table
6. MVC Architecture: Model-View-Controller, bidirectional flow diagram
7. Flux Architecture: Action-Dispatcher-Store-View, unidirectional
8. Redux Architecture: 4-part diagram (View→Action→Reducer→Store→View)
9. MVC vs Redux comparison: flow direction, store, debugging
10. Action Creator and Action Types — code examples
11. dispatch() vs useSelector() — write vs read operations
12. Redux Toolkit: configureStore, createSlice, createAsyncThunk benefits
13. redux-logger middleware — debugging console output example
14. App.tsx routing structure — Switch, Route, NavLink
15. Real code from BURAK restaurant project (React TypeScript)
16. Summary timeline: July 13 class components → July 15 Redux theory

Design style: dark background (#1a1a2e), blue/orange accent colors,
monospace code font, minimal icons. Tech/modern aesthetic.

Include Mermaid or ASCII diagrams for architecture flows.
Target audience: students learning React with TypeScript, MUI, Redux Toolkit.
```

---

*Fayl yaratildi: 2026-07-15 | Loyiha: BURAK Restaurant App*
