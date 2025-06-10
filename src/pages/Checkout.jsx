import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Return_Button from "../components/misc/Return_Button";
import ProgressBar from "../components/Checkout/Progress_Bar/Progress_Bar";
import InfoClient from "../components/Checkout/Info_Client/Info_Client";
import Shipping from "../components/Checkout/Shipping/Shipping";
import PaymentMethod from "../components/Checkout/Payment_Method/Payment_Method";
import Review from "../components/Checkout/Review/Review";

export default function Checkout() {
    const { orderId } = useParams();
    const [stage, setStage] = useState(1);
    const { token } = useAuth();

    // Estado para guardar info de cada etapa
    const [clientInfo, setClientInfo] = useState({});
    const [shippingInfo, setShippingInfo] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({});
    const [orderData, setOrderData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrderInfo = async () => {
            if (!orderId || !token) return;
            try {
                const response = await fetch(`http://localhost:5000/orders/${orderId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error("Failed to fetch order info");
                const data = await response.json();
                setOrderData(data);
            } catch (error) {
                console.error("Error fetching order info:", error);
            }
        };

        // COnfirm payment and change order state to "Payment"
        const confirmPayment = async () => {
            if (!orderId || !token) return;
            try {
                const response = await fetch(`http://localhost:5000/orders/${orderId}/payment-confirmed`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) throw new Error("Failed to change order state");
                const data = await response.json();
                console.log("Order payment confirmed", data);
            } catch (error) {
                console.error("Error changing order state:", error);
            }
        }
        if (stage === 4) {
            fetchOrderInfo();
            // Confirm payment when reaching the last stage
            // This is where you would typically handle payment confirmation
            // For now, we just log the order data and confirm payment
            confirmPayment();
        }
    }, [stage, orderId, token]);

    return (
        <div>
            <Return_Button 
                returnAction={() => {
                    if (stage !== 1) {setStage(stage - 1)}
                    else {navigate(-1)}
                }}
            />

            <h1 className="my-3 my-sm-4">Checkout</h1>

            <ProgressBar stage={stage} />

            <div className="w-100 d-flex justify-content-center mt-5">
                {stage === 1 && (
                    <InfoClient
                        onNext={() => setStage(2)}
                        setClientInfo={setClientInfo}
                    />
                )}

                {stage === 2 && (
                    <Shipping
                        onNext={() => setStage(3)}
                        setShippingInfo={setShippingInfo}
                        orderId={orderId}
                        token={token}
                    />
                )}

                {stage === 3 && (
                    <PaymentMethod
                        onNext={() => setStage(4)}
                        setPaymentInfo={setPaymentInfo}
                        orderId={orderId}
                        token={token}
                    />
                )}

                {stage === 4 && (
                    <Review
                        order_data={orderData}
                        onNext={() => {
                            navigate(`/orders/${orderId}`);
                        }}
                    />
                )}
            </div>
        </div>
    );
}