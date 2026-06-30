import React from 'react';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import HomePage from './screens/homePage';
import ProductsPage from './screens/productsPage';
import OrdersPage from './screens/ordersPage';
import UserPage from './screens/userPage';
import HomeNavbar from './components/headers/HomeNavbar';
import OtherNavbar from './components/headers/OtherNavbar';
import Footer from './components/headers/footers';
import '../css/app.css';
import '../css/navbar.css';
import '../css/footer.css';
import { HelpPage } from './screens/helpPage';

function App() {
  // useLocation — brauzerdagi joriy URL manzilini oladi
  const location = useLocation();

  return (
    <>
      {/* Faqat bosh sahifada HomeNavbar, qolgan sahifalarda OtherNavbar ko'rsatiladi */}
      {location.pathname === '/' ? <HomeNavbar /> : <OtherNavbar />}

      {/* Switch — URL ga mos kelgan birinchi Route ni render qiladi */}
      <Switch>
        <Route path="/products">
          <ProductsPage />
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
        {/* "/" oxirida turadi — boshqa routelar mos kelmasa shu ishlaydi */}
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      {/* Footer barcha sahifalarda ko'rinadi */}
      <Footer />
    </>
  );
}

export default App;
