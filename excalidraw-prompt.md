# Excalidraw Data Flow Diagram — Prompt

Quyidagi promptni Claude browser extension ga yoki Excalidraw AI ga bering:

---

## PROMPT (copy-paste qiling):

```
Draw a detailed Excalidraw data flow diagram for a React + Redux Toolkit + TypeScript restaurant app called "Burak".

## LAYOUT
Arrange files in a grid layout left to right, top to bottom:

ROW 1 (top): [store.ts] ←→ [productsPage/slice.ts] ←→ [homePage/slice.ts]
ROW 2:       [productsPage/selector.ts] ←→ [homePage/selector.ts]
ROW 3:       [ProductService.ts] → [BACKEND BOX] ← [MemberService.ts]
ROW 4:       [Products.tsx] ←→ [ChosenProduct.tsx] ←→ [homePage/index.tsx]
ROW 5:       [productsPage/index.tsx (Router)]
ROW 6:       [App.tsx] ←→ [useBasket.ts] ←→ [localStorage]
ROW 7:       [HomeNavbar.tsx] ←→ [OtherNavbar.tsx] ←→ [Basket.tsx]
ROW 8 (bottom): [auth/index.tsx]

Place a large box labeled "🌐 BACKEND (localhost:3003)" in the center-right of ROW 3.

---

## FILE BOXES STYLE
- Each file = rounded rectangle
- File name as title (bold, top)
- Show key code snippet inside (monospace font, small)a
- Colors:
  - Service files (ProductService, MemberService): green border
  - Redux files (slice, selector, store): purple border
  - React components (Products, ChosenProduct, etc): cyan border
  - Custom hooks (useBasket): orange border
  - Auth: yellow border
  - Backend: dark box, white text

---

## FILE CONTENTS (show inside each box)

### store.ts (purple border)
```

configureStore({
reducer: {
homePage: HomePageReducer,
productsPage: ProductPageReducer
}
})

```

### productsPage/slice.ts (purple border)
```

setProducts: (state, action) => {
// 🟣 STAGE 6
state.products = action.payload
}
setChosenProducts: (state, action) => {...}
setRestaurant: (state, action) => {...}

```

### productsPage/selector.ts (purple border)
```

selectProductsPage = (state) => state.productsPage
// 🔍 STAGE 7
retrieveProducts = createSelector(
selectProductsPage,
(page) => page.products
)
retriveChoosenProduct = createSelector(...)
retriveRestaurant = createSelector(...)

```

### homePage/slice.ts (purple border)
```

setPopularDishes: (state, action) => {
state.popularDishes = action.payload
}
setNewDishes: (state, action) => {...}
setTopUsers: (state, action) => {...}

```

### homePage/selector.ts (purple border)
```

retrievePopularDishes = createSelector(...)
retrieveNewDishes = createSelector(...)
retrieveTopUsers = createSelector(...)

```

### ProductService.ts (green border)
```

// 🔵 STAGE 2: so'rov ketdi
async getProducts(input): Promise<Product[]> {
const url = `${serverApi}/product/all?
    order=${input.order}&page=${input.page}`
const result = await axios.get(url)
// 🟢 STAGE 3: javob keldi
return result.data
}
async getProduct(id): Promise<Product> {
axios.get(url, { withCredentials: true })
return result.data
}

```

### MemberService.ts (green border)
```

async signup(input): Promise<Member> {
axios.post('/member/signup', input,
{ withCredentials: true })
localStorage.setItem('memberData', ...)
return member
}
async getRestaurant(): Promise<Member> {...}
async getTopUsers(): Promise<Member[]> {...}

```

### Products.tsx (cyan border)
```

// 🔍 STAGE 8
const productsRetriever = createSelector(
retrieveProducts, (products) => ({ products })
)
// 🖥️ STAGE 9: render
export default function Products(props) {
const { products } = useSelector(productsRetriever)
const { setProducts } = actionDispatch(dispatch)

// 🟢 DIDMOUNT
useEffect(() => { return () => WILLUNMOUNT }, [])

// 🟡 STAGE 1: useEffect fired
useEffect(() => {
ProductService.getProducts(productSearch)
// 🟢 STAGE 4: data arrived
.then(data => {
// 🟢 STAGE 5: dispatching
setProducts(data)
})
}, [productSearch])
}

```

### ChosenProduct.tsx (cyan border)
```

export default function ChosenProduct(props) {
const { productId } = useParams()
useEffect(() => {
ProductService.getProduct(productId)
.then(data => setChosenProducts(data))
MemberService.getRestaurant()
.then(data => setRestaurant(data))
}, [])
if (!chosenProducts) return null
return <Swiper>...</Swiper>
}

```

### homePage/index.tsx (cyan border)
```

export default function HomePage() {
const { setPopularDishes,
setNewDishes, setTopUsers }
= actionDispatch(useDispatch())

useEffect(() => {
ProductService.getProducts({order:'productViews'})
.then(data => setPopularDishes(data))
ProductService.getProducts({order:'createdAt'})
.then(data => setNewDishes(data))
MemberService.getTopUsers()
.then(data => setTopUsers(data))
}, [])
}

