# Excalidraw Full Data Flow Diagram — v2 Prompt
> Yangilangan: labeled arrows (1A/2A...), flow legend textlari, Jul 28 & 30 qo'shildi

---

## PROMPT (hammasi ni copy qiling):

```
Draw a very large, detailed Excalidraw data flow diagram for "Burak Restaurant App".
Use hand-drawn style. Canvas: ultra-wide landscape (4000px+).
Each file box: minimum 320px wide, tall enough to show all code inside.

=========================================================
SECTION 1 — FILE BOXES LAYOUT
=========================================================

Arrange in 5 color-coded zone rectangles:

ZONE A (light blue, top-left):   "PRODUCTS PAGE FLOW (9 STAGES)"
ZONE B (light green, top-right): "HOMEPAGE FLOW"
ZONE C (light orange, bottom-left): "BASKET FLOW"
ZONE D (light yellow, bottom-center): "AUTH FLOW (Jul 28)"
ZONE E (light purple, bottom-right): "CONTEXT & LOGOUT FLOW (Jul 30)"

Center of canvas: Large dark box — BACKEND (localhost:3003)

---------------------------------------------------------
FILE BOX CONTENTS (wide cards, monospace font inside):
---------------------------------------------------------

### [store.ts] — purple border, wide card
```
configureStore({
  middleware: getDefaultMiddleware()
    .concat(reduxLogger),
  reducer: {
    homePage: HomePageReducer,        // ← homePage slice
    productsPage: ProductPageReducer  // ← productsPage slice
  }
})
// AppRootState = ReturnType<typeof store.getState>
```

### [productsPage/slice.ts] — purple border
```
const ProductPageSlice = createSlice({
  name: 'productsPage',
  initialState: {
    restaurant: null,
    choosenProduct: null,
    products: []
  },
  reducers: {
    // 🟣 STAGE 6
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setChosenProducts: (state, action) => {
      state.choosenProduct = action.payload
    },
    setRestaurant: (state, action) => {
      state.restaurant = action.payload
    }
  }
})
export const { setProducts,
  setChosenProducts, setRestaurant }
  = ProductPageSlice.actions
```

### [productsPage/selector.ts] — purple border
```
const selectProductsPage =
  (state: AppRootState) => state.productsPage

// 🔍 STAGE 7
export const retrieveProducts = createSelector(
  selectProductsPage,
  (page) => page.products   // memoized
)
export const retriveChoosenProduct = createSelector(
  selectProductsPage,
  (page) => page.choosenProduct
)
export const retriveRestaurant = createSelector(
  selectProductsPage,
  (page) => page.restaurant
)
```

### [homePage/slice.ts] — purple border
```
const HomePageSlice = createSlice({
  name: 'homePage',
  initialState: {
    popularDishes: [],
    newDishes: [],
    topUsers: []
  },
  reducers: {
    setPopularDishes: (state, action) => {
      state.popularDishes = action.payload
    },
    setNewDishes: (state, action) => {
      state.newDishes = action.payload
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload
    }
  }
})
```

### [homePage/selector.ts] — purple border
```
const selectHomePage =
  (state: AppRootState) => state.homePage

export const retrievePopularDishes =
  createSelector(selectHomePage,
    (hp) => hp.popularDishes)

export const retrieveNewDishes =
  createSelector(selectHomePage,
    (hp) => hp.newDishes)

export const retrieveTopUsers =
  createSelector(selectHomePage,
    (hp) => hp.topUsers)
```

### [ProductService.ts] — green border, wide card
```
class ProductService {
  private readonly path = serverApi

  // 🔵 STAGE 2: so'rov quriladi va yuboriladi
  async getProducts(input: ProductInquery)
    : Promise<Product[]> {
    let url = `${this.path}/product/all?
      order=${input.order}
      &page=${input.page}&limit=${input.limit}`
    if (input.productCollection)
      url += `&productCollection=...`
    if (input.search)
      url += `&search=${input.search}`

    const result = await axios.get(url)
    // 🟢 STAGE 3: backend javobi keldi
    return result.data  // Product[]
  }

