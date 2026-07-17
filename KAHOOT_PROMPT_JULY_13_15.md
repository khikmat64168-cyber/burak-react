# Kahoot Excel Prompt — July 13–15 | React Hooks & MVC vs Redux

> Bu faylda **Claude ga beriladigan tayyor promptlar** bor.
> Promptni Claude ga bering → Claude Excel/CSV formatida Kahoot savollari chiqaradi →
> Kahoot.com ga import qilasiz.
>
> Mavzular: Class Component · useState · useEffect · MVC · Redux

---

## KAHOOT EXCEL FORMAT (qanday bo'lishi kerak)

Kahoot `.xlsx` import fayli **aniq shu ustunlarga** ega bo'lishi kerak:

| Question | Answer 1 | Answer 2 | Answer 3 | Answer 4 | Time Limit | Correct Answer |
|----------|----------|----------|----------|----------|------------|----------------|
| Savol matni | Variant A | Variant B | Variant C | Variant D | 20 | 1 |

- **Time Limit**: 20 yoki 30 (soniyada)
- **Correct Answer**: 1, 2, 3, yoki 4 (qaysi variant to'g'ri)
- Maksimal 4 ta javob varianti
- Savol 120 belgidan oshmasin

---

## PROMPT 1 — To'liq Kahoot Excel (barcha mavzular, 20 savol)

> Bu eng keng prompt. Bir marta berib, to'liq Kahoot o'yini olinadi.

```
Menga quyidagi mavzular bo'yicha Kahoot uchun Excel (.xlsx) fayl yasab ber.
Jami 20 ta savol bo'lsin. Har bir savolda 4 ta javob varianti bo'lsin,
faqat bittasi to'g'ri. Savollar ingliz tilida bo'lsin.

Mavzular (har biridan 4-5 savol):
1. React Class Component (this.state, setState, lifecycle methods)
2. useState va useEffect Hooks
3. MVC arxitekturasi (Model-View-Controller, bidirectional flow)
4. Redux arxitekturasi (View, Action, Reducer, Store, unidirectional)

Natijani aniq shu Excel ustun tartibida ber:
Question | Answer 1 | Answer 2 | Answer 3 | Answer 4 | Time Limit | Correct Answer

Qoidalar:
- Time Limit: oddiy savollarga 20, kod savollariga 30
- Correct Answer: 1, 2, 3 yoki 4 (qaysi ustun to'g'ri ekanini ko'rsat)
- Savollar qisqa va aniq bo'lsin (120 belgidan oshmasin)
- Variant variantlari o'xshash uzunlikda bo'lsin
- Birinchi qator — ustun nomlari (header)
- Keyin 20 qator savol

Ushbu real loyiha kodidan savol yarat:

CLASS COMPONENT (Test1.tsx):
  this.state = { brand: 'Ford', color: 'red', year: 1964 }
  componentDidMount() — birinchi renderdan keyin ishlaydi
  componentWillUnmount() — component o'chirilishidan oldin
  changeDetail() = this.setState({ color: 'blue', brand: 'Tesla' })

HOOKS (HomeNavbar.tsx):
  const [count, setCount] = useState<number>(0);
  const [value, setvalue] = useState<boolean>(true);
  useEffect(() => { setCount(count+1); return () => {} }, [value])

MVC vs REDUX (README.md):
  MVC — bidirectional flow
  Redux — unidirectional flow
  Redux 4 qism: View, Action, Reducer, Store
  Redux da controller o'rnida Reducer ishlaydi
  MVC da store yo'q, Redux da Single Store bor

Faqat Excel jadvali chiqar, izoh yozma.
```

---

## PROMPT 2 — Faqat Class Component (5 savol)

> Faqat Jul 13 sabah commitiga oid savollar kerak bo'lsa.

