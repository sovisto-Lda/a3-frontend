import FeaturedCard from '../components/Product_Cards/featured_card.jsx';
import { useEffect, useRef, useState } from 'react';
import Hero from '../components/Home_Sections/Hero/Hero.jsx';
import Custom_Order_CTA from '../components/misc/Custom_Order_CTA/Custom_Order_CTA.jsx';
import Bestsellers from '../components/Home_Sections/Bestsellers/Bestsellers.jsx';
import New from '../components/Home_Sections/New/New.jsx';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate()

  return (
    <main >

      <Hero/>

      <Custom_Order_CTA/>

      <section className='d-flex flex-column' style={{gap: "96px"}}>
        <Bestsellers />

        <New />

      </section>

      <div 
        className='d-flex justify-content-center w-100' 
        style={{marginTop: "64px"}}
      >
        <h2
          onClick={() => {navigate('/products')}}
          style={{cursor: 'pointer'}}
        >
          Ver catálogo completo</h2>
        </div>



    </main>
  );
}