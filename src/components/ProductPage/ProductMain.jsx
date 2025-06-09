import styles from './ProductMain.module.css';
import Stars from './Stars';
import DetailsAndDescription from './DetailsAndDescription';
import QuantitySelector from './QuantitySelector';
import ImagesCarousel from './Carousel';
import ColorsSelector from './ColorsSelector'
import React, { useEffect, useState, useRef } from "react";
import stars from '../../assets/images/stars.svg';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import add_favourite from '../../assets/images/add_favourites_icon.svg'


export default function ProductMain({productCode}) {
    const [loading, setLoading] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const [selectedColor, setSelectedColor] = useState(null)

    const [product, setProduct] = useState(null)


    const fetchProduct = async () => {
        setLoading(true);
        const endpoint = `http://localhost:5000/products/one/${productCode}`;

        await fetch(endpoint)
        .then(response => {
            if (!response.ok) {
            throw new Error('Erro ao carregar produto');
            }
            return response.json();
        })
        .then(data => {
            // console.log(data);
            setProduct(data)
            console.log(product)
            
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
    }, [])

    // for debugging
    useEffect(() => {
        console.log(selectedColor)
    }, [selectedColor])

    return (
        product !== null && (
        <div className='d-flex gap-4 flex-column flex-sm-row pt-2 pt-sm-0'>

            {/* imgaes */}
            <ImagesCarousel images={product.images}/>

            {/* right side */}
            <div className='w-100 w-sm-50 d-flex flex-column justify-content-between gap-4'>
                <div className='d-flex flex-column gap-4 gap-sm-5'>
                    <div>
                        {/* category */}
                        <h2 className={styles.productCategory}>{product.category}</h2>
                        
                        {/* name and code */}
                        <div className='d-flex align-items-center gap-3' >
                            <h1 className={styles.productName}>{product.name}</h1>
                            <h2 className={styles.productCode}>{`#${product.code}`}</h2>
                        </div>

                        {/* stars */}
                        <Stars perc={(product.avg_rating * 20)} num_ratings={product.ratings.length}/>


                        {/* colors */}
                        <ColorsSelector colors={product.colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor} />

                    </div>
                    
                    {/* price and qnt */}
                    <div className='d-flex gap-5'>
                        {/* price */}
                        <div className='d-flex flex-column gap-2'>
                            <p className={styles.price_qnt_titles}>Preço</p>
                            <p className={styles.price_text}>{`${product.price}€`}</p>
                        </div>


                        {/* quantity */}
                        <QuantitySelector quantity={quantity} setQuantity={setQuantity} stock={product.stock}/>


                    </div>
                
                    {/* description and details */}
                    <DetailsAndDescription 
                        description={product.description} 
                        details={`Dimensões: ${product.measurements.dimensions[0]}cm / ${product.measurements.dimensions[1]}cm / ${product.measurements.dimensions[2]}cm. Peso: ${product.measurements.weight}g `}/>

                </div>


                <div className='d-flex gap-3'>
                    <img src={add_favourite} alt="" />
                    <div className={`primary-button ${styles.buy_button}`}><p className={`${styles.buy_button_text}`}>Adicionar ao Carrinho</p></div>
                </div>
                
            </div>

        </div>
    ));
}