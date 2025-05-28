import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function ShoppingCart() {

    const user = useAuth()

    console.log(user.decodedUser)
    
    return (
        <div className="account-page">
            <h1>Carrinho de Compras</h1>
        </div>
    );
}