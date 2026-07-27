# 27 July — PPT Prompts
> Har bir blok = bitta slide uchun tayyor prompt.
> Gamma.app, Beautiful.ai yoki boshqa AI presentation tool ga to'g'ridan-to'g'ri ko'chirish mumkin.

---

## SLIDE 1 — Sarlavha

**Prompt:**
```
Create a title slide for a technical presentation.
Title: "27 July — Basket System & Data Flow Tracing"
Subtitle: "Burak Restaurant App · React + TypeScript + Redux Toolkit"
Bottom line: "useBasket Custom Hook · localStorage · Prop Drilling · 9-Stage Console Tracing"
Style: dark background, code/terminal aesthetic, purple and cyan accents.
```

---

## SLIDE 2 — Kun xulosasi (Overview)

**Prompt:**
```
Create a "What we built today" overview slide with two main sections side by side.

Left section title: "🛒 Basket System"
Left bullets:
  • useBasket.ts — Custom React Hook
  • localStorage — ma'lumotlar saqlanadi (browser yopilsa ham qoladi)
  • Prop Drilling — App.tsx dan Basket.tsx gacha
  • onAdd / onRemove / onDelete / onDeleteAll

Right section title: "🔍 Data Flow Tracing"
Right bullets:
  • 9 ta console.log stage qo'shildi
  • Backend → ProductService → Redux → UI ketma-ketligi ko'rindi
  • DIDMOUNT / WILLUNMOUNT lifecycle kuzatildi

Bottom note: "2 major commit: feat: adding products to basket | fix: basket business logic via HOOKs"
```

---

## SLIDE 3 — Basket Arxitekturasi (Architecture Diagram)

**Prompt:**
```
Create a vertical architecture / data flow diagram showing React component tree and data flow for a shopping basket feature.

Show this hierarchy with arrows:

TOP: App.tsx
  → calls: useBasket() hook
  → has state: cartItem: CartItem[]
  → has functions: onAdd, onRemove, onDelete, onDeleteAll

App.tsx branches into TWO paths (show as two columns):

LEFT PATH (Navigation):
  App.tsx → HomeNavbar.tsx → Basket.tsx
  App.tsx → OtherNavbar.tsx → Basket.tsx
  Note: "Navbar har sahifada ko'rinadi"
  Basket.tsx shows: cart icon with badge, dropdown menu, item list, total price

RIGHT PATH (Product Pages):
  App.tsx → ProductsPage → Products.tsx (onAdd prop)
  App.tsx → ProductsPage → ChosenProduct.tsx (onAdd prop)
  Note: "Product cardda 'Add to Basket' tugmasi"

Bottom: localStorage
  Note: "cartData key bilan saqlanadi — sahifa yopilsa ham qoladi"

Use purple arrows for data flow, cyan boxes for components, green box for localStorage.
```

---

## SLIDE 4 — useBasket Custom Hook

**Prompt:**
```
Create a code explanation slide for a custom React hook called useBasket.

Title: "useBasket.ts — Custom Hook"
Subtitle: "src/app/hooks/useBasket.ts"

Show this code snippet (syntax highlighted):
---
const useBasket = () => {
  const cartJson = localStorage.getItem('cartData');
  const currentCart = cartJson ? JSON.parse(cartJson) : [];
  const [cartItem, setCartItem] = useState<CartItem[]>(currentCart);

  const onAdd = (input: CartItem) => {
    const exist = cartItem.find(item => item._id === input._id);
    if (exist) {
      // quantity + 1
    } else {
      // yangi item qo'shish
    }
    localStorage.setItem('cartData', JSON.stringify(cartUpdate));
  };

  return { cartItem, onAdd, onRemove, onDelete, onDeleteAll };
};
---

Right side — explain 4 functions in a table:
| Funksiya    | Nima qiladi                              |
|-------------|------------------------------------------|
| onAdd       | Item yo'q → qo'shadi, bor → quantity+1  |
| onRemove    | quantity > 1 → -1, = 1 → o'chiradi      |
| onDelete    | Itemni to'liq o'chiradi                  |
| onDeleteAll | Butun basketni tozalaydi                 |

Bottom note: "Hook = state + logic bitta joyda. Komponentdan ajratilgan."
```

---

## SLIDE 5 — localStorage: Ma'lumot Qanday Saqlanadi

