import { createSelector } from 'reselect';
import { AppRootState } from '../../../lib/types/screen';

const selectProductsPage = (state: AppRootState) => state.productsPage;

export const retriveRestaurant = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.restaurant,
);

export const retriveChoosenProduct = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.choosenProduct,
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (ProductsPage) => ProductsPage.products,
);
