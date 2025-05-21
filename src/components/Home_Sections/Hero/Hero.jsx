import styles from './Hero.module.css';
import FeaturedCard from '../../Product_Cards/featured_card';
import { use, useEffect, useRef, useState } from 'react';

export default function Hero() {

    const imgRef = useRef(null);
    const sloganRef = useRef(null);
    const featuredWrapperRef = useRef(null);

    const [offsetY, setOffsetY] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);
    const [featuredProducts, setFeaturedProducts] = useState([]);

    const slogan_cards_spacing = 48;

    // resolve y offset for the slogan and cards for right positioning relative to the top image
    // rerun on window resize
    useEffect(() => {
      const updateOffset = () => {
        if (imgRef.current) {
          const height = imgRef.current?.clientHeight ?? 0;
          const sloganOffset = sloganRef.current?.clientHeight ?? 0;
          const cardsOffset = featuredWrapperRef.current?.clientHeight ?? 220;

          setOffsetY(height - sloganOffset - slogan_cards_spacing - (cardsOffset / 4));
        }
      };

      // set top image load state and update offset on load
      const img = imgRef.current;
      if (img) {
          if (img.complete) {
            setImageLoaded(true); // mark as loaded
            updateOffset();
          } else {
            img.addEventListener('load', () => {
              setImageLoaded(true);
              updateOffset();
            });
          }
        }
        
      window.addEventListener('resize', updateOffset);
    
      updateOffset() // run on load
      

      // event cleanup
      return () => {
        window.removeEventListener('resize', updateOffset);
      };
    }, [imageLoaded, featuredProducts]); // update when top image is loaded and when featured products are loaded


    // set slogan font size to be as large as possible while being only one line
    // rerun on window resize
    useEffect(() => {
      const updateSlogan = () => {
        let windowWidth = window.innerWidth - 63; //63 bacause crazy math stuff
        let fontSize = 26;
    
        // reset first to avoid growing from previously large value
        if (sloganRef.current) {
          sloganRef.current.style.whiteSpace = 'nowrap'
          sloganRef.current.style.fontSize = `${fontSize}px`;
    
          while (sloganRef.current.scrollWidth < windowWidth && fontSize < 200 // upper bound
          ) {
            sloganRef.current.style.fontSize = `${fontSize}px`;
            fontSize++;
          }
          sloganRef.current.style.fontSize = `${ fontSize - 3 }px`; // safe buffer to avoid visual right body margin overflow

          if (fontSize === 26) {sloganRef.current.style.whiteSpace = ''}
          sloganRef.current.style.letterSpacing = fontSize/10 + "px"
          console.log(fontSize)
        }

      };
      
      updateSlogan(); // run once on load
      window.addEventListener('resize', updateSlogan);
      return () => window.removeEventListener('resize', updateSlogan); // cleanup
    }, []);


    // fetch featured products
    const fetchFeaturedProducts = async () => {
        //setLoading(true);
        const endpoint = `http://localhost:5000/products/featured`;

        await fetch(endpoint)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })
        .then(data =>  {
            console.log('Data fetched:')
            console.log(data);
            setFeaturedProducts(data);
        })
        .finally (() => {
          //setLoading(false);
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    };


    useEffect(() => {
          fetchFeaturedProducts();
    }, []);


    return (
        <div> 
          <div className={styles.imgDiv}>
            <img ref={imgRef}
                src="http://localhost:5000/images/squirrel_bg.png" 
                alt="" 
                className={`${styles.img}`}
            />
          </div>
            

            <div 
                style={{
                    paddingTop: offsetY // not margin because it goes brr
                }}  
                >
                <p ref={sloganRef}
                    className={styles.home_slogan}
                    style={{
                        // backgroundColor: "green",
                        marginBottom: `${slogan_cards_spacing}px`,      
                    }}
                >A sua Visão, as nossas Soluções 3D</p>

                {imageLoaded && 
                featuredProducts.length === 3 && // display the featured cards only after getting the featured products
                ( // display the featured cards only after top image is loaded, to avoid flicker
                    <div ref={featuredWrapperRef}
                        className="d-flex flex-column flex-sm-row justify-content-between px-sm-5 px-4"
                        style={{ 
                            gap: '32px', //gap between cards
                            // backgroundColor: 'cyan',
                        }}
                    >
                        <FeaturedCard fullProduct={featuredProducts.at(0)} product_id={'8bdeeee4'} y_offset={offsetY} />
                        <FeaturedCard fullProduct={featuredProducts.at(1)} product_id={'8bdeeee4'} y_offset={offsetY} />
                        <FeaturedCard fullProduct={featuredProducts.at(2)} product_id={'8bdeeee4'} y_offset={offsetY} />
                    </div>
                )}
                
            </div>
        </div>
    )
          
}