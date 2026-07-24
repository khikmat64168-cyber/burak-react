# PPT Prompt — July 21 | Config · Axios · Service · Real API

> 4 ta commit, 4 ta katta qadam.
> Har bir slide uchun tayyor PPT prompt + kod + diagram berilgan.
> Gamma.app, ChatGPT yoki Canva AI ga paste qiling.

---

## COMMIT XRONOLOGIYASI

| Vaqt | Commit | Asosiy o'zgarish |
|------|--------|-----------------|
| 05:19 | `feat: create config & env variables` | `.env` + `config.ts` |
| 15:21 | `feat: develop product service business logic` | `ProductService.ts` + real API |
| 15:51 | `fix: retrive fresh menu and modify NewDishes` | `NewDishes.tsx` Redux ga ulandi |
| 16:31 | `fix: retrive topUsers and modify ActiveUsers` | `MemberService.ts` + `ActiveUsers.tsx` |

---

## SLIDE 1 — Muqova

```
PPT PROMPT:
Title slide. Dark tech background (#0f0f1a).
Large white text center: "From Fake Data to Real API"
Subtitle: "Config · Axios · Service Pattern · Redux Integration"
Bottom: "July 21, 2026 — BURAK Restaurant App"
Style: minimal, dark, professional developer aesthetic.
```

---

## SLIDE 2 — Muammo: Hardcoded (qo'lda yozilgan) data

```
PPT PROMPT:
Slide title: "Muammo — Static / Hardcoded Data"
Show two side-by-side code panels:

Left panel (RED border, labeled "BEFORE — Jul 18"):
  const result = [
    {
      _id: '6a39b1be...',
      productName: 'Kebab',
      productPrice: 14,
      productImages: ['uploads/...jpg'],
    }
  ];
  setPopularDishes(result);

Right panel (GREEN border, labeled "AFTER — Jul 21"):
  const product = new ProductService();
  product.getProducts({ page:1, limit:4, order:'productViews' })
    .then((data) => setPopularDishes(data))
    .catch((err) => console.log(err));

Bottom note (yellow box):
"Hardcoded data = haqiqiy ma'lumot emas.
Real API = backend dan kelgan haqiqiy data."
```

**Nima o'zgardi:**
```
OLDIN (Jul 18):                     KEYIN (Jul 21):
──────────────────────              ──────────────────────────
Kod ichida yozilgan array           Backend dan HTTP orqali keladi
Har safar kodda o'zgartirish kerak  Backend da o'zgartirish kifoya
Hamma uchun bir xil                 Har user uchun turli data
```

---

## SLIDE 3 — `.env` va `config.ts` — Environment Variables

```
PPT PROMPT:
Slide title: "Environment Variables — .env & config.ts"
Show a layered diagram:

Top layer (file icon): .env
  REACT_APP_API_URL=http://localhost:3003

Arrow pointing down ↓

Middle layer (file icon): src/lib/config.ts
  export const serverApi = process.env.REACT_APP_API_URL

Arrow pointing down ↓

Bottom layer (multiple file icons): 
  ProductService.ts  →  uses serverApi
  MemberService.ts   →  uses serverApi
  PopularDishes.tsx  →  uses serverApi (image URL uchun)
  NewDishes.tsx      →  uses serverApi
  ActiveUsers.tsx    →  uses serverApi

Add callout box:
"localhost:3003 — backend server manzili
REACT_APP_ prefix — CRA ning qoidasi"
```

**Kodlar:**

`.env` — yangi fayl (05:19 da yaratildi)
```env
REACT_APP_API_URL=http://localhost:3003
```

`src/lib/config.ts` — yangi fayl
```ts
// Backend manzilini bir joyda saqlash
export const serverApi: string = `${process.env.REACT_APP_API_URL}`;

// Ilovada ko'rinadigan xato xabarlari
export const Messages = {
  error1: 'Something went wrong',
  error2: 'Please login first',
  error3: 'Please fulfill all inputs',
  error4: 'Message is empty',
  error5: 'Only images with jpeg, jpg, png format allowed',
};
```

**Nima uchun `.env` kerak:**
```
❌ Yomon usul:
   const url = 'http://localhost:3003/product/all'
   // Server o'zgarsa → barcha fayllarda o'zgartirish kerak

✅ To'g'ri usul:
   .env  → REACT_APP_API_URL=http://localhost:3003
   config.ts → export const serverApi = process.env.REACT_APP_API_URL
   // Faqat .env ni o'zgartirish kifoya
```