```

### productsPage/index.tsx — Router (cyan border, small)
```

<Switch>
  <Route path="/products/:productId">
    <ChosenProduct />
  </Route>
  <Route path="/products">
    <Products />
  </Route>
</Switch>
```

### App.tsx (cyan border)

```
const { cartItem, onAdd,
        onRemove, onDelete,
        onDeleteAll } = useBasket()

const [signupOpen, setSignupOpen] = useState(false)
const [loginOpen, setLoginOpen] = useState(false)

<HomeNavbar cartItems={cartItem} onAdd={onAdd} .../>
<OtherNavbar cartItems={cartItem} onAdd={onAdd} .../>
<ProductsPage onAdd={onAdd} />
<AuthenticationModal
  signupOpen={signupOpen}
  loginOpen={loginOpen} />
```

### useBasket.ts (orange border)

```
const useBasket = () => {
  const cartJson = localStorage.getItem('cartData')
  const [cartItem, setCartItem] = useState(currentCart)

  const onAdd = (input) => {
    const exist = cartItem.find(i => i._id===input._id)
    if (exist) quantity + 1
    else [...cartItem, input]
    localStorage.setItem('cartData', ...)
  }
  const onRemove = (input) => { quantity - 1 }
  const onDelete = (input) => { filter by _id }
  const onDeleteAll = () => { setCartItem([]) }

  return { cartItem, onAdd, onRemove,
           onDelete, onDeleteAll }
}
```

### Basket.tsx (cyan border)

```
BasketProps: {
  cartItems, onAdd, onRemove,
  onDelete, onDeleteAll
}
itemsPrice = cartItems.reduce(
  (a,c) => a + c.quantity * c.price, 0)
shippingCost = itemsPrice < 100 ? 5 : 0
totalPrice = (itemsPrice + shippingCost).toFixed(1)
```

### HomeNavbar.tsx / OtherNavbar.tsx (cyan border)

```
props: {
  cartItems, onAdd, onRemove,
  onDelete, onDeleteAll,
  setSignupOpen, setLoginOpen
}
<Basket cartItems={cartItems} onAdd={onAdd} .../>
onClick={() => setLoginOpen(true)}   → Login
onClick={() => setSignupOpen(true)}  → Sign Up
```

### auth/index.tsx (yellow border)

```
const [memberNick, setMemberNick] = useState('')
const [memberPhone, setMemberPhone] = useState('')
const [memberPassword, setMemberPassword] = useState('')

