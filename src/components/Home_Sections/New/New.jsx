import { useEffect, useRef, useState } from 'react';
import Product_Card from '../../Product_Cards/Product_Card';

export default function New() {
    const [newProducts, setNewProducts] = useState([]);


    // fetch besteller products
    const fetchNewProducts = async () => {
        //setLoading(true);
        const endpoint = `http://localhost:5000/products/new`;

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
            setNewProducts(data);
        })
        .finally (() => {
            //setLoading(false);
        })
        .catch(error => {
            console.error('Ocorreu um erro:', error);
        });
    };


    useEffect(() => {
            fetchNewProducts();
    }, []);


    return (
        <div className='d-flex flex-column gap-4'>
            <h2>Produtos Novos</h2>

            { // display the featured cards only after top image is loaded, to avoid flicker
            newProducts && // display the featured cards only after getting the featured products
            ( 
                <div
                    className="d-flex flex-column flex-sm-row justify-content-between"
                    style={{ 
                        gap: '32px', //gap between cards
                        // backgroundColor: 'cyan',
                    }}
                >
                    {newProducts.map((product, index) => (
                        <Product_Card
                            key={index}
                            name={product.name}
                            image={product.images[0]}
                            price={product.price}
                            ratingPerc={(product.avg_rating > 0) ? (1 / product.avg_rating) : 0}
                            />
                    ))}
                </div>
            )}
        </div>
    )
}