**Prompt:**
```
Create an explainer slide about localStorage persistence in a shopping cart.

Title: "localStorage — Brauzer Xotirasi"

Show a before/after visual:

LEFT (User adds Kebab to cart):
  onAdd({ _id: "abc123", name: "Kebab", price: 12, quantity: 1 })
  ↓
  localStorage.setItem('cartData', '[{"_id":"abc123","name":"Kebab","price":12,"quantity":1}]')

CENTER (Browser DevTools visual — Application → localStorage):
  Key:   cartData
  Value: [{"_id":"abc123","name":"Kebab","price":12,"quantity":2}]

RIGHT (Page refresh — component mounts):
  const cartJson = localStorage.getItem('cartData')
  const currentCart = JSON.parse(cartJson)  → [Kebab x2]
  useState(currentCart)  → basket restored!

Key comparison table:
| Xususiyat       | localStorage    | Redux Store  |
|-----------------|-----------------|--------------|
| Sahifa yopilsa  | Saqlanadi ✅    | O'chadi ❌   |
| Hajm            | ~5MB            | Cheksiz      |
| Qayerda         | Brauzer diskida | RAM da       |
| Ishlatish joyi  | Basket, settings| UI state     |

Bottom: "useBasket har mount bo'lganda localStorage dan o'qiydi → basket tiklanadi"
```

---

## SLIDE 6 — Prop Drilling Zanjiri

**Prompt:**
```
Create a "prop drilling" diagram slide showing how data flows from parent to child components.

Title: "Prop Drilling — App.tsx dan Basket.tsx gacha"

Show a vertical chain diagram with code labels on arrows:

[App.tsx]
  useBasket() → { cartItem, onAdd, onRemove, onDelete, onDeleteAll }
  │
  ├─── cartItems={cartItem}  ──────────────────────────────────┐
  │    onAdd={onAdd}                                           │
  │    onRemove={onRemove}                                     │
  │    onDelete={onDelete}                ↓                    ↓
  │    onDeleteAll={onDeleteAll}    [HomeNavbar]         [OtherNavbar]
  │                                       │                    │
  │                                  <Basket                <Basket
  │                                   cartItems={cartItems}   .../>
  │                                   onAdd={onAdd} />
  │
  └─── onAdd={onAdd} ──────────────────────────────────────────┐
                                                               ↓
                                                       [ProductsPage]
                                                               │
                                                          onAdd={onAdd}
                                                               │
                                                    ┌──────────┴────────────┐
                                                    ↓                       ↓
                                             [Products.tsx]        [ChosenProduct.tsx]
                                             "Add To Basket"       "Add To Basket"
                                              button card           button detail

Bottom note: "Prop drilling = state yuqorida (App.tsx), funksiyalar pastga uzatiladi. Bu pattern kichik loyihalarda ishlaydi."
```

---

## SLIDE 7 — onAdd Flow: Foydalanuvchi + bosadi

**Prompt:**
```
Create a step-by-step user interaction flow diagram.

Title: "Foydalanuvchi 'Add To Basket' bosganida nima sodir bo'ladi?"

Show 6 sequential steps with icons:

Step 1 🖱️  User clicks "Add To Basket" on product card (Products.tsx)
            Code: onClick={() => onAdd({ _id, name, price, image, quantity: 1 })}

Step 2 ⚙️  useBasket.onAdd(item) runs (useBasket.ts)
            Checks: item already in cart? (find by _id)

Step 3 🔀  Two branches:
            YES (exists) → quantity + 1
            NO (new)     → [...cartItem, newItem]

Step 4 💾  localStorage.setItem('cartData', JSON.stringify(cartUpdate))
            Data saved to browser storage

Step 5 🔄  setCartItem(cartUpdate) → React state updates → App.tsx re-renders

Step 6 🛒  Basket.tsx receives new cartItems prop
            Badge count increases
            Item appears in dropdown menu

Style: numbered steps with connecting arrows, two-branch visual at step 3.
Note at bottom: "Redux ishlatilmaydi — bu local state (useState). Redux faqat server data uchun (products, restaurant)."
```

---

## SLIDE 8 — Basket.tsx UI Tuzilmasi

