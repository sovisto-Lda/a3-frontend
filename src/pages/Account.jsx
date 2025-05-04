import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

export default function Account() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token", token)
        // Redirect to login if no token
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            // Decode the token
            const decodedUser = jwtDecode(token);
            setUser(decodedUser);

            // Fetch user data
            fetch('http://localhost:5000/account', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch account data');
                    }
                    return response.json();
                })
                .then(data => {
                    setUser(data); // Update user state with fetched data
                })
                .catch(error => {
                    console.error('Error fetching account data:', error);
                });
        } catch (error) {
            console.error('Invalid token:', error);
            navigate('/login');
        }
    }, [navigate]);

    // Show loading state if user data is not yet available
    if (!user) {
        return <p>Loading...</p>;
    }

    // Page content if authenticated
    return (
        <div className="account-page">
            <h1>Minha Conta</h1>
            <p>Bem-vindo, {user.name}!</p>
            <p>Email: {user.email}</p>
            <p>Nº Telefone: {user.telefone}</p>
            <button className="primary-button" onClick={() => {
                localStorage.removeItem('token'); // Clear the token
                navigate('/login'); // Redirect to login page
            }}>Sair</button>
        </div>
    );
}

