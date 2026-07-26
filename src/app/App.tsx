import { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './screens/homePage';
import ProductsPage from './screens/productsPage';
import OrdersPage from './screens/ordersPage';
import UserPage from './screens/userPage';
import HomeNavbar from './components/headers/HomeNavbar';
import OtherNavbar from './components/headers/OtherNavbar';
import Footer from './components/footer';
import HelpPage from './screens/helpPage';
import '../css/app.css';
import '../css/navbar.css';
import '../css/footer.css';
import Test1 from './screens/Test1';
import { CartItem } from '../lib/types/search';

function App() {
  const location = useLocation();
  const cartJson: string | null = localStorage.getItem('cartData');
  const currentCart = cartJson ? JSON.parse(cartJson) : [];

  const [cartItem, setCartItem] = useState<CartItem[]>(currentCart);

  /** Handlers */

  const onAdd /**define */ = (input: CartItem) => {
    const exist: any = cartItem.find(
      (item: CartItem) => item._id === input._id,
    );
    if (exist) {
      const cartUpdate = cartItem.map((item: CartItem) => {
        return item._id === input._id
          ? { ...exist, quantity: exist.quantity + 1 }
          : item;
      });

      setCartItem(cartUpdate);
      localStorage.setItem('cartData', JSON.stringify(cartUpdate));
    } else {
      const cartUpdate = [...cartItem, { ...input }];

      setCartItem(cartUpdate);
      localStorage.setItem('cartData', JSON.stringify(cartUpdate));
    }
  };

  return (
    <>
      {location.pathname === '/' ? (
        <HomeNavbar />
      ) : (
        <OtherNavbar {...({ cartItem } as any)} />
      )}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          {/* <Test1 /> */}

          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  );
}

export default App;