  async getProduct(productId: string)
    : Promise<Product> {
    const url = `${this.path}/product/${productId}`
    // withCredentials: cookie yuboriladi → views+1
    const result = await axios.get(url,
      { withCredentials: true })
    return result.data
  }
}
```

### [MemberService.ts] — green border, wide card
```
class MemberService {
  // Jul 28: Signup
  async signup(input: MemberInput)
    : Promise<Member> {
    const result = await axios.post(
      '/member/signup', input,
      { withCredentials: true })
    const member = result.data.member
    localStorage.setItem('memberData',
      JSON.stringify(member))
    return member
  }

  // Jul 28: Login
  async login(input: MemberInput)
    : Promise<Member> {
    const result = await axios.post(
      '/member/login', input,
      { withCredentials: true })
    const member = result.data.member
    localStorage.setItem('memberData',
      JSON.stringify(member))
    return member
  }

  // Jul 30: Logout
  async logout(): Promise<void> {
    await axios.post('/member/logout', {},
      { withCredentials: true })
    localStorage.removeItem('memberData')
  }

  async getRestaurant(): Promise<Member> {...}
  async getTopUsers(): Promise<Member[]> {...}
}
```

### [Products.tsx] — cyan border, extra wide
```
// 🔍 STAGE 8: productsRetriever
const productsRetriever = createSelector(
  retrieveProducts,
  (products) => ({ products })
)

// actionDispatch wrapper
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data) => dispatch(setProducts(data))
})

export default function Products({ onAdd }) {
  const { products } = useSelector(productsRetriever)
  const { setProducts } = actionDispatch(dispatch)
  const [productSearch, setProductSearch] =
    useState<ProductInquery>({
      page: 1, limit: 8,
      order: 'createdAt',
      productCollection: ProductCollection.DISH,
      search: ''
    })

  // 🟢 DIDMOUNT / 🔴 WILLUNMOUNT
  useEffect(() => {
    console.log('DIDMOUNT')
    return () => console.log('WILLUNMOUNT')
  }, [])

  // 🟡 STAGE 1: API call
  useEffect(() => {
    const svc = new ProductService()
    svc.getProducts(productSearch)
      // 🟢 STAGE 4: data yetdi
      .then(data => {
        // 🟢 STAGE 5: dispatch
        setProducts(data)
      })
  }, [productSearch])

  // 🖥️ STAGE 9: render
  return products.map(p =>
    <Card onClick={() => onAdd(p)} />)
}
```

### [ChosenProduct.tsx] — cyan border
```
export default function ChosenProduct({ onAdd }) {
  const { productId } = useParams()
  const { setChosenProducts, setRestaurant }
    = actionDispatch(useDispatch())

  useEffect(() => {
    // 2 parallel API calls
    new ProductService()
      .getProduct(productId)       // withCredentials
      .then(data => setChosenProducts(data))

    new MemberService()
      .getRestaurant()
      .then(data => setRestaurant(data))
  }, [])

  if (!chosenProducts) return null
  return <Swiper>...</Swiper>
}
```

### [homePage/index.tsx] — cyan border
```
export default function HomePage() {
  const { setPopularDishes,
          setNewDishes, setTopUsers }
    = actionDispatch(useDispatch())

  useEffect(() => {
    const svc = new ProductService()
    // 3 parallel calls
    svc.getProducts({ order: 'productViews' })
      .then(data => setPopularDishes(data))

    svc.getProducts({ order: 'createdAt' })
      .then(data => setNewDishes(data))

    new MemberService().getTopUsers()
      .then(data => setTopUsers(data))
  }, [])

  return (
    <PopularDishes />  // useSelector
    <NewDishes />      // useSelector
    <ActiveUsers />    // useSelector
  )
}
```

### [productsPage/index.tsx — Router] — cyan border
```
export default function ProductsPage({ onAdd }) {
  const match = useRouteMatch()
  return (
    <Switch>
      <Route path={`${match.path}/:productId`}>
        <ChosenProduct onAdd={onAdd} />
      </Route>
      <Route path={match.path}>
        <Products onAdd={onAdd} />
      </Route>
    </Switch>
  )
}
```

### [useBasket.ts] — orange border, wide
```
const useBasket = () => {
  // localStorage dan o'qib init
  const cartJson = localStorage.getItem('cartData')
  const currentCart = cartJson
    ? JSON.parse(cartJson) : []

  const [cartItem, setCartItem] =
    useState<CartItem[]>(currentCart)

  const onAdd = (input: CartItem) => {
    const exist = cartItem.find(
      i => i._id === input._id)
    const cartUpdate = exist
      ? cartItem.map(i => i._id === input._id
          ? { ...exist, quantity: exist.quantity+1 }
          : i)
      : [...cartItem, { ...input }]
    setCartItem(cartUpdate)
    localStorage.setItem('cartData',
      JSON.stringify(cartUpdate))
  }
  const onRemove = (input) => { /* quantity-1 */ }
  const onDelete = (input) => { /* filter */ }
  const onDeleteAll = () => {
    setCartItem([])
    localStorage.removeItem('cartItem')
  }
  return { cartItem, onAdd,
           onRemove, onDelete, onDeleteAll }
}
```

### [Basket.tsx] — cyan border
```
interface BasketProps {
  cartItems: CartItem[]
  onAdd: (item: CartItem) => void
  onRemove: (item: CartItem) => void
  onDelete: (item: CartItem) => void
  onDeleteAll: () => void
}
// Price calculation
itemsPrice = cartItems.reduce(
  (a, c) => a + c.quantity * c.price, 0)