**Prompt:**
```
Create a UI anatomy slide breaking down the Basket component.

Title: "Basket.tsx — UI Komponent Tuzilmasi"
Subtitle: "src/app/components/headers/Basket.tsx"

Left side: Show a wireframe/mockup of the basket UI:
  [🛒 badge:2]  ← IconButton + Badge (badgeContent={cartItems.length})
       ↓ click
  ┌─────────────────────┐
  │ Cart Products  🗑️   │  ← onDeleteAll()
  ├─────────────────────┤
  │ ✕ [img] Kebab       │  ← onDelete(item)
  │ $12 x 2             │
  │ [−] [+]             │  ← onRemove / onAdd
  ├─────────────────────┤
  │ Total: $24 (24+0)   │
  │ [🛒 Order]          │
  └─────────────────────┘

Right side — explain logic:
  • itemsPrice = cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  • shippingCost = itemsPrice < 100 ? 5 : 0
  • totalPrice = (itemsPrice + shippingCost).toFixed(1)
  
  Shipping logic table:
  | Cart total | Shipping | Total   |
  |------------|----------|---------|
  | $80        | + $5     | $85     |
  | $100+      | FREE ✅  | $100    |

  MUI Components used:
  • IconButton + Badge → cart icon
  • Menu → dropdown panel
  • CancelIcon → delete item
  • DeleteForeverIcon → clear all
```

---

## SLIDE 9 — 9 Stage Data Flow Tracing

**Prompt:**
```
Create a data flow tracing slide showing 9 console.log stages.

Title: "9-Stage Console Tracing — Backend → Browser"
Subtitle: "Qaysi fayl qaysi bosqichda ishlashini ko'rish uchun qo'shildi"

Show a horizontal pipeline / timeline with 9 nodes:

STAGE 1 🟡
File: Products.tsx
Where: useEffect
Log: "useEffect ishga tushdi → productSearch o'zgardi"

→ STAGE 2 🔵
File: ProductService.ts
Where: getProducts() — before axios.get
Log: "Backend ga HTTP so'rov ketdi: [URL]"

→ STAGE 3 🟢
File: ProductService.ts
Where: getProducts() — after axios.get
Log: "Backend javob berdi! result.status: 200"

→ STAGE 4 🟢
File: Products.tsx
Where: .then(data => ...)
Log: "Data komponentga yetib keldi! Mahsulotlar soni: 3"

→ STAGE 5 🟢
File: Products.tsx
Where: before setProducts(data)
Log: "dispatch → setProducts chaqirilmoqda..."

→ STAGE 6 🟣
File: slice.ts
Where: setProducts reducer
Log: "Redux Reducer ishga tushdi! Yangi products: [...]"

→ STAGE 7 🔍
File: selector.ts
Where: retrieveProducts
Log: "Selector — store dan products o'qilyapti"

→ STAGE 8 🔍
File: Products.tsx
Where: productsRetriever
Log: "useSelector yangi products qaytardi: 3 ta mahsulot"

→ STAGE 9 🖥️
File: Products.tsx
Where: render body (before return)
Log: "Products component RENDER bo'ldi → products.length = 3"

Bottom: two special stages:
🟢 DIDMOUNT   → Products.tsx useEffect([])  → faqat birinchi mount da
🔴 WILLUNMOUNT → Products.tsx return () =>  → sahifadan chiqqanda
```

---

## SLIDE 10 — React Lifecycle: DIDMOUNT / WILLUNMOUNT

**Prompt:**
```
Create a React lifecycle explainer slide comparing class and functional components.

Title: "React Lifecycle — Functional Component"

Show side-by-side comparison:

LEFT (Class Component — eski usul):
class Products extends Component {
  componentDidMount() {
    // API call
  }
  componentWillUnmount() {
    // cleanup
  }
}

RIGHT (Functional Component — bizning kod):
useEffect(() => {
  console.log("🟢 DIDMOUNT — mounted");
  return () => {
    console.log("🔴 WILLUNMOUNT — unmounted");
  };
}, []); // ← bo'sh array = faqat bir marta

Lifecycle timeline visual:
[Component yaratildi] → DIDMOUNT fires → [Component hayot] → [Sahifa o'zgardi] → WILLUNMOUNT fires → [Component yo'q]

IMPORTANT note box (orange):
"⚠️ React StrictMode (CRA default):
Development rejimda lifecycle IKKI MARTA ishlaydi:
DIDMOUNT → WILLUNMOUNT → DIDMOUNT
Bu ataylab — xatolarni erta topish uchun.
Production da faqat bir marta ishlaydi."

[] dependency qoidasi table:
| useEffect(fn, ...)  | Qachon ishlaydi              |
|---------------------|------------------------------|
| []                  | Faqat mount da (1 marta)     |
| [productSearch]     | productSearch o'zgarganda    |
| (yo'q)              | Har render da                |
```

