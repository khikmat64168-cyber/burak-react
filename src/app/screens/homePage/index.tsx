import React, { useEffect } from 'react';
import Statistics from './Statistics';
import PopularDishes from './PopularDishes';
import NewDishes from './NewDishes';
import Advertisement from './Advertisement';
import ActiveUsers from './ActiveUsers';
import Events from './Events';
import '../../../css/home.css';

import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { setPopularDishes } from './slice';
import { retrievePopularDishes } from './selector';
import { Product } from '../../../lib/types/product';
import { create } from 'domain';

/** REDUX SLICE & SELECTOR */

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
});

const popularDishRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);

export default function HomePage() {
  const { setPopularDishes } = actionDispatch(useDispatch());
  const { popularDishes } = useSelector(popularDishRetriever);
  // Selector : Store => Data
  useEffect(() => {
    // Backend server data request => Data
    const result = [
      {
        _id: '6a39b1be62f1c50577e78170',
        productStatus: 'PROCESS',
        productCollection: 'DISH',
        productName: 'Kebab',
        productPrice: 14,
        productLeftCount: 75,
        productSize: 'NORMAL',
        productVolume: 1,
        productDesc: 'This is delicious kebab',
        productImages: [
          'uploads/products/b25d78ff-14da-4a97-a761-b2c7cf6457f7.jpg',
          'uploads/products/6eb6d2ad-3fab-4b32-bfaa-078392b30f33.jpeg',
          'uploads/products/4eb012c4-2d39-4506-bc2e-6b7a630c09fd.jpeg',
        ],
        productViews: 0,
        createdAt: '2026-06-22T22:05:50.795Z',
        updatedAt: '2026-06-22T22:05:50.795Z',
        __v: 0,
      },
    ];
    //slice : backenddan kelgan Data => store
    //@ts-ignore

    setPopularDishes(result);
  }, []);
  return (
    <div className={'homepage'}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
