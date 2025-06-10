import { useEffect, useRef, useState } from 'react';
import styles from './AboutUsHero.module.css';
import general from '../general.module.css';


export default function AboutUsHero() {

  return (
    <div>
        <div 
          className={general.fullWidthImage} 
          style={{
            backgroundImage: 'url("http://localhost:5000/images/racoon_bg.jpg")',
            backgroundPosition: "center 70%",
            height: "30vw"
          
          }}>

            <p
                className={styles.title}
                style={{
                 }}
            >Sobre Nós</p>


        </div>

  

    </div>
  );
}