---

## SLIDE 4 — Axios nima?

```
PPT PROMPT:
Slide title: "Axios — HTTP So'rovlar Kutubxonasi"
Center: large axios logo (orange/purple)
Show a request-response flow diagram:

React App
    │
    │ axios.get(url)
    ▼
[HTTP Request] ──────────────────► Backend Server
                                        │
                                        │ JSON data
                                        ▼
React App ◄─────────────────── [HTTP Response]
    │
    │ result.data
    ▼
Redux Store → Component

Bottom comparison table:
| | fetch (native) | axios |
| Syntax | verbose | clean |
| Error handling | manual | automatic |
| JSON parse | manual .json() | automatic |
| Timeout | manual | built-in |
| Interceptors | no | yes |
```

**ProductService.ts da axios ishlatilishi:**
```ts
// axios.get — GET so'rov yuborish
const result = await axios.get(url);

// result.data — backend qaytargan JSON
return result.data;

// fetch bilan bir xil ish, lekin qisqaroq:
// fetch → .then(r => r.json()) → data
// axios → .get(url) → result.data  ← to'g'ridan
```

---

## SLIDE 5 — Service Pattern (OOP Class)

```
PPT PROMPT:
Slide title: "Service Pattern — API Logikasini Ajratish"
Show a building-blocks diagram:

Without Service Pattern:
  [HomePage/index.tsx] — contains ALL logic:
    useState, useEffect, axios.get, URL building,
    error handling, dispatch, JSX rendering
  → ONE GIANT FILE, hard to maintain

With Service Pattern:
  ┌─────────────────────┐    ┌──────────────────────┐
  │ ProductService.ts   │    │ MemberService.ts      │
  │ - constructor()     │    │ - constructor()        │
  │ - getProducts()     │    │ - getTopUsers()        │
  └────────┬────────────┘    └────────┬───────────────┘
           │ returns data             │ returns data
           ▼                          ▼
  ┌─────────────────────────────────────────────────┐
  │           homePage/index.tsx                    │
  │  new ProductService().getProducts({...})        │
  │  .then(data => setPopularDishes(data))          │
  └─────────────────────────────────────────────────┘

Label: "Single Responsibility — har fayl bitta ish qiladi"
```

**`src/app/services/ProductService.ts`** — yangi fayl (15:21 da yaratildi)
```ts
import axios from 'axios';
import { serverApi } from '../../lib/config';
import { ProductInquery } from '../../lib/types/product';

class ProductService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;  // config.ts dan oladi
  }

  public async getProducts(input: ProductInquery): Promise<Product[]> {
    try {
      // URL ni dinamik qurish
      let url = `${this.path}/product/all?order=${input.order}&page=${input.page}&limit=${input.limit}`;

      // ixtiyoriy filterlar
      if (input.productCollection)
        url += `&productCollection=${input.productCollection}`;

      if (input.search)
        url += `&search=${input.search}`;

      const result = await axios.get(url);  // HTTP GET so'rov
      console.log('getProducts:', result);

      return result.data;  // backend dan kelgan ma'lumot
    } catch (err) {
      console.log('Error, getProduct:', err);
      throw err;  // xatolikni yuqoriga uzatish
    }
  }
}

export default ProductService;
```

**`src/app/services/MemberService.ts`** — yangi fayl (16:31 da yaratildi)
```ts
import axios from 'axios';
import { serverApi } from '../../lib/config';
import { Member } from '../../lib/types/member';

class MemberService {
  private readonly path: string;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      const url = this.path + '/member/top-users';
      const result = await axios.get(url);
      console.log('getTopUsers:', result);

      return [];  // backend hali tayyor emas, bo'sh qaytaradi
    } catch (err) {
      console.log('Error, getTopUsers:', err);
      throw err;
    }
  }
}

export default MemberService;
```

---

## SLIDE 6 — index.tsx: Fake Data → Real API

