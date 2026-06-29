import React from 'react';
import Statistics from './Statistics';
import PopularDishes from './PopularDishes';
import NewDishes from './NewDishes';
import Advertisement from './Advertisemant';
import ActiveUsers from './ActiveUsers';
import Events from './Events';
import '../../../css/home.css';

export default function HomePage() {
  return (
    <div className={'home-page'}>
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
