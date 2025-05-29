import DividerLine from "../Divider_Line";
import FeaturedCard from '../../Product_Cards/featured_card';
import { use, useEffect, useRef, useState } from 'react';
import ProductCard from "./Product_Card/Product_Card";

export default function ProductsList() { 

    const [featuredProducts, setFeaturedProducts] = useState(null);

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
        <div className="w-100">
            {/* linha cabeçalho */}
            <div className="d-flex w-100">
                <h2 className="col-5">Produto</h2>
                <h2 className="col-3 text-center">Quantidade</h2>
                <h2 className="col-2 text-center">Total</h2>
                <h2 className="col-2 text-end">Ação</h2>

            </div>

            <DividerLine />

            {featuredProducts && 
                <div className="d-flex flex-column gap-3">
                    {(featuredProducts.map((item, index) => (
                                <ProductCard product={item} key={index} />     
                            ))             
                    ) }
                </div>
            
            }

            <DividerLine />
        </div>
    )
}