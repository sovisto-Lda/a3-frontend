import Order_Card from "../components/Orders/Order_Card"
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const {token} = useAuth();

    
   


    const fetchOrders = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    console.error("Error getting orders", res.statusText);
                    setLoading(false);
                    return;
                }

                const data = await res.json();
                setOrders(data || []);

            } catch (err) {
                console.error("Error on getting orders:", err);
            } finally {
                setLoading(false);
            }
        };


    useEffect(() => {
        if (!token) return;

        fetchOrders();
    }, [token]);


    if (loading) return <p>A carregar...</p>;

    return (
        <div>
            <div className="orders-container mt-4">
                <div className="row mb-3">
                    <div className="col">
                        <h1>Os Meus Pedidos</h1>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <h2 style={{ textDecoration: "underline" }}>Online</h2>
                    </div>
                </div>
                {orders.length === 0 ? (
                    <p>Ainda não efetuou nenhuma encomenda.</p>
                ) : (
                    <>
                        {orders.map(order => (
                            <Order_Card
                                key={order._id?.$oid || order._id}
                                number={order.code}
                                status={order.state}
                                price={order.total_price}
                                id={order._id}
                                date={
                                    order.date_processed
                                        ? new Date(order.date_processed).toLocaleDateString('pt-PT')
                                        : ""
                                }
                                onInfo={() => alert(`Ver detalhes da encomenda ${order.code}`)}
                            />
                        ))}
                        <a
                            className="text-center mt-5 d-block text-dark"
                            style={{ textDecoration: "underline" }}
                            href="#"
                        >
                            Não encontra o seu pedido? Talvez tenha comprado como convidado. Clique aqui para o ajudarmos a encontrar!
                        </a>
                    </>
                )}
            </div>
        </div>
    )
}