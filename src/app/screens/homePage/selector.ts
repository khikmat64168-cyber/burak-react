import { createSelector } from '@reduxjs/toolkit';
import { AppRootState } from '../../../lib/types/screen';
import HomePage from '.';

const selectHomPage = (state: AppRootState) => state.homePage;

export const retrievePopularDishes = createSelector(
  selectHomPage,
  (HomePage) => HomePage.popularDishes,
);

export const retrieveNewDishes = createSelector(
  selectHomPage,
  (HomePage) => HomePage.newDishes,
);

export const retrieveTopUsers = createSelector(
  selectHomPage,
  (HomePage) => HomePage.topUsers,
);
