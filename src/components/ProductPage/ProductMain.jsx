import styles from './ProductMain.module.css';
import Stars from './Stars';
import DetailsAndDescription from './DetailsAndDescription';
import QuantitySelector from './QuantitySelector';
import ImagesCarousel from './Carousel';
import ColorsSelector from './ColorsSelector'
import React, { useEffect, useState, useRef } from "react";
import stars from '../../assets/images/stars.svg';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Favorite_Button from '../misc/Favourite_Button';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


export default function ProductMain({productCode}) {
    const [loading, setLoading] = useState(false)

    const [quantity, setQuantity] = useState(1)

    const [selectedColor, setSelectedColor] = useState(null)

    const [product, setProduct] = useState(null)

    const { token } = useAuth()

    const navigate = useNavigate();


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
            console.error('An error occurred:', error);
        });
    };

    useEffect(() => {
        fetchProduct()
    }, [])

    // for debugging
    useEffect(() => {
        console.log(selectedColor)
    }, [selectedColor])

    useEffect(() => {
        if (token && product?._id) {
            fetch(`http://localhost:5000/account/info`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(res => res.json())
            .then(data => {
                const favIds = data?.favorites?.map(f => f.toString());
                setIsFavorite(favIds?.includes(product._id));
            });
        }
    }, [product, token])

    const addToCart = async () => {
        try {
            const endpoint = "http://localhost:5000/shopping-cart";

            if (!token) {
                alert("No session. Log in again");
                navigate('/login')
                return;
            }

            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    product: product._id,
                    quantity: quantity,
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Error adding product to the cart.");
            }

            console.log("Product added to the cart successfully!");
        } catch (error) {
            console.error("Error adding to the shopping cart:", error);
        }
    };

    

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
                        <div className="mb-2">
                            <Stars perc={(product.avg_rating * 20)} num_ratings={product.ratings.length}/>
                        </div>
                        


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
                        details={
                        product.measurements?.dimensions && product.measurements?.weight
                            ? `Dimensões: ${product.measurements.dimensions[0]}cm / ${product.measurements.dimensions[1]}cm / ${product.measurements.dimensions[2]}cm. Peso: ${product.measurements.weight}g`
                            : "Indisponível"
                        }
                        />

                </div>


                <div className='d-flex gap-3'>
                    {/* <img 
                        src={isFavorite ? remove_favourite : add_favourite} 
                        alt=""
                        onClick={isFavorite ? removeFromFavorites : addToFavorites}
                    /> */}
                    <Favorite_Button productId= {product._id} />
                    <div className={`primary-button ${styles.buy_button}`}
                    onClick={addToCart}
                    ><p className={`${styles.buy_button_text}`}>Adicionar ao Carrinho</p></div>
                </div>
                
            </div>

        </div>
    ));
}