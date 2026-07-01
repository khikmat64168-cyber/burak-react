import React from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';

import { Container } from '@mui/material';
import ChoosenProduct from './ChoosenProduct';

export default function ProductsPage() {
  const products = useRouteMatch();
  console.log('products:', products);

  return (
    <div className={'products-page'}>
      <Switch>
        {' '}
        <Route path={`${products.path}/:productId`}>
          <ChoosenProduct />
        </Route>
        <Route path={`${products.path}`}>
          <Products />
        </Route>
      </Switch>
    </div>
  );
}