```
React Class Component mavzusida Kahoot uchun 5 ta savol yarat.
Quyidagi formatda Excel jadval ber:

Question | Answer 1 | Answer 2 | Answer 3 | Answer 4 | Time Limit | Correct Answer

Quyidagi koddan savol yarat (Test1.tsx):

class Test1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { brand: 'Ford', model: 'Mustang', color: 'red', year: 1964 };
  }
  changeDetail = () => {
    this.setState({ color: 'blue', brand: 'Tesla', model: 'ModelS', year: 2023 });
  };
  componentDidMount() {
    // runs after first render — backend dan data olish uchun
  }
  componentWillUnmount() {
    // runs before unmount — a pagedan b pagega o'tganda
  }
  render() { return <div>...</div>; }
}

Qamrab olsin:
- Class component da state qanday e'lon qilinadi
- setState() nima qiladi
- componentDidMount qachon ishlaydi
- componentWillUnmount nima uchun kerak
- render() ning vazifasi

Savollar ingliz tilida. Time Limit: 30. Faqat jadval chiqar.
```

---

## PROMPT 3 — Faqat Hooks (useState & useEffect) (6 savol)

> Jul 13 kechqurun commitiga oid.

```
React Hooks (useState va useEffect) mavzusida Kahoot uchun 6 ta savol yarat.
Format:
Question | Answer 1 | Answer 2 | Answer 3 | Answer 4 | Time Limit | Correct Answer

Quyidagi real koddan savol yarat (HomeNavbar.tsx):

const [count, setCount] = useState<number>(0);
const [value, setvalue] = useState<boolean>(true);

useEffect(() => {
  console.log('componentDidiMount');
  setCount(count + 1);
  return () => {
    console.log('componentWillUnmount');
  };
}, [value]);

const buttonHandler = () => {
  setvalue(!value);
};

Qamrab olsin:
- useState sintaksisi: [state, setState] = useState(initialValue)
- useState TypeScript tipi: useState<number>(0)
- useEffect dependency array [] — qachon ishlaydi
- useEffect return funksiya nima vazifada
- useEffect [value] — value o'zgarganda nima bo'ladi
- Functional va Class componentda lifecycle farqi

Savollar ingliz tilida. Time Limit: 20 (oddiy) yoki 30 (kod bor savollar).
Faqat jadval chiqar.
```

---

## PROMPT 4 — Faqat MVC vs Redux arxitekturasi (9 savol)

> Jul 15 README commit — eng muhim mavzu.

```
MVC va Redux arxitekturasi mavzusida Kahoot uchun 9 ta savol yarat.
Format:
Question | Answer 1 | Answer 2 | Answer 3 | Answer 4 | Time Limit | Correct Answer

Quyidagi README.md dan olingan ma'lumotlardan savol yarat:

REDUX:
- Redux 4 qismdan iborat: View, Action, Reducer, Store
- Redux flow: UNIDIRECTIONAL (bir tomonga)
- Redux da controller o'rnida Reducer amal bajaradi
- dispatch(action) — Store ga o'zgarish yuboradi
- useSelector(selector) — Store dan ma'lumot o'qiydi
- Redux Single Store — bitta markaziy saqlash joyi
- Action Creator — action object qaytaruvchi funksiya
- Action Type — { type: 'products/setProducts', payload: data }

MVC:
- MVC flow: BIDIRECTIONAL (ikki tomonga)
- MVC = Model + View + Controller
- MVC da alohida Store mavjud emas
- Controller — biznes logikasini boshqaradi

FARQLAR:
- MVC bidirectional, Redux unidirectional
- MVC da ko'p state, Redux da Single Store
- Redux debugging oson (DevTools, redux-logger)
- redux-logger — har dispatch console ga yozadi

REDUX TOOLKIT (store.ts):
  configureStore({ middleware: getDefaultMiddleware().concat(reduxLogger), reducer: {} })
  reduxLogger — middleware sifatida qo'shilgan

Savollar ingliz tilida. Oddiy savollar 20 sek, arxitektura savollar 30 sek.
Faqat jadval chiqar.
```

---

## PROMPT 5 — Aralash (kod o'qish) — Advanced savolar

> O'quvchilar kod o'qib javob beradigan qiyin savolar.