handleSignupRequest = async () => {
  MemberService.signup({ memberNick,
    memberPassword, memberPhone })
  handleSignupClose()
}
<Modal open={signupOpen}>Signup Form</Modal>
<Modal open={loginOpen}>Login Form</Modal>
```

---

## ARROWS — PRODUCTS PAGE FLOW (9 STAGES)

Draw these arrows with labels. Each label = "STAGE N: action — purpose":

1. Arrow: Products.tsx → ProductService.ts
   Label: "🟡 STAGE 1: useEffect — productSearch o'zgardi, API call boshlanadi"
   Color: yellow, dashed

2. Arrow: ProductService.ts → BACKEND
   Label: "🔵 STAGE 2: axios.get(url) — HTTP GET so'rov yuborildi"
   Color: blue, solid

3. Arrow: BACKEND → ProductService.ts
   Label: "🟢 STAGE 3: result.data — backend [Kebab, Steak] qaytardi"
   Color: green, solid

4. Arrow: ProductService.ts → Products.tsx
   Label: "🟢 STAGE 4: .then(data) — data komponentga yetib keldi"
   Color: green, solid

5. Arrow: Products.tsx → productsPage/slice.ts
   Label: "🟢 STAGE 5: dispatch(setProducts(data)) — Redux ga yuborildi"
   Color: green, solid

6. Arrow: productsPage/slice.ts → store.ts
   Label: "🟣 STAGE 6: Reducer — state.products = data yangilandi"
   Color: purple, solid

7. Arrow: store.ts → productsPage/selector.ts
   Label: "🔍 STAGE 7: retrieveProducts — store dan products o'qildi"
   Color: purple, dashed

8. Arrow: productsPage/selector.ts → Products.tsx
   Label: "🔍 STAGE 8: useSelector — { products } komponentga qaytdi"
   Color: cyan, solid

9. Arrow: Products.tsx → [BROWSER/SCREEN box]
   Label: "🖥️ STAGE 9: render — products.map() → product cardlar ekranda"
   Color: cyan, bold

---

## ARROWS — CHOSEN PRODUCT FLOW

10. Arrow: productsPage/index.tsx → ChosenProduct.tsx
    Label: "Route: /products/:productId — useParams → productId"
    Color: orange

11. Arrow: ChosenProduct.tsx → ProductService.ts
    Label: "getProduct(productId) — withCredentials: true"
    Color: green, dashed

12. Arrow: ChosenProduct.tsx → MemberService.ts
    Label: "getRestaurant() — parallel call"
    Color: green, dashed

13. Arrow: MemberService.ts → BACKEND
    Label: "axios.get + Cookie — backend kim ekanligini biladi"
    Color: green

14. Arrow: ChosenProduct.tsx → productsPage/slice.ts (two arrows)
    Label 1: "dispatch(setChosenProducts(data))"
    Label 2: "dispatch(setRestaurant(data))"
    Color: purple

---

## ARROWS — HOMEPAGE FLOW

15. Arrow: homePage/index.tsx → ProductService.ts (two arrows)
    Label 1: "getProducts({order:'productViews'}) → PopularDishes"
    Label 2: "getProducts({order:'createdAt'}) → NewDishes"
    Color: green, dashed

16. Arrow: homePage/index.tsx → MemberService.ts
    Label: "getTopUsers() → ActiveUsers"
    Color: green, dashed

17. Arrow: homePage/index.tsx → homePage/slice.ts (three arrows)
    Label 1: "dispatch(setPopularDishes(data))"
    Label 2: "dispatch(setNewDishes(data))"
    Label 3: "dispatch(setTopUsers(data))"
    Color: purple

18. Arrow: homePage/slice.ts → store.ts
    Label: "Reducer — state yangilandi"
    Color: purple

19. Arrow: store.ts → homePage/selector.ts
    Label: "createSelector — store dan o'qildi"
    Color: purple, dashed

---

## ARROWS — BASKET FLOW

20. Arrow: App.tsx → useBasket.ts
    Label: "useBasket() chaqirildi — cartItem, onAdd, ... olindi"
    Color: orange, bold

21. Arrow: useBasket.ts ↔ localStorage
    Label: "read: getItem('cartData') | write: setItem('cartData')"
    Color: orange, bidirectional

22. Arrow: App.tsx → HomeNavbar.tsx
    Label: "props: cartItems={cartItem}, onAdd, onRemove, ..."
    Color: cyan

23. Arrow: App.tsx → OtherNavbar.tsx
    Label: "props: cartItems={cartItem}, onAdd, onRemove, ..."
    Color: cyan

24. Arrow: HomeNavbar.tsx → Basket.tsx
    Label: "props: cartItems, onAdd, onRemove, onDelete, onDeleteAll"
    Color: cyan

25. Arrow: OtherNavbar.tsx → Basket.tsx
    Label: "props: cartItems, onAdd, onRemove, onDelete, onDeleteAll"
    Color: cyan

26. Arrow: App.tsx → productsPage/index.tsx
    Label: "props: onAdd={onAdd}"
    Color: cyan

27. Arrow: productsPage/index.tsx → Products.tsx
    Label: "props: onAdd={onAdd}"
    Color: cyan

28. Arrow: productsPage/index.tsx → ChosenProduct.tsx
    Label: "props: onAdd={onAdd}"
    Color: cyan

---

## ARROWS — AUTH FLOW

29. Arrow: HomeNavbar.tsx → App.tsx
    Label: "setSignupOpen(true) / setLoginOpen(true) — modal ochiladi"
    Color: yellow

30. Arrow: App.tsx → auth/index.tsx
    Label: "props: signupOpen, loginOpen, handleSignupClose, handleLoginClose"
    Color: yellow

31. Arrow: auth/index.tsx → MemberService.ts
    Label: "handleSignupRequest → MemberService.signup(input)"
    Color: yellow, dashed

32. Arrow: MemberService.ts → BACKEND
    Label: "POST /member/signup — withCredentials: true"
    Color: green

33. Arrow: MemberService.ts → localStorage
    Label: "localStorage.setItem('memberData', member)"
    Color: orange

---

## STAGE NUMBER BADGES

Above each relevant code line in the file boxes, add a small colored circle with the stage number:

- Stage 1: 🟡 yellow badge
- Stage 2: 🔵 blue badge
- Stage 3-5: 🟢 green badge
- Stage 6-7: 🟣 purple badge
- Stage 8: 🔍 cyan badge
- Stage 9: 🖥️ dark badge
- DIDMOUNT: green badge with "DM"
- WILLUNMOUNT: red badge with "WU"

---

## EXTRA ELEMENTS

Add a legend box (bottom right):

```
LEGEND:
🟣 Redux flow
🟢 API / Service flow
🔵 HTTP Request
🟡 useEffect trigger
🔍 Selector / useSelector
🖥️ Render / UI
🟠 Custom Hook / localStorage
🟡 Auth flow
```

Add title (top center):
"Burak Restaurant App — Full Data Flow
React + Redux Toolkit + TypeScript
(Jul 24-25-27 · Excluding Jul 28)"

---

## STYLE NOTES

- Use hand-drawn style (Excalidraw default)
- Arrow labels: small font, italic
- Stage badges: bold, colored circle
- File boxes: large enough to show code
- Overall canvas: very wide (landscape)
- Group each "flow" with a light background rectangle:
  - Products flow: light blue background
  - Basket flow: light orange background
  - Auth flow: light yellow background
  - HomePage flow: light green background

```

---

*Bu promptni Claude browser extension → Excalidraw canvas ga paste qiling*
```
