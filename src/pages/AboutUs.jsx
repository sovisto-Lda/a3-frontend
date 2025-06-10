import { useEffect, useRef, useState } from 'react';
import AboutUsHero from "../components/AboutUs/Hero/AboutUsHero.jsx";
import AboutUsIntro from "../components/AboutUs/Intro/AboutUsIntro.jsx";
import PrinterImg from "../components/AboutUs/PrinterImg.jsx";
import Who from "../components/AboutUs/Who/Who.jsx";
import ClientReviews from "../components/AboutUs/ClientReviews/ClientReviews.jsx";
import ContactForm from "../components/AboutUs/ContactForm/ContactForm.jsx";


export default function Home() {

  return (
    <main>

        <AboutUsHero />

        <AboutUsIntro />

        <PrinterImg />

        <Who />

        <ClientReviews />

        <ContactForm />


    </main>
  );
}