shippingCost = itemsPrice < 100 ? 5 : 0
totalPrice = (itemsPrice + shippingCost).toFixed(1)

// UI: MUI Menu dropdown
<IconButton>
  <Badge badgeContent={cartItems.length}>
    <ShoppingCartIcon />
  </Badge>
</IconButton>
<Menu open={Boolean(anchorEl)}>
  {cartItems.map(item => (
    <CancelIcon onClick={() => onDelete(item)} />
    <button onClick={() => onRemove(item)}>-</button>
    <button onClick={() => onAdd(item)}>+</button>
  ))}
  <Button>Order</Button>
</Menu>
```

### [App.tsx] — cyan border, extra wide
```
function App() {
  // Jul 27: Basket
  const { cartItem, onAdd, onRemove,
          onDelete, onDeleteAll } = useBasket()

  // Jul 28: Auth modal state
  const [signupOpen, setSignupOpen] =
    useState<boolean>(false)
  const [loginOpen, setLoginOpen] =
    useState<boolean>(false)

  // Jul 30: Context + Logout
  const { setAuthMember } = useGlobals()
  const [anchorEl, setAnchorEl] =
    useState<HTMLElement | null>(null)

  const handleLogoutRequest = async () => {
    await new MemberService().logout()
    setAuthMember(null)   // Context yangilandi
  }

  return (
    <HomeNavbar / OtherNavbar
      cartItems={cartItem}
      onAdd={onAdd} onRemove={onRemove}
      onDelete={onDelete} onDeleteAll={onDeleteAll}
      setSignupOpen={setSignupOpen}
      setLoginOpen={setLoginOpen}
      handleLogoutClick={...}
      handleLogoutRequest={handleLogoutRequest}
    />
    <ProductsPage onAdd={onAdd} />
    <AuthenticationModal
      signupOpen={signupOpen}
      loginOpen={loginOpen}
      handleSignupClose={() => setSignupOpen(false)}
      handleLoginClose={() => setLoginOpen(false)}
    />
  )
}
```

### [auth/index.tsx — Jul 28] — yellow border, extra wide
```
export default function AuthenticationModal(props) {
  const { signupOpen, loginOpen,
          handleSignupClose, handleLoginClose } = props

  // State: form ma'lumotlari
  const [memberNick, setMemberNick] = useState('')
  const [memberPhone, setMemberPhone] = useState('')
  const [memberPassword, setMemberPassword] = useState('')

  // Jul 30: Context dan setAuthMember olindi
  const { setAuthMember } = useGlobals()

  // Jul 28: Signup
  const handleSignupRequest = async () => {
    const isFullfill = memberNick !== ''
      && memberPhone !== '' && memberPassword !== ''
    if (!isFullfill) throw new Error(Messages.error3)

    const result = await new MemberService().signup({
      memberNick, memberPassword, memberPhone })

    setAuthMember(result)   // Context yangilandi
    handleSignupClose()
  }

  // Jul 28: Login
  const handleLoginRequest = async () => {
    const result = await new MemberService().login({
      memberNick, memberPassword, memberPhone: '' })

    setAuthMember(result)   // Context yangilandi
    handleLoginClose()
  }

  // Enter tugmasi handler
  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter' && signupOpen)
      handleSignupRequest()
    else if (e.key === 'Enter' && loginOpen)
      handleLoginRequest()
  }

  return (
    <Modal open={signupOpen}>Signup Form</Modal>
    <Modal open={loginOpen}>Login Form</Modal>
  )
}
```

### [context/ContextProvider.tsx — Jul 30] — light purple border, wide
```
// GlobalContext yaratildi
export const GlobalContext =
  createContext<GlobalInterface | undefined>(undefined)

