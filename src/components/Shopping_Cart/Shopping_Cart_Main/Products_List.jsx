import DividerLine from '../../misc/Divider_Line';
import FeaturedCard from '../../Product_Cards/featured_card';
import { use, useEffect, useRef, useState } from 'react';
import ProductCard from "./Product_Card/Product_Card";
import styles from "./Shopping_Card.module.css"
import { useAuth } from "../../../hooks/useAuth";



export default function ProductsList() { 

    const [shoppingCartProducts, setShoppingCartProducts] = useState(null);
    const { token, decodedUser } = useAuth();

    const fetchShoppingCart = async () => {
        const endpoint = `http://localhost:5000/shopping-cart`;
        
        await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar os dados');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data fetched:')
            console.log(data);
            setShoppingCartProducts(data);
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    };


    useEffect(() => {
        if (token) {
            fetchShoppingCart();
        }
    }, [token]);
   
    return (
        <div className="w-100">
            {/* linha cabeçalho */}
            <div className="d-flex w-100">
                <h2 className={`col-5 ${styles.h2}`}>Produto</h2>
                <h2 className={`col-3 text-center ${styles.h2}`} style={{color: 'var(--cinzento'}}>Quantidade</h2>
                <h2 className={`col-2 text-center ${styles.h2}`} style={{color: 'var(--cinzento'}}>Total</h2>
                <h2 className={`col-2 text-end ${styles.h2}`} style={{color: 'var(--cinzento'}}>Ação</h2>

            </div>

            <DividerLine />

            {shoppingCartProducts && 
                <div className="d-flex flex-column gap-3">
                    {shoppingCartProducts.map((item, index) => {
                        console.log('Shopping Cart Product:', item);
                        return <ProductCard shoppingCartProduct={item} key={index} />;
                    })}
                </div>
            
            }

            <DividerLine />
        </div>
    )
}