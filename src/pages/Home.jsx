import FeaturedCard from '../components/Product_Cards/featured_card.jsx';
import { useEffect, useRef, useState } from 'react';
import Hero from '../components/Home_Sections/Hero/Hero.jsx';
import Custom_Order_CTA from '../components/misc/Custom_Order_CTA/Custom_Order_CTA.jsx';

export default function Home() {

  return (
    <main >

      <Hero/>

      <Custom_Order_CTA/>

    </main>
  );
}