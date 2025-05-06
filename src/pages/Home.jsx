import FeaturedCard from '../components/Product_Cards/featured_card.jsx';
import { useEffect, useRef, useState } from 'react';
import Home_Top from '../components/Home_Sections/Home_Top.jsx';
import Custom_Order_CTA from '../components/misc/Custom_Order_CTA/Custom_Order_CTA.jsx';

export default function Home() {

  return (
    <main >

      <Home_Top/>

      <Custom_Order_CTA/>

    </main>
  );
}