import React, { useEffect, useState } from "react";
import Review from "../components/Checkout/Review/Review";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Return_Button from "../components/misc/Return_Button";

// Função util para traduzir e escolher cor
function getStateInfo(state) {
    switch (state) {
        case "Pending Payment":
            return { label: "Pendente", color: "var(--alerta)" };
        case "Payment Confirmed":
            return { label: "Pagamento confirmado", color: "var(--info-hover)" };
        case "Processing":
            return { label: "Em processamento", color: "var(--sucesso)" };
        case "Shipped":
            return { label: "Enviado", color: "var(--info-hover)" };
        case "Completed":
            return { label: "Entregue", color: "var(--sucesso)" };
        case "Cancelled":
            return { label: "Cancelado", color: "var(--perigo)" };
        default:
            return { label: state, color: "var(--cinzento-claro)" };
    }
}

export default function Order() {

    const [orderData, setOrderData] = useState(null);
    const { orderId } = useParams();
    const { token } = useAuth();

    const fetchOrderInfo = async () => {
        if (!orderId || !token) return;
        try {
            const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            if (!response.ok) throw new Error("Failed to fetch order data");

            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error("Error fetching order data:", error);
        }
    };

    useEffect(() => {
        fetchOrderInfo();
    }, [orderId]);

    return (
        <div className="mt-4 ">
            <div className="row align-items-center mb-5">
                <div className="col-md-3 mb-2">
                    <Return_Button
                        text={`Pedido Nº ${orderId}`}
                        returnAction={() => window.history.back()}
                    />
                </div>
                <div className="col-xl-3 mb-2">
                    <p style={
                        orderData
                            ? { color: getStateInfo(orderData.state).color }
                            : {}
                    }>
                        {orderData
                            ? getStateInfo(orderData.state).label
                            : ""}
                    </p>

                </div>
                <div className="col-md-6 d-flex justify-content-end">
                    <button className="primary-button">
                        Transferir fatura
                    </button>
                </div>
            </div>

            <div className="row justify-content-center">

                <Review
                    order_data={orderData}
                    onNext={() => { }}
                    fetchOrderInfo={fetchOrderInfo}
                    page="order"
                    size= "12"
                />
            </div>
        </div>
    )
}