```
Quyidagi React/Redux kod parchalaridan Kahoot uchun 8 ta "kod o'qish" savoli yarat.
Savol kodni ko'rsatsin, to'g'ri natijani so'rasin.

Format:
Question | Answer 1 | Answer 2 | Answer 3 | Answer 4 | Time Limit | Correct Answer

Kod parchalar:

1.
const [count, setCount] = useState(0);
// count ning boshlang'ich qiymati nima?

2.
useEffect(() => { ... }, [])
// Bu useEffect qachon ishlaydi?

3.
useEffect(() => { ... }, [value])
// Bu useEffect qachon qayta ishlaydi?

4.
useEffect(() => {
  return () => { cleanup() };
}, []);
// return () => {} nima vazifada?

5.
this.setState({ color: 'blue' })
// Bu qaysi component turida ishlatiladi?

6.
componentDidMount() { fetchData() }
// Bu lifecycle method qachon ishlaydi?

7.
dispatch(setProducts(data))
// dispatch() nima qiladi?

8.
const products = useSelector(state => state.products.list)
// useSelector() nima qaytaradi?

Har savol uchun 4 ta variant ber, bittasi to'g'ri.
Variantlar qisqa bo'lsin (5-10 so'z).
Time Limit: 30 (kod savollari).
Faqat jadval chiqar.
```

---

## PROMPT 6 — O'zbek tilida Kahoot (bonus)

> Sinfdoshlar uchun o'zbek tilida.

```
Quyidagi mavzular bo'yicha O'ZBEK TILIDA Kahoot uchun 10 ta savol yarat.
Mavzular: React Class Component, useState, useEffect, MVC, Redux.

Format:
Question | Answer 1 | Answer 2 | Answer 3 | Answer 4 | Time Limit | Correct Answer

Qoidalar:
- Savollar va javoblar o'zbek tilida
- Texnik terminlar inglizcha qolsin (useState, dispatch, reducer va h.k.)
- Time Limit: 20 yoki 30
- Correct Answer: 1, 2, 3 yoki 4

Muhim tushunchalar:
- useState — funksional componentda holatni saqlaydi
- useEffect — lifecycle metodlarini almashtiradi
- Class component — this.state va lifecycle metodlari bilan ishlaydi
- MVC — ikki tomonlama (bidirectional) oqim
- Redux — bir tomonlama (unidirectional) oqim
- Redux 4 qism: View, Action, Reducer, Store
- dispatch() — store ga o'zgarish yuboradi
- useSelector() — store dan ma'lumot oladi
- Reducer — MVC dagi Controller o'rnini bosadi

Faqat jadval chiqar, izoh yozma.
```

---

## PROMPT 7 — Claude ga Excel fayl yasatish (butun jarayon)

> Eng to'liq prompt. Bitta Claude chatga berib, Excel fayli olinadi.

```
Men Kahoot uchun Excel fayl kerak. Quyidagi talablarga ko'ra yasab ber:

FAYL FORMATI:
- .xlsx yoki .csv format
- Birinchi qator: Question, Answer 1, Answer 2, Answer 3, Answer 4, Time Limit, Correct Answer
- Jami 20 ta savol qatori

MAVZULAR (Jul 13-15 React kurs materialidan):

1. CLASS COMPONENT (5 savol):
   - Test1.tsx da this.state = { brand: 'Ford', color: 'red', year: 1964 }
   - changeDetail() — this.setState() bilan state o'zgartiradi
   - componentDidMount() — birinchi renderdan keyin, backend data olish uchun
   - componentWillUnmount() — component o'chirilishidan oldin cleanup

2. HOOKS (6 savol):
   - useState<number>(0) va useState<boolean>(true)
   - useEffect(() => {}, []) — faqat mount da
   - useEffect(() => {}, [value]) — value o'zgarganda
   - useEffect return () => {} — unmount cleanup
   - buttonHandler: setvalue(!value) — toggling

3. MVC vs REDUX (9 savol):
   - MVC: bidirectional, Controller, Model, View, no single store
   - Redux: unidirectional, View → Action → Reducer → Store → View
   - Redux Single Store — bitta markaziy joy
   - Controller o'rnida Reducer ishlaydi
   - dispatch(action) — yozish
   - useSelector(fn) — o'qish
   - redux-logger — debugging middleware
   - Redux Toolkit: configureStore, createSlice afzalliklari

SAVOL QOIDALARI:
- Ingliz tilida
- Har savolda 4 variant, 1 tasi to'g'ri
- Variantlar qisqa va aniq
- Noto'g'ri variantlar mantiqiy (random emas, o'xshash)
- Time Limit: 20 (oddiy) / 30 (kod bor)
- Correct Answer: 1, 2, 3 yoki 4

Natija faqat jadval bo'lsin. CSV format qabul qilinadi.
Sarlavha: Question,Answer 1,Answer 2,Answer 3,Answer 4,Time Limit,Correct Answer
```