```
PPT PROMPT:
Slide title: "homePage/index.tsx — 3 ta parallel API call"
Show a timeline flow:

Component mounts (useEffect runs once [])
         │
         ├──► ProductService.getProducts({ order: 'productViews' })
         │         └──► .then(data => setPopularDishes(data))
         │
         ├──► ProductService.getProducts({ order: 'createdAt' })
         │         └──► .then(data => setNewDishes(data))
         │
         └──► MemberService.getTopUsers()
                   └──► .then(data => setTopUsers(data))

All 3 → dispatch → Reducer → Store → Components re-render

Add: "3 ta so'rov parallel yuboriladi, hammasi kelganda Redux yangilanadi"
```

**`src/app/screens/homePage/index.tsx`** — o'zgargan qism
```tsx
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    const product = new ProductService();

    // 1. Popular dishes — ko'p ko'rilgan taomlar
    product
      .getProducts({ page: 1, limit: 4, order: 'productViews', productCollection: ProductCollection.DISH })
      .then((data) => setPopularDishes(data))
      .catch((err) => console.log(err));

    // 2. New dishes — yangi qo'shilgan taomlar
    product
      .getProducts({ page: 1, limit: 4, order: 'createdAt', productCollection: ProductCollection.DISH })
      .then((data) => setNewDishes(data))
      .catch((err) => console.log(err));

    // 3. Top users — faol foydalanuvchilar
    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));

  }, []); // [] = sahifa bir marta ochilganda ishlaydi

  return (
    <div className={'homepage'}>
      <Statistics />
      <PopularDishes />  {/* store.popularDishes ni ko'radi */}
      <NewDishes />      {/* store.newDishes ni ko'radi */}
      <ActiveUsers />    {/* store.topUsers ni ko'radi */}
      <Events />
    </div>
  );
}
```

---

## SLIDE 7 — PopularDishes: Static → Redux

```
PPT PROMPT:
Slide title: "PopularDishes.tsx — 3 ta asosiy o'zgarish"
Show 3 numbered change cards:

Card 1 (red→green): "Data manbai"
  OLDIN: const list = [{productName:'Lavash',...}]  (kod ichida)
  KEYIN: const { popularDishes } = useSelector(...)  (Redux store dan)

Card 2 (red→green): "Rasm manzili"
  OLDIN: src={ele.imagePath}  → '/img/lavash.webp'
  KEYIN: const imagePath = serverApi + '/' + ele.productImages[0]
         src={imagePath}  → 'http://localhost:3003/uploads/...'

Card 3 (red→green): "Statik qiymatlar"
  OLDIN: 20  (hardcoded)           KEYIN: {ele.productViews}  (real)
  OLDIN: 'This is delicious meal'   KEYIN: {ele.productDesc}   (real)
  OLDIN: key={index}                KEYIN: key={ele._id}       (unique)
```

**`PopularDishes.tsx` — asosiy o'zgarishlar:**
```tsx
// YANGI: Redux selector qo'shildi
const popularDishRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function PopularDishes() {
  // YANGI: store dan o'qish
  const { popularDishes } = useSelector(popularDishRetriever);

  return (
    ...
    {popularDishes.length !== 0 ? (
      popularDishes.map((ele: Product) => {
        // YANGI: rasm URL ni server manzili bilan qurish
        const imagePath = `${serverApi}/${ele.productImages[0]}`;
        return (
          <CssVarsProvider key={ele._id}>  {/* index emas, _id */}
            <Card>
              <CardCover>
                <img src={imagePath} alt="" />  {/* real URL */}
              </CardCover>
              ...
              <Typography>{ele.productName}</Typography>  {/* real nom */}
              <Typography>{ele.productViews}</Typography>  {/* real son */}
              <Typography>{ele.productDesc}</Typography>  {/* real tavsif */}
            </Card>
          </CssVarsProvider>
        );
      })
    ) : (
      <Box className="no-data">Popular products are not available!</Box>
    )}
  );
}
```

---

## SLIDE 8 — NewDishes: sizeVolume mantiq

```
PPT PROMPT:
Slide title: "NewDishes.tsx — Aqlli Size/Volume ko'rsatish"
Center: a decision diamond diagram:

product.productCollection === 'DRINK' ?
        /                    \
      YES                    NO
       |                      |
  product.productVolume + 'l'   product.productSize + ' size'
  "1.5l"                          "NORMAL size"
       \                      /
        → div.product-sale

Below: show 2 card mockups side by side:
Left card:  [DRINK category] → shows "1.5l"
Right card: [DISH category]  → shows "NORMAL size"

Add note: "Kategoriyaga qarab ko'rinadigan ma'lumot o'zgaradi"
```

