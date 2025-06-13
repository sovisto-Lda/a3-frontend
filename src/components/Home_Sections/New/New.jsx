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


            <div className="row">
                {newProducts && newProducts.map((product, index) => (
                    <div className={`col-12 col-sm-${12 / newProducts.length * 2} col-md-6 col-lg-${12 / newProducts.length} mb-4`} key={index}>
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