interface GlobalInterface {
  authMember: Member | null
  setAuthMember: (member: Member | null) => void
}

const ContextProvider = ({ children }) => {
  const cookies = new Cookies()

  // Token yo'q → localStorage tozalanadi
  if (cookies.get('accessToken'))
    localStorage.removeItem('memberData')

  // localStorage dan member o'qiladi (persistence)
  const [authMember, setAuthMember] =
    useState<Member | null>(
      localStorage.getItem('memberData')
        ? JSON.parse(localStorage.getItem('memberData'))
        : null
    )

  return (
    <GlobalContext.Provider
      value={{ authMember, setAuthMember }}>
      {children}   // ← App va barcha tree shu yerda
    </GlobalContext.Provider>
  )
}
```

### [hooks/useGlobals.ts — Jul 30] — light purple border
```
export const GlobalContext =
  createContext<GlobalInterface | undefined>(undefined)

export const useGlobals = () => {
  const context = useContext(GlobalContext)

  // Provider tashqarisida ishlatilsa xato
  if (context === undefined)
    throw new Error('useGlobals within Provider')

  return context
  // qaytaradi: { authMember, setAuthMember }
}

// Ishlatish:
// const { authMember, setAuthMember } = useGlobals()
// → har qaysi komponentda Context dan olish mumkin
```

### [HomeNavbar.tsx / OtherNavbar.tsx — Jul 30] — cyan border
```
export default function HomeNavbar(props) {
  const { cartItems, onAdd, onRemove,
          setSignupOpen, setLoginOpen,
          handleLogoutClick, anchorEl,
          handleCloseLogout,
          handleLogoutRequest } = props

  // Jul 30: Context dan authMember olindi
  const { authMember } = useGlobals()

  return (
    // authMember bor → avatar ko'rinadi
    // authMember yo'q → Login/Signup tugmalar
    {!authMember ? (
      <Button onClick={() => setLoginOpen(true)}>
        Login
      </Button>
    ) : (
      <img onClick={handleLogoutClick}
        src={authMember.memberImage || default} />
    )}

    // Logout dropdown (MUI Menu)
    <Menu open={Boolean(anchorEl)}>
      <MenuItem onClick={handleLogoutRequest}>
        <LogoutIcon /> Logout
      </MenuItem>
    </Menu>

    {!authMember && (
      <Button onClick={() => setSignupOpen(true)}>
        SIGN UP
      </Button>
    )}
  )
}
```

### [index.tsx — Root] — grey border
```
root.render(
  <React.StrictMode>
    <Provider store={store}>        // Redux
      <ContextProvider>             // Jul 30: Global Context
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router>
            <App />
          </Router>
        </ThemeProvider>
      </ContextProvider>
    </Provider>
  </React.StrictMode>
)
```

### [localStorage] — dark green box
```
Keys:
  'cartData'   → CartItem[] (JSON)
  'memberData' → Member (JSON)

