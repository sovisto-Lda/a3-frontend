import { useEffect, useState } from "react";
import FeaturedCard from "../components/Product_Cards/featured_card";

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:5000/account/favorites', {
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
                        favorites.map(product => (
                            <div key={product._id} className="col-md-4 mb-4">
                                <FeaturedCard fullProduct={product} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}