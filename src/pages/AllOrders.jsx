import Order_Card from "../components/Orders/Order_Card"
import { useEffect, useState } from "react";

export default function AllOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:5000/orders", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => {
                setOrders(data || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

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