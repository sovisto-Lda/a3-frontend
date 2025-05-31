import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import Return_Button from "../components/misc/Return_Button";
import ShoppingCartMain from "../components/Shopping_Cart/Shopping_Cart_Main/Shopping_Cart_Main";

export default function ShoppingCart() {

    const { token, user } = useAuth();

    console.log(user)
    
    return (
        <div>
            <Return_Button />

            <h1 className="my-3 my-sm-4">Carrinho de Compras</h1>

            <ShoppingCartMain />
            
        </div>
    );
}