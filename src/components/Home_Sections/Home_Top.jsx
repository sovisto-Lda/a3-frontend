import styles from './Home_Top.module.css';
import FeaturedCard from '../Product_Cards/featured_card';
import { useEffect, useRef, useState } from 'react';

export default function Home_Top() {

    const imgRef = useRef(null);
    const sloganRef = useRef(null);
    const featuredWrapperRef = useRef(null);
    const [offsetY, setOffsetY] = useState(0);
    const [imageLoaded, setImageLoaded] = useState(false);


    // resolve y offset for the slogan and cards for right positioning relative to the top image
    // rerun on window resize
    useEffect(() => {
        const updateOffset = () => {
          if (imgRef.current) {
            const height = imgRef.current?.clientHeight ?? 0;
            const sloganOffset = sloganRef.current?.clientHeight ?? 0;
            const cardsOffset = featuredWrapperRef.current?.clientHeight ?? 0;
            
            setOffsetY(height - sloganOffset - 32 - (cardsOffset / 4)); // 32 is the space between the slogan and the cards
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
    }, [imageLoaded]);


    // set slogan font size to be as large as possible while being only one line
    // rerun on window resize
    useEffect(() => {
        const updateSlogan = () => {
          let windowWidth = window.innerWidth - 63; //63 bacause crazy math stuff
          let fontSize = 1;
      
          // reset first to avoid growing from previously large value
          if (sloganRef.current) {
            sloganRef.current.style.whiteSpace = 'nowrap'
            sloganRef.current.style.fontSize = `${fontSize}px`;
      
            while (sloganRef.current.scrollWidth < windowWidth && fontSize < 200 // upper bound
            ) {
              sloganRef.current.style.fontSize = `${fontSize}px`;
              fontSize++;
            }
            sloganRef.current.style.fontSize = `${ fontSize - 2 }px`; // safe buffer to avoid visual right body margin overflow

          }
        };
        
        updateSlogan(); // run once on load
        window.addEventListener('resize', updateSlogan);
        return () => window.removeEventListener('resize', updateSlogan); // cleanup
    }, []);


    return (
        <div> 
            <img ref={imgRef}
                src="http://localhost:5000/images/squirrel_bg.png" 
                alt="" 
                className={styles.img}
            />

            <div 
                style={{
                    paddingTop: offsetY // not margin because it goes brr
                }}  
                >
                <p ref={sloganRef}
                    className={styles.home_slogan}
                    style={{
                        // backgroundColor: "green",
                        marginBottom: '32px',      
                    }}
                >A sua Visão, as nossas Soluções 3D</p>

                {imageLoaded && ( // display the featured cards only after top image is loaded, to avoid flicker
                    <div ref={featuredWrapperRef}
                        className="d-flex flex-column flex-sm-row justify-content-between px-5" 
                        style={{ 
                            gap: '32px', //gap between cards
                            // backgroundColor: 'cyan',
                        }}
                    >
                        <FeaturedCard product_id={'8bdeeee4'} y_offset={offsetY} />
                        <FeaturedCard product_id={'8bdeeee4'} y_offset={offsetY} />
                        <FeaturedCard product_id={'8bdeeee4'} y_offset={offsetY} />
                    </div>
                )}
                
            </div>
        </div>
    )
          
}