**`NewDishes.tsx` — sizeVolume mantiq:**
```tsx
newDishes.map((product: Product) => {
  // Rasm URL
  const imagePath = `${serverApi}/${product.productImages[0]}`;

  // AQLLI MANTIQ: ichimlik uchun hajm (litr), taom uchun o'lcham
  const sizeVolume =
    product.productCollection === ProductCollection.DRINK
      ? product.productVolume + 'l'      // masalan: "1.5l"
      : product.productSize + ' size ';  // masalan: "NORMAL size"

  return (
    <Card key={product._id}>
      <CardOverflow>
        <div className="product-sale">{sizeVolume}</div>  {/* ← shu yerda */}
        <img src={imagePath} alt="" />
      </CardOverflow>

      <Typography>{product.productName}</Typography>
      <Typography>${product.productPrice}</Typography>  {/* real narx */}
      <Typography>{product.productViews}</Typography>  {/* real ko'rishlar */}
    </Card>
  );
})
```

---

## SLIDE 9 — ActiveUsers: Member tipi bilan ishlash

```
PPT PROMPT:
Slide title: "ActiveUsers.tsx — Member Type Integration"
Show a data flow:

MemberService.getTopUsers()
    │ returns Member[]
    ▼
setTopUsers(data) → dispatch → Reducer → store.topUsers
    │
    ▼
useSelector(topUsersRetriever)
    │ returns { topUsers: Member[] }
    ▼
topUsers.map((member: Member) => {
    const imagePath = serverApi + '/' + member.memberImage;
    <img src={imagePath} />
    <Typography>{member.memberNick}</Typography>
})

Add: "Product uchun Product type, Member uchun Member type —
TypeScript har birining fieldlarini tekshiradi"
```

**`ActiveUsers.tsx` — o'zgarishlar:**
```tsx
// YANGI: selector
const topUsersRetriever = createSelector(retrieveTopUsers, (topUsers) => ({
  topUsers,
}));

export default function ActiveUsers() {
  const { topUsers } = useSelector(topUsersRetriever);

  return (
    ...
    {topUsers.length !== 0 ? (
      topUsers.map((member: Member) => {  // Member tipi — TypeScript nazorat qiladi
        const imagePath = `${serverApi}/${member.memberImage}`;
        return (
          <Card key={member._id}>
            <img src={imagePath} alt="" />           {/* real rasm */}
            <Typography>{member.memberNick}</Typography>  {/* real nick */}
          </Card>
        );
      })
    ) : (
      <Box className={'no-data'}>No Active users!!</Box>
    )}
  );
}
```

---

## SLIDE 10 — slice.ts: settopUsers → setTopUsers (rename fix)

```
PPT PROMPT:
Slide title: "slice.ts — Naming Convention Fix"
Show a before/after diff:

BEFORE (Jul 18):
  settopUsers: (state, action) => {     ← kichik harf 't'
    state.topUsers = action.payload;
  }
  export const { setPopularDishes, setNewDishes, settopUsers }

AFTER (Jul 21):
  setTopUsers: (state, action) => {     ← katta harf 'T'
    state.topUsers = action.payload;
  }
  export const { setPopularDishes, setNewDishes, setTopUsers }

Add note: "camelCase qoidasi: set + To'g'ri nom.
setTopUsers ✅    settopUsers ❌"
```

---

## SLIDE 11 — Selector: index.tsx dan Component ga ko'chirish

```
PPT PROMPT:
Slide title: "Selector Responsibility Shift"
Show a before/after architecture diagram:

BEFORE (Jul 18):
  index.tsx
  ├── actionDispatch (dispatch wrapper)
  ├── popularDishRetriever (selector) ← shu yerda edi
  ├── useSelector(popularDishRetriever)
  └── renders <PopularDishes />

AFTER (Jul 21):
  index.tsx
  ├── actionDispatch (dispatch wrapper only)
  └── renders <PopularDishes />

  PopularDishes.tsx
  ├── popularDishRetriever (selector) ← shu yerga ko'chdi
  └── useSelector(popularDishRetriever)

Add: "Har component o'z ma'lumotini o'zi oladi —
Single Responsibility Principle"
```

---

## SLIDE 12 — To'liq Oqim (July 21 oxiriga kelib)

