import React from 'react';
import Statistics from './Statistics';
import PopularDishes from './PopularDishes';
import NewDishes from './NewDishes';
import Advertisement from './Advertisemant';
import ActiveUsers from './ActiveUsers';
import Events from './Events';
import '../../../css/home.css';

// Bosh sahifa — barcha section komponentlarini ketma-ket render qiladi
export default function HomePage() {
  return (
    // "home-page" className — home.css dagi CSS selectorlar shu classga bog'liq
    <div className={'home-page'}>
      <Statistics />     {/* Statistika: 12 restaurant, 8 yil, 50+ menu, 200+ mijoz */}
      <PopularDishes />  {/* Mashhur taomlar kartochkalari */}
      <NewDishes />      {/* Yangi taomlar */}
      <Advertisement />  {/* Reklama banner */}
      <ActiveUsers />    {/* Faol foydalanuvchilar */}
      <Events />         {/* Tadbirlar */}
    </div>
  );
}
