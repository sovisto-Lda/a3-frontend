import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Account() {
    const navigate = useNavigate();
    const { token, decodedUser } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (!token) return;

        fetch('http://localhost:5000/account', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch(err => console.error("Fetch error", err));
    }, [token]);

    if (!userData) return <p>Loading...</p>;

    return (
        <div className="account-page">
            <h1>Minha Conta</h1>
            <p>Bem-vindo, {userData.name}!</p>
            <p>Email: {userData.email}</p>
            <p>Nº Telefone: {userData.telefone}</p>
            <button className="primary-button" onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
            }}>Sair</button>
        </div>
    );
}