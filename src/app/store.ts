import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import reduxLogger, { logger } from 'redux-logger';
import HomePage from './screens/homePage';
import HomePageReducor from './screens/homePage/slice';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxLogger as any),
  reducer: {
    homePage: HomePageReducor,
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
