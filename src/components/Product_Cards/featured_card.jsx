import styles from './featured_card.module.css';
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';


export default function FeaturedCard({ fullProduct, product_id, y_offset }) {
    const [product, setProduct] = useState(fullProduct);
    const [loading, setLoading] = useState(1);
    const cardRef = useRef(null);

    const navigate = useNavigate()

    return (
        <div 
            ref={cardRef}
            className={`d-flex flex-column justify-content-between ${styles.featured_card_wrapper}`}
            style={{
                //marginTop: offset_y,
                marginTop: 0,
                backgroundImage: `url(${product.images.at(0)})` || `url("http://localhost:5000/images/placeholder.gif")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="row d-flex align-items-start">
                <h2 className={styles.h2}>{product.name ?? ""}</h2>
            </div>

            <div className={`d-flex justify-content-end`}>
                <div 
                className={`primary-button ${styles.primary_button}`}
                onClick={() => {console.log(`/product/${fullProduct.code}`); navigate(`/product/${fullProduct.code}`)}}
                
                >
                    Comprar Agora!
                </div>
            </div>
        </div>
    )

}