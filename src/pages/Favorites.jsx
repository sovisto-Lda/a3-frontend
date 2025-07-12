import { useEffect, useState } from "react";
import Product_Card from "../components/Product_Cards/Product_Card";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`${import.meta.env.VITE_API_URL}/account/favorites`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setFavorites(data));
    }, []);

    return (
        <div>
            <div className="account-container mt-4">
                <div className="row mb-3">
                    <div className="col">
                        <h1>Favoritos</h1>
                    </div>
                </div>
                <div className="row">
                    {favorites.length === 0 ? (
                        <p>Não tem produtos favoritos.</p>
                    ) : (
                        favorites.map((product, index )=> (
                            <div key={product._id} className="col-md-3 mb-4">
                                <Product_Card
                                    key={index}
                                    code={product.code}
                                    id={product._id}
                                    name={product.name}
                                    image={product.images[0]}
                                    price={product.price}
                                    ratingPerc={product.avg_rating > 0 ? (1 / product.avg_rating) : 0}
                                />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}