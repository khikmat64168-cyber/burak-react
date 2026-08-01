import { createSelector } from '@reduxjs/toolkit';
import { AppRootState } from '../../../lib/types/screen';
import OrdersPage from '.';

const selectOrdersPage = (state: AppRootState) => state.ordersPage;

export const retrievePauseOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.pauseOrders,
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.processOrders,
);

export const retrieveFinishedOrderss = createSelector(
  selectOrdersPage,
  (OrdersPage) => OrdersPage.finishedOrders,
);
