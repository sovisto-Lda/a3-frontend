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

                <div className="row">
                    {bestsellerProducts && bestsellerProducts.map((product, index) => (
                    <div className={`col-12 col-sm-${12 / bestsellerProducts.length * 2} col-md-6 col-lg-${12 / bestsellerProducts.length} mb-4`} key={index}>
                            <Product_Card
                            key={index}
                            code={product.code}
                            id={product._id}
                            name={product.name}
                            image={product.images[0]}
                            price={product.price}
                            ratingPerc={product.avg_rating * 20}
                            />
                        </div>
                    ))}
                </div>
            
        </div>
    )
}