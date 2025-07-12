import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import DividerLine from "../../misc/Divider_Line";
import styles from './Shopping_Card.module.css';
import { useNavigate } from "react-router-dom";




export default function Summary() {
    const navigate = useNavigate()
    const [shoppingCartProducts, setShoppingCartProducts] = useState(null);
    const { token, decodedUser } = useAuth();

    const fetchShoppingCart = async () => {
        const endpoint = `${import.meta.env.VITE_API_URL}/shopping-cart`;

        await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar os dados');
                }
                return response.json();
            })
            .then(data => {
                setShoppingCartProducts(data);
            })
            .catch(error => {
                console.error('Ocorreu um erro:', error);
            });
    }
    useEffect(() => {
        if (token) {
            fetchShoppingCart();
        }
    }, [token]);

    const subtotal = Number(
        (shoppingCartProducts?.reduce((acc, item) => {
            if (!item.total_price || isNaN(item.total_price)) {
                return acc;
            }
            return acc + Number(item.total_price);
        }, 0) || 0).toFixed(2)
    );

    const discount = 0; // Assuming no discount for now

    const total = subtotal - discount;


    const handleCreateOrder = async () => {
        if (!shoppingCartProducts || shoppingCartProducts.length === 0) {
            alert("O carrinho está vazio!");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    products: shoppingCartProducts.map(item => ({
                        product: item.product,
                        quantity: item.quantity
                    })),
                    coupon_code: null, // Assuming no coupon code for now
                    total_price: total
                })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Error trying to create order");
            }

            const order = await res.json();
            // Redireciona para checkout ou página de sucesso
            navigate(`/checkout/1/${order._id}`);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div className={`${styles.summary_wrapper}`}>
            {/* linha cabeçalho */}
            <div className="d-flex">
                <h2 className="col-5">Sumário</h2>

            </div>

            <DividerLine />

            <div className="d-flex flex-column gap-3">
                {/* cupon */}
                <div className="inputGroup d-flex flex-row align-items-end mb-3 gap-4">
                    <div className="flex-grow-1">
                        <label htmlFor="coupon">Código Cupão</label>
                        <input
                            id="coupon"
                            className="form-control form-control-md inputField"
                            type="text"
                            placeholder="Ex.: 123453"
                        />
                    </div>
                    <button
                        className={`primary-button h-100 ${styles.cupon_button}`}
                        type="button"
                        style={{ height: '38px' }} // Match default .form-control-md height
                    >
                        Ativar
                    </button>
                </div>

                {/* valores */}
                <div className="d-flex flex-column gap-3">
                    {/* subtotal */}
                    <div className="d-flex w-100 justify-content-between">
                        <p style={{ color: 'var(--cinzento)' }}>Subtotal</p>

                        <p>{subtotal}€</p>
                    </div>

                    {/* desconto */}
                    <div className="d-flex w-100 justify-content-between">
                        <p style={{ color: 'var(--cinzento)' }}>Desconto</p>
                        <p>-0.00€</p>
                    </div>

                    {/* total */}
                    <div className="d-flex w-100 justify-content-between">
                        <h2>TOTAL</h2>
                        <h2>{total}€</h2>
                    </div>
                </div>

                <button
                    className={`success-button w-100 mt-2`}
                    type="button"
                    style={{ height: '38px' }}
                    onClick={handleCreateOrder}
                >
                    <p className={styles.continue_button_text}>Prosseguir com a compra</p>
                </button>
            </div>



        </div>
    )
}