```
PPT PROMPT:
Slide title: "To'liq Data Oqimi — Jul 21 Final State"
Create a large end-to-end flow diagram:

[.env] → serverApi → [ProductService] → axios.get(url)
                   → [MemberService]  → axios.get(url)
                                              │
                                    [Backend Server :3003]
                                              │
                                       JSON response
                                              │
                              setPopularDishes(data) / setNewDishes(data) / setTopUsers(data)
                                              │
                                           dispatch
                                              │
                                    [Reducer — slice.ts]
                                              │
                                    [Store — store.ts]
                                     homePage: {
                                       popularDishes: [...],
                                       newDishes: [...],
                                       topUsers: [...]
                                     }
                                              │
                              useSelector in each component
                                    /         |         \
                         PopularDishes   NewDishes   ActiveUsers
                         (ko'rsatiladi)  (ko'rsatiladi) (ko'rsatiladi)

Color: green flow lines, dark background
```

---

## SLIDE 13 — Papka tuzilmasi (yangi fayllar)

```
PPT PROMPT:
Slide title: "Yangi Fayllar — Jul 21"
Show a file tree with NEW badges:

src/
├── .env                          🆕 (05:19)
├── lib/
│   └── config.ts                 🆕 (05:19)
└── app/
    └── services/
        ├── ProductService.ts     🆕 (15:21)
        └── MemberService.ts      🆕 (16:31)

O'ZGARGAN FAYLLAR:
    └── screens/homePage/
        ├── index.tsx             ✏️  (4 marta o'zgardi)
        ├── PopularDishes.tsx     ✏️  (15:21)
        ├── NewDishes.tsx         ✏️  (15:51)
        ├── ActiveUsers.tsx       ✏️  (16:31)
        └── slice.ts              ✏️  (16:31 — rename)

Highlight the new "services/" folder with a special color.
Add: "Services papkasi — API logikasi uchun maxsus joy"
```

---

## SLIDE 14 — Xulosa va Keyingi Qadam

```
PPT PROMPT:
Slide title: "Xulosa — July 21"
Show 4 achievement cards in a 2x2 grid:

Card 1 (blue): ".env + config.ts"
  "Manzillar koddan ajratildi"

Card 2 (orange): "Axios + Service Class"
  "API logikasi alohida faylda"

Card 3 (green): "Fake → Real Data"
  "3 ta component real backend bilan ishlaydi"

Card 4 (purple): "Selector ko'chdi"
  "Har component o'z selector ini o'zi boshqaradi"

Bottom banner (yellow):
"Keyingi qadam: Products va Orders sahifalarida ham xuddi shu pattern"
```

---

## GAMMA.APP UCHUN TO'LIQ PROMPT

```
Create a 14-slide developer presentation titled
"From Fake Data to Real API — July 21".

Tech stack: React TypeScript, Redux Toolkit, Axios, MUI Joy UI.

Slides overview:
1. Cover — "From Fake Data to Real API"
2. Problem — hardcoded static arrays vs real API calls
3. .env + config.ts — environment variables pattern
4. Axios — HTTP client, comparison with fetch
5. Service Pattern — ProductService and MemberService OOP classes
6. homePage/index.tsx — 3 parallel API calls in useEffect
7. PopularDishes.tsx — connected to Redux, real image URLs
8. NewDishes.tsx — sizeVolume conditional logic (DRINK vs DISH)
9. ActiveUsers.tsx — Member type integration
10. slice.ts — settopUsers → setTopUsers naming fix
11. Selector moved from index.tsx to each component
12. Full data flow diagram (end-to-end)
13. New files and folder structure (services/)
14. Summary + next steps

Design: dark background (#0f0f1a), purple/blue accent colors.
Code blocks with syntax highlighting. Arrow flow diagrams.
Target audience: React bootcamp students (intermediate level).

Key code snippets to include:
- .env: REACT_APP_API_URL=http://localhost:3003
- config.ts: export const serverApi = process.env.REACT_APP_API_URL
- ProductService: class with axios.get and URL builder
- index.tsx: new ProductService().getProducts({...}).then(setPopularDishes)
- PopularDishes: serverApi + '/' + ele.productImages[0]
- NewDishes: sizeVolume = DRINK ? volume+'l' : size+' size'
- slice.ts: setTopUsers rename
```

---

*Fayl yaratildi: 2026-07-21 | Loyiha: BURAK Restaurant App*