---

## TAYYOR SAVOLLAR NAMUNASI

> Promptni ishlatmasdan oldin namuna ko'rish uchun.

| # | Question | A1 | A2 | A3 | A4 | Time | Correct |
|---|----------|----|----|----|-----|------|---------|
| 1 | In Test1.tsx, what is the initial value of `brand` in this.state? | Tesla | Ford | Mustang | Toyota | 20 | 2 |
| 2 | Which lifecycle method runs after the first render in a class component? | componentWillUnmount | componentDidUpdate | componentDidMount | constructor | 20 | 3 |
| 3 | What does `this.setState()` do in a class component? | Deletes state | Reads state | Updates state and re-renders | Mounts component | 20 | 3 |
| 4 | What is the initial value of `count` in `useState<number>(0)`? | null | 1 | undefined | 0 | 20 | 4 |
| 5 | `useEffect(() => {}, [])` — when does this run? | Every render | Never | Only on mount | Only on unmount | 20 | 3 |
| 6 | `useEffect(() => {}, [value])` — when does it re-run? | Never | When value changes | Every 5 seconds | Only once | 20 | 2 |
| 7 | What does the `return () => {}` inside useEffect do? | Fetches data | Cleanup on unmount | Updates state | Renders JSX | 30 | 2 |
| 8 | What is MVC's data flow direction? | Unidirectional | Circular | Bidirectional | Linear | 20 | 3 |
| 9 | What is Redux's data flow direction? | Bidirectional | Unidirectional | Circular | Random | 20 | 2 |
| 10 | Redux consists of how many main parts? | 3 | 5 | 2 | 4 | 20 | 4 |
| 11 | What are the 4 parts of Redux? | View, Model, Controller, Store | View, Action, Reducer, Store | Hook, State, Dispatch, Store | Component, Type, Saga, Store | 30 | 2 |
| 12 | In Redux, what replaces the MVC Controller? | Action | Store | Reducer | View | 20 | 3 |
| 13 | MVC has how many stores? | One global store | No store | Multiple stores | Two stores | 20 | 2 |
| 14 | Redux has how many stores? | No store | Multiple stores | Single store | Unlimited | 20 | 3 |
| 15 | What does `dispatch(action)` do in Redux? | Reads from store | Sends an action to store | Deletes the store | Renders UI | 20 | 2 |
| 16 | What does `useSelector(state => state.x)` do? | Writes to store | Dispatches action | Reads from store | Creates reducer | 20 | 3 |
| 17 | What is redux-logger used for? | Creating reducers | Debugging — logs every dispatch | Managing async actions | Styling components | 20 | 2 |
| 18 | What does `configureStore` come from? | redux | react-redux | @reduxjs/toolkit | redux-logger | 20 | 3 |
| 19 | `componentDidMount` in class = which hook pattern? | `useState(fn, [dep])` | `useEffect(fn)` no array | `useEffect(fn, [])` | `useEffect(fn, [all])` | 30 | 3 |
| 20 | Which is easier to debug: MVC or Redux? | Same difficulty | MVC | Redux | Neither | 20 | 3 |

---

## KAHOOT GA IMPORT QILISH (qadam-qadam)

```
1. kahoot.com ga kiring → "Create" tugmasini bosing
2. "Import spreadsheet" ni tanlang
3. Excel/CSV faylni yuklang
4. Ustunlar to'g'ri mapping bo'lishini tekshiring:
   - Question → Question
   - Answer 1-4 → Answer 1-4
   - Time Limit → Time Limit
   - Correct Answer → Correct Answer (1,2,3,4)
5. "Import" → "Save" → O'yin boshlash
```

---

*Fayl yaratildi: 2026-07-15 | Loyiha: BURAK Restaurant App | Jul 13-15 kurs materiallari*
