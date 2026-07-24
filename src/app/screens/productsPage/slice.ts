import { createSlice } from '@reduxjs/toolkit';
import { ProductsPageState } from '../../../lib/types/screen';

const initialState: ProductsPageState = {
  restaurant: null,
  choosenProduct: null,
  products: [],
};

const ProductPageSlice = createSlice({
  name: 'productsPage',
  initialState,
  reducers: {
    setRestaurant: (state, action) => {
      state.restaurant = action.payload;
    },
    setChosenProducts: (state, action) => {
      state.choosenProduct = action.payload;
    },

    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setProducts, setChosenProducts, setRestaurant } =
  ProductPageSlice.actions;

const ProductPageReducer = ProductPageSlice.reducer;
export default ProductPageReducer;