---

## SLIDE 11 — withCredentials: true nima qiladi

**Prompt:**
```
Create a short explainer slide about axios withCredentials option.

Title: "withCredentials: true — Cookie bilan so'rov"

Show two code boxes side by side:

LEFT box (getProducts — withCredentials YO'Q):
axios.get('/product/all?order=createdAt&...')
→ Cookie yuborilmaydi
→ Anonim so'rov
→ Barcha mehmonlar ko'ra oladi

RIGHT box (getProduct — withCredentials: true):
axios.get('/product/:id', { withCredentials: true })
→ Cookie (session token) ham ketadi
→ Backend: "Bu kim?" → tekshiradi
→ productViews + 1 (faqat login userlarda)

Visual diagram:
Browser          →  [HTTP GET + Cookie]  →  Backend
                 ←  [Product data]       ←
                 ↑
                 withCredentials: true

Table:
| Method        | withCredentials | Sabab                        |
|---------------|-----------------|------------------------------|
| getProducts() | ❌ false        | Barcha ko'rishi mumkin       |
| getProduct()  | ✅ true         | views tracking, auth kerak   |
```

---

## SLIDE 12 — Redux vs Local State: Qaysi ni ishlatamiz

**Prompt:**
```
Create a decision diagram slide comparing Redux and local state (useState) usage in this project.

Title: "Redux vs useState — Qayerda qaysinisi?"

Show a two-column layout:

LEFT column (🟣 Redux Store):
  Used for: Server data
  Files: slice.ts, selector.ts, store.ts
  Data:
    • state.productsPage.products  (Product[] — backenddan)
    • state.productsPage.choosenProduct  (detail sahifa)
    • state.productsPage.restaurant  (restoran info)
  Why Redux?
    → Ko'p komponent kerak bo'lganda
    → Global state
    → API data caching

RIGHT column (🔵 useState / useBasket):
  Used for: UI/local data
  Files: useBasket.ts, Products.tsx
  Data:
    • cartItem: CartItem[]  (basket — localStorage)
    • productSearch  (filter holati)
    • searchText  (input qiymati)
    • anchorEl  (dropdown holati)
  Why useState?
    → Faqat 1-2 komponentga kerak
    → UI interaction state
    → Tez va sodda

Bottom decision tree:
  "Bu data ko'p componentga kerakmi?"
    YES → Redux
    NO  → useState
  "Backend dan keladimi?"
    YES → Redux
    NO  → useState / localStorage
```

---

## SLIDE 13 — Yakuniy xulosa (Summary)

**Prompt:**
```
Create a clean summary / recap slide.

Title: "27 July — Nima o'rgandik?"

Show 5 key takeaways with icons:

1. 🛒  Custom Hook Pattern
   useBasket.ts — state + logic bitta faylda, komponentdan ajratilgan

2. 💾  localStorage Persistence
   cartData JSON sifatida saqlanadi — sahifa yopilsa ham basket saqlanadi

3. 🔗  Prop Drilling
   App.tsx (state) → Navbar → Basket va App.tsx → ProductsPage → Products

4. 🔍  Data Flow Visibility
   9 stage console.log — backend dan browserga ma'lumot qanday o'tishini ko'rdik

5. 🔄  React Lifecycle
   useEffect([]) = componentDidMount + componentWillUnmount

Bottom stats row:
  Files changed: 6 | Commits: 2 | New hook: 1 | Console stages: 9
  
Footer: "Next: Order system → authenticated requests → backend integration"
```

---

## GAMMA.APP GA YUKLASH YO'RIQNOMASI

```
1. gamma.app ga kiring → "New presentation"
2. "Generate with AI" tanlang
3. Har bir slide prompt ini alohida paste qiling
4. Yoki hammani bitta matn sifatida yuklang, har slide ## bilan ajratilgan
5. Theme: "Dark Tech" yoki "Minimal Dark" tanlang
6. Accent color: #7c4dff (purple) yoki #61dafb (cyan)
```

---

## BEAUTIFUL.AI GA YUKLASH

```
1. beautiful.ai → New Presentation → "AI Generate"
2. Outline sifatida slide sarlavhalarini kiriting
3. Har slide uchun content promptini Content panel ga paste qiling
4. Smart Slide types: Diagram, Timeline, Comparison, Code ishlatiladi
```

---

*27 July · Burak Restaurant App · React + TypeScript + Redux Toolkit + Custom Hooks*
