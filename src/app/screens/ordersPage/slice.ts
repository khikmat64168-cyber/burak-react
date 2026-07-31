import { createSlice } from '@reduxjs/toolkit';
import { HomePageState, OrderPageState } from '../../../lib/types/screen';

const initialState: OrderPageState = {
  pauseOrders: [],
  processOrders: [],
  finishedOrders: [],
};

const orderPageSlice = createSlice({
  name: 'ordersPage',
  initialState,
  reducers: {
    setPauseOrders: (state, action) => {
      state.pauseOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

export const { setPauseOrders, setProcessOrders, setFinishedOrders } =
  orderPageSlice.actions;

const OrdersPageReducor = orderPageSlice.reducer;
export default OrdersPageReducor;
