import {
  configureStore,
  ThunkAction,
  Action,
  AnyAction,
} from '@reduxjs/toolkit';
import reduxLogger, { logger } from 'redux-logger';
import HomePage from './screens/homePage';
import HomePageReducor from './screens/homePage/slice';
import ProductsPage from './screens/productsPage';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger as any),
  reducer: {
    homePage: HomePageReducor,
    productsPage: ProductsPageReducer,
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
function ProductsPageReducer(state: unknown, action: AnyAction): unknown {
  throw new Error('Function not implemented.');
}
