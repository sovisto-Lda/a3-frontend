import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import AddressCard from "../../Cards/AddressCard";

export default function HomeDeliveryOptions({ selectedAddress, setSelectedAddress }) {
    const { token } = useAuth();
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const res = await fetch("http://localhost:5000/account", {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                if (!res.ok) throw new Error("Erro ao carregar endereços");
                const data = await res.json();
                setAddresses(data.shipping_address || []);
            } catch (err) {
                setAddresses([]);
            }
        };
        if (token) fetchAddresses();
    }, [token]);

    return (
        <div className="d-flex flex-column gap-4 mt-5">
            <h2 className="mb-2">Endereços de Entrega</h2>
            {addresses.length === 0 && <p>Não existem endereços de entrega guardados.</p>}
            {addresses.map((address, idx) => (
                <div key={idx}>
                    <div className="row align-items-center">
                        <div className="col-md-1 gap-2 d-flex justify-content-left mb-4">
                            <input
                                className="form-check-input custom-checkbox"
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    border: '3px solid black'
                                }}
                                type="checkbox"
                                checked={selectedAddress === address}
                                onChange={() => setSelectedAddress(address)}
                            />
                        </div>
                        <div className="col">
                            <AddressCard {...address} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}