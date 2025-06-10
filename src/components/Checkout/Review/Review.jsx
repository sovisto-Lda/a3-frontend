import DividerLine from "../../misc/Divider_Line";

export default function Review({ order_data, onNext }) {
    if (!order_data) {
        return <div>Loading...</div>;
    }

    // Calcular total de artigos e preço total
    const totalItems = order_data.products?.reduce((acc, item) => acc + item.quantity, 0) || 0;
    const shippingPrice = order_data.shipping_method === "Home Delivery"
        ? 3.99
        : order_data.shipping_method === "Pick-Up Point"
            ? 0.99
            : 3.99; // Ajusta conforme necessário

    return (
        <div className="d-flex flex-column col-10">

            <div>
                <h2>Resumo</h2>
                <DividerLine />
            </div>

            {/* total items */}
            <div className="d-flex justify-content-between py-4">
                <p>{totalItems} Artigos</p>
                <p>{order_data.total_price}€</p>
            </div>

            {/* items list */}
            <div className="d-flex flex-column gap-2" style={{color: 'var(--cinzento)'}}>
                {order_data.products?.map((item, idx) => (
                    <div className="d-flex justify-content-between" key={idx}>
                        <p>{item.product?.name || `Produto ${idx + 1}`}</p>
                        <p>{(item.product?.price || 0).toFixed(2)}€</p>
                    </div>
                ))}
            </div>

            {/* shipping */}
            <div className="d-flex justify-content-between py-2">
                <p>Envio</p>
                <p>{shippingPrice.toFixed(2)}€</p>
            </div>            

            {/* total */}
            <div className="d-flex justify-content-between py-4">
                <p>Total, com taxas aplicadas</p>
                <p>{(order_data.total_price + shippingPrice).toFixed(2)}€</p>
            </div>            

            <DividerLine />

            <div className="d-flex flex-column w-100 gap-4 mt-4">
                <div className="w-100 d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                    {/* shipment type */}
                    <div className="d-flex flex-column gap-2 w-100">
                        <h2>Tipo de Envio</h2>
                        <p>
                            {order_data.shipping_method === "Home Delivery"
                                ? "Domicílio"
                                : order_data.shipping_method || "—"}
                        </p>
                    </div>

                    {/* address */}
                    <div className="d-flex flex-column gap-2 w-100">
                        <h2>Endereço de Envio</h2>
                        <p>
                            {order_data.shipping_address
                                ? (
                                    <>
                                        {order_data.shipping_address.name}
                                        <br />
                                        <span>
                                            {order_data.shipping_address.street_line}, {order_data.shipping_address.postal_code} {order_data.shipping_address.city}, {order_data.shipping_address.country}
                                        </span>
                                    </>
                                )
                                : "—"}
                        </p>
                    </div>
                </div>

                <div className="w-100 d-flex flex-column flex-sm-row gap-3 gap-sm-5">
                    {/* payment */}
                    <div className="d-flex flex-column gap-2 w-100">
                        <h2>Método de Pagamento</h2>
                        
                        <div className="d-flex align-items-center gap-3">
                            <p className="mb-0">{order_data.payment_method || "—"}</p>
                            
                        </div>
                    </div>

                    {/* process date */}
                    <div className="d-flex flex-column gap-2 w-100">
                        <h2>Processado a</h2>
                        <p>
                            {order_data.date_processed && !isNaN(new Date(order_data.date_processed))
                                ? new Date(order_data.date_processed).toLocaleDateString()
                                : "—"}
                        </p>
                    </div>
                </div>
            </div>

            <button
                className={`success-button w-100 mt-5`}
                type="button"
                style={{ height: '38px' }}
                onClick={onNext}
            >
                <p>Confirmar Compra</p>
            </button>

        </div>
    )
}