Set:
  useBasket.onAdd()   → 'cartData'
  MemberService.signup/login → 'memberData'

Get:
  useBasket init      → 'cartData'
  ContextProvider init → 'memberData'

Remove:
  useBasket.onDeleteAll() → 'cartItem'
  MemberService.logout()  → 'memberData'
```

### [BROWSER / SCREEN] — dark box
```
products.map() → product cards
authMember ?
  → avatar (logged in)
  → Login/Signup (guest)
cartItems.length → badge count
```

=========================================================
SECTION 2 — LABELED ARROWS
=========================================================

Har bir flow uchun alohida harf prefiksi:
A = Products Page (9 stages)
B = ChosenProduct
C = HomePage
D = Basket
E = Signup (Jul 28)
F = Login (Jul 28)
G = Logout & Context (Jul 30)

---------------------------------------------------------
FLOW A — Products Page (ZONE A, blue arrows)
---------------------------------------------------------

Arrow 1A: Products.tsx → ProductService.ts
  Label: "1A: useEffect([productSearch]) fired"
  Style: yellow dashed arrow

Arrow 2A: ProductService.ts → BACKEND
  Label: "2A: axios.get(url) — HTTP GET yuborildi"
  Style: blue solid arrow

Arrow 3A: BACKEND → ProductService.ts
  Label: "3A: result.data — [Kebab,Steak...] keldi"
  Style: green solid arrow

Arrow 4A: ProductService.ts → Products.tsx
  Label: "4A: .then(data) — data komponentga yetdi"
  Style: green solid arrow

Arrow 5A: Products.tsx → productsPage/slice.ts
  Label: "5A: dispatch(setProducts(data))"
  Style: purple solid arrow

Arrow 6A: productsPage/slice.ts → store.ts
  Label: "6A: Reducer — state.products = data"
  Style: purple solid arrow

Arrow 7A: store.ts → productsPage/selector.ts
  Label: "7A: retrieveProducts — store dan o'qildi"
  Style: purple dashed arrow

Arrow 8A: productsPage/selector.ts → Products.tsx
  Label: "8A: useSelector — { products } qaytdi"
  Style: cyan solid arrow

Arrow 9A: Products.tsx → BROWSER/SCREEN
  Label: "9A: render — products.map() → cardlar"
  Style: cyan bold arrow

---------------------------------------------------------
FLOW B — ChosenProduct (green arrows)
---------------------------------------------------------

Arrow 1B: productsPage/index.tsx → ChosenProduct.tsx
  Label: "1B: Route /products/:id — useParams → productId"

Arrow 2B: ChosenProduct.tsx → ProductService.ts
  Label: "2B: getProduct(id) — withCredentials: true"
  Style: green dashed

Arrow 3B: ChosenProduct.tsx → MemberService.ts
  Label: "3B: getRestaurant() — parallel call"
  Style: green dashed

Arrow 4B: ProductService.ts → BACKEND
  Label: "4B: GET /product/:id + Cookie → views+1"

Arrow 5B: productsPage/slice.ts ← ChosenProduct.tsx (two arrows labeled)
  Label 5B-i:  "5B-i: dispatch(setChosenProducts(data))"
  Label 5B-ii: "5B-ii: dispatch(setRestaurant(data))"
  Style: purple

Arrow 6B: productsPage/selector.ts → ChosenProduct.tsx
  Label: "6B: useSelector → chosenProducts, restaurant"

---------------------------------------------------------
FLOW C — HomePage (teal arrows)
---------------------------------------------------------

Arrow 1C: homePage/index.tsx → ProductService.ts
  Label: "1C-i: getProducts({order:'productViews'}) → Popular"
  Label: "1C-ii: getProducts({order:'createdAt'}) → New"
  Style: teal dashed (two parallel arrows)

Arrow 2C: homePage/index.tsx → MemberService.ts
  Label: "2C: getTopUsers() → ActiveUsers"
  Style: teal dashed

Arrow 3C: homePage/slice.ts ← homePage/index.tsx
  Label: "3C-i: dispatch(setPopularDishes)"
  Label: "3C-ii: dispatch(setNewDishes)"
  Label: "3C-iii: dispatch(setTopUsers)"
  Style: purple

Arrow 4C: homePage/slice.ts → store.ts
  Label: "4C: Reducer — state yangilandi"
  Style: purple

Arrow 5C: homePage/selector.ts → homePage/index.tsx
  Label: "5C: useSelector → PopularDishes, NewDishes, ActiveUsers"
  Style: teal

---------------------------------------------------------
FLOW D — Basket (orange arrows)
---------------------------------------------------------

Arrow 1D: App.tsx → useBasket.ts
  Label: "1D: useBasket() chaqirildi — cartItem va funksiyalar olindi"
  Style: orange bold

Arrow 2D: useBasket.ts ↔ localStorage
  Label: "2D: init: getItem('cartData') | write: setItem('cartData')"
  Style: orange bidirectional

Arrow 3D: App.tsx → HomeNavbar.tsx
  Label: "3D: props — cartItems, onAdd, onRemove, onDelete, onDeleteAll"
  Style: orange

Arrow 4D: App.tsx → OtherNavbar.tsx
  Label: "4D: props — cartItems, onAdd, onRemove, onDelete, onDeleteAll"
  Style: orange

Arrow 5D: HomeNavbar.tsx → Basket.tsx
  Label: "5D: props — cartItems, onAdd, onRemove, onDelete, onDeleteAll"
  Style: orange

Arrow 6D: OtherNavbar.tsx → Basket.tsx
  Label: "6D: props — cartItems, onAdd, onRemove, onDelete, onDeleteAll"
  Style: orange

Arrow 7D: App.tsx → productsPage/index.tsx
  Label: "7D: props — onAdd={onAdd}"
  Style: orange dashed

Arrow 8D: Basket.tsx → BROWSER/SCREEN
  Label: "8D: badge+1, item list, total price yangilandi"
  Style: orange bold

---------------------------------------------------------
FLOW E — Signup (Jul 28) (yellow arrows)
---------------------------------------------------------

Arrow 1E: HomeNavbar.tsx → App.tsx
  Label: "1E: onClick → setSignupOpen(true)"
  Style: yellow

Arrow 2E: App.tsx → auth/index.tsx
  Label: "2E: props — signupOpen=true, handleSignupClose"
  Style: yellow

Arrow 3E: auth/index.tsx → MemberService.ts
  Label: "3E: handleSignupRequest → MemberService.signup(input)"
  Style: yellow dashed

Arrow 4E: MemberService.ts → BACKEND
  Label: "4E: POST /member/signup — {memberNick, password, phone}"
  Style: green

Arrow 5E: MemberService.ts → localStorage
  Label: "5E: setItem('memberData', member)"
  Style: orange dashed

Arrow 6E: auth/index.tsx → context/ContextProvider.tsx
  Label: "6E: setAuthMember(result) — Context yangilandi, UI o'zgardi"
  Style: purple bold

---------------------------------------------------------
FLOW F — Login (Jul 28) (gold arrows)
---------------------------------------------------------

Arrow 1F: HomeNavbar.tsx → App.tsx
  Label: "1F: onClick → setLoginOpen(true)"
  Style: gold

Arrow 2F: App.tsx → auth/index.tsx
  Label: "2F: props — loginOpen=true, handleLoginClose"
  Style: gold

Arrow 3F: auth/index.tsx → MemberService.ts
  Label: "3F: handleLoginRequest → MemberService.login(input)"
  Style: gold dashed

Arrow 4F: MemberService.ts → BACKEND
  Label: "4F: POST /member/login — {memberNick, password}"
  Style: green

Arrow 5F: auth/index.tsx → context/ContextProvider.tsx
  Label: "5F: setAuthMember(result) → authMember = Member"
  Style: purple bold

---------------------------------------------------------
FLOW G — Logout & Context (Jul 30) (light purple arrows)
---------------------------------------------------------

Arrow 1G: index.tsx → context/ContextProvider.tsx
  Label: "1G: <ContextProvider> wraps everything — tree bo'yicha tarqaydi"
  Style: purple bold

Arrow 2G: context/ContextProvider.tsx → hooks/useGlobals.ts
  Label: "2G: GlobalContext.Provider value={authMember, setAuthMember}"
  Style: purple

Arrow 3G: hooks/useGlobals.ts → HomeNavbar.tsx / auth/index.tsx / App.tsx
  Label: "3G: useGlobals() → { authMember, setAuthMember } — props siz!"
  Style: purple dashed (fan out to 3 components)

Arrow 4G: HomeNavbar.tsx → App.tsx
  Label: "4G: handleLogoutClick → anchorEl set, Menu ochildi"
  Style: red dashed

Arrow 5G: App.tsx → MemberService.ts
  Label: "5G: handleLogoutRequest → MemberService.logout()"
  Style: red

Arrow 6G: MemberService.ts → BACKEND
  Label: "6G: POST /member/logout — cookie o'chirildi"
  Style: red

Arrow 7G: MemberService.ts → localStorage
  Label: "7G: removeItem('memberData')"
  Style: red dashed

Arrow 8G: App.tsx → context/ContextProvider.tsx
  Label: "8G: setAuthMember(null) → authMember=null → UI: Login tugma chiqdi"
  Style: purple bold

=========================================================
SECTION 3 — FLOW LEGEND TEXT BOXES
=========================================================

Below each ZONE, add a wide text box with the legend:

--- LEGEND BOX A (below ZONE A): ---
PRODUCTS PAGE FLOW — 9 STAGES:
  1A → useEffect ishga tushdi, productSearch o'zgardi
  2A → ProductService axios.get() — URL ga HTTP so'rov ketdi
  3A → Backend [Kebab, Steak...] ni qaytardi
  4A → .then(data) — data komponentga yetdi
  5A → dispatch(setProducts(data)) — Redux ga yuborildi
  6A → Reducer state.products = data — store yangilandi
  7A → Selector retrieveProducts — store dan o'qildi
  8A → useSelector { products } — komponentga qaytdi
  9A → render products.map() — ekranda cardlar ko'rindi
  DM → DIDMOUNT: komponent birikdi (faqat 1 marta)
  WU → WILLUNMOUNT: komponent ajraldi (sahifa o'zgarganda)

--- LEGEND BOX B (below ChosenProduct): ---
CHOSEN PRODUCT FLOW:
  1B → Route /products/:id mos keldi, productId olindi
  2B → getProduct(id) — withCredentials: true (cookie yuborildi, views+1)
  3B → getRestaurant() — parallel, restoran ma'lumoti
  4B → Backend ikkita javob berdi
  5B-i  → dispatch(setChosenProducts) — Redux da saqlanadi
  5B-ii → dispatch(setRestaurant) — Redux da saqlanadi
  6B → useSelector → chosenProduct, restaurant → Swiper da ko'rinadi

--- LEGEND BOX C (below ZONE B): ---
HOMEPAGE FLOW:
  1C-i  → getProducts(productViews) — eng ko'p ko'rilganlar
  1C-ii → getProducts(createdAt) — eng yangilar
  2C    → getTopUsers() — top foydalanuvchilar
  3C    → dispatch 3 ta action → Redux ga yuborildi
  4C    → Reducer 3 ta state yangiladi
  5C    → useSelector → PopularDishes, NewDishes, ActiveUsers render

--- LEGEND BOX D (below ZONE C): ---
BASKET FLOW (Jul 27):
  1D → useBasket() — App.tsx da bitta chaqirildi, state bitta
  2D → localStorage: sahifa yopilsa ham basket saqlanadi
  3D-4D → props orqali Navbar larga uzatildi
  5D-6D → Basket.tsx: badge, items, total price
  7D → onAdd prop ProductsPage ga uzatildi
  8D → UI: badge count+1, item list yangilandi

--- LEGEND BOX E (below ZONE D): ---
SIGNUP FLOW (Jul 28):
  1E → SIGN UP tugmasi → setSignupOpen(true)
  2E → Modal ochildi, form ko'rindi
  3E → handleSignupRequest → MemberService.signup() chaqirildi
  4E → Backend POST — foydalanuvchi yaratildi
  5E → localStorage.memberData saqlandi
  6E → setAuthMember(result) — Context yangilandi, Login tugma o'chdi

--- LEGEND BOX F (below ZONE D): ---
LOGIN FLOW (Jul 28):
  1F → Login tugmasi → setLoginOpen(true)
  2F → Modal ochildi
  3F → handleLoginRequest → MemberService.login()
  4F → Backend POST — session/cookie berildi
  5F → setAuthMember(result) → avatar ko'rindi

--- LEGEND BOX G (below ZONE E): ---
CONTEXT & LOGOUT FLOW (Jul 30):
  1G → index.tsx da <ContextProvider> hamma narsani o'radi
  2G → authMember va setAuthMember GlobalContext da saqlanadi
  3G → useGlobals() → har qaysi komponent props siz oladi
  4G → Avatar bosildi → anchorEl set → Logout menu ochildi
  5G → handleLogoutRequest → MemberService.logout()
  6G → Backend: session/cookie o'chirildi
  7G → localStorage: memberData o'chirildi
  8G → setAuthMember(null) → authMember=null → Login tugma qaytdi

=========================================================
SECTION 4 — STAGE BADGES IN CODE
=========================================================

Inside each file box, place colored circle badges next to relevant code lines:
  🟡 yellow circle "1A" — Products.tsx useEffect line
  🔵 blue circle "2A"   — ProductService.ts axios.get line
  🟢 green circle "3A"  — ProductService.ts return result.data
  🟢 green circle "4A"  — Products.tsx .then(data) line
  🟢 green circle "5A"  — Products.tsx setProducts(data) line
  🟣 purple circle "6A" — slice.ts reducer line
  🔍 circle "7A"        — selector.ts retrieveProducts line
  🔍 circle "8A"        — Products.tsx productsRetriever line
  🖥️ circle "9A"        — Products.tsx return JSX line
  🟢 "DM"              — Products.tsx useEffect([]) mount log
  🔴 "WU"              — Products.tsx cleanup return

  🟡 "1E"  — auth/index.tsx handleSignupRequest line
  🟢 "6E"  — auth/index.tsx setAuthMember(result) line
  🟣 "1G"  — index.tsx ContextProvider wrap
  🟣 "3G"  — useGlobals.ts useContext line

=========================================================
SECTION 5 — STYLE SUMMARY
=========================================================

File box border colors:
  Purple  → Redux files (slice, selector, store)
  Green   → Service files (ProductService, MemberService)
  Cyan    → React components (Products, ChosenProduct, Navbar, Basket, App)
  Orange  → Custom hooks (useBasket)
  Yellow  → Auth files (auth/index.tsx)
  Light Purple → Context files (ContextProvider, useGlobals)
  Dark    → Backend, localStorage, Browser/Screen

Arrow colors by flow:
  Blue/Yellow/Green/Cyan → Flow A (Products 9 stages)
  Teal                   → Flow B & C (ChosenProduct, HomePage)
  Orange                 → Flow D (Basket)
  Yellow                 → Flow E (Signup)
  Gold                   → Flow F (Login)
  Purple/Red             → Flow G (Logout & Context)

Title (top center, large bold):
"Burak Restaurant App — Full Data Flow
React + Redux Toolkit + TypeScript + Context API
Jul 24-25 · Jul 27 · Jul 28 · Jul 30"
```

---

*Bu promptni Claude browser extension → Excalidraw canvas ga paste qiling*
*Agar juda katta chiqsa — har bir ZONE ni alohida generate qiling*
