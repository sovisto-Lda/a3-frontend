import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import add_favourite from '../../assets/images/add_favourites_icon.svg'
import remove_favourite from '../../assets/images/favourited_icon.svg'

export default function Favorite_Button({productId}) {
    const [isFavorite, setIsFavorite] = useState(false);
    const {token} = useAuth();


    const fetchFavourites = async () => {
        try {
            const response = await fetch("http://localhost:5000/account/favorites", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
            });

            if (!response.ok) {
                throw new Error("Error fetching favourites");
            }

            const data = await response.json();
            const favIds = data.map(product => product._id.toString());
            setIsFavorite(favIds.includes(productId.toString()));
            
        } catch (error) {
            console.error("Error:", error);
        }
    };

    

    useEffect(() => {
       

        if (token && productId) {
            fetchFavourites();
        }
    }, [token, productId]);


    const addToFavorites = async () => {
        if (!token) {
            alert("No session. Log in again");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/account/favorites", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ product: productId }),
            });

            if (!response.ok) {
                throw new Error("Error adding product to favorites");
            }

            setIsFavorite(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const removeFromFavorites = async () => {
        if (!token) {
            alert("Sem sessão. Login.");
            navigate('/login');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/account/favorites`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ product: productId })
            });

            if (!response.ok) {
                throw new Error("Error removing product from favorites");
            }

            setIsFavorite(false);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    
    return (
        <img 
            src={isFavorite ? remove_favourite : add_favourite} 
            alt=""
            onClick={isFavorite ? removeFromFavorites : addToFavorites}
        />


    )
}