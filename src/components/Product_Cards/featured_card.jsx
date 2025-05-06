import styles from './featured_card.module.css';
import React, { useEffect, useState, useRef } from "react";


export default function FeaturedCard({ product_id, y_offset }) {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(1);
    const cardRef = useRef(null);


    const fetchProduct = async () => {
        setLoading(true);

        const endpoint = `http://localhost:5000/products/one/${product_id}`

        await fetch(endpoint)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erro ao carregar os dados');
            }
            return response.json();
            
        })
        .then(data => {
            // console.log(data);
            setProduct(data)
        })        
        .finally (() => {
            setLoading(false)
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    };

    useEffect(() => {
        fetchProduct()
    }, []);

    return (
        <div 
            ref={cardRef}
            className={`d-flex flex-column justify-content-between ${styles.featured_card_wrapper}`}
            style={{
                //marginTop: offset_y,
                marginTop: 0,
                backgroundImage: `url("http://localhost:5000/images/placeholder.gif")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="row d-flex align-items-start">
                <h2 className={styles.h2}>{product.name ?? ""}</h2>
            </div>

            <div className={`d-flex justify-content-end`}>
                <div className={`primary-button ${styles.primary_button}`}>Comprar Agora!</div>
            </div>
        </div>
    )

}