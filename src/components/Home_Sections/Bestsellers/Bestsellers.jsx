import { useEffect, useRef, useState } from 'react';
import Product_Card from '../../Product_Cards/Product_Card';

export default function Bestsellers() {
    const [bestsellerProducts, setBestsellerProducts] = useState([]);


    // fetch besteller products
    const fetchBestsellerProducts = async () => {
        //setLoading(true);
        const endpoint = `http://localhost:5000/products/bestseller`;

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
            setBestsellerProducts(data);
        })
        .finally (() => {
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    };


    useEffect(() => {
            fetchBestsellerProducts();
    }, []);


    return (
        <div className='d-flex flex-column gap-4'>
            <h2>Mais vendidos</h2>

            { // display the featured cards only after top image is loaded, to avoid flicker
            bestsellerProducts && // display the featured cards only after getting the featured products
            ( 
                <div
                    className="d-flex flex-column flex-sm-row justify-content-between"
                    style={{ 
                        gap: '32px', //gap between cards
                        // backgroundColor: 'cyan',
                    }}
                >
                    {bestsellerProducts.map((product, index) => (
                        <Product_Card
                            key={index}
                            name={product.name}
                            image={product.images[0]}
                            price={product.price}
                            ratingPerc={product.avg_rating > 0 ? (1 / product.avg_rating) : 0}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}