import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import ProductMain from "../components/ProductPage/ProductMain";

const ProductPage = () => {
    const {code} = useParams();

    return (
        <ProductMain productCode={code}/>
    );
}

export default ProductPage;
