import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Account() {
    const navigate = useNavigate();

    const { token, user } = useAuth();

    console.log(user)

    if (!user) return <p>Loading...</p>;

    return (
        <div className="account-page">
            <h1>Minha Conta</h1>
            <p>Bem-vindo, {user.name}!</p>
            <p>Email: {user.email}</p>
            <p>Nº Telefone: {user.telefone}</p>
            <button className="primary-button" onClick={() => {
                localStorage.removeItem('token');
                navigate('/login');
            }}>Sair</button>
        </div>
    );
}