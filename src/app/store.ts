import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger from 'redux-logger';
import HomePageReducor from './screens/homePage/slice';
import ProductPageReducer from './screens/productsPage/slice';
import OrdersPage from './screens/ordersPage';
import OrdersPageReducor from './screens/ordersPage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger as any),
  reducer: {
    homePage: HomePageReducor,
    productsPage: ProductPageReducer,
    ordersPage: OrdersPageReducor,
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
