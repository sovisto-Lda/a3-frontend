import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import AddressCard from "../../Cards/AddressCard";
import AddShippingAdress from "../../Inputs/AddShippingAdress";


export default function HomeDeliveryOptions({ selectedAddress, setSelectedAddress }) {
    const { token, user } = useAuth();
    const [newAddress, setNewAddress] = useState(false);
    const [reloadAddresses, setReloadAddresses] = useState(false);


    // Effect to initialize selectedAddress with the first shipping address if not already set
    useEffect(() => {
        if (
            user &&
            Array.isArray(user.shipping_address) &&
            user.shipping_address.length > 0 &&
            !selectedAddress
        ) {
            setSelectedAddress(user.shipping_address[0]);
        }
    }, [user, selectedAddress, setSelectedAddress, reloadAddresses]);

    const handleAddressAdded = () => {
        setNewAddress(false);
        setReloadAddresses(prev => !prev);
    };


    // Fetch shipping addresses from the backend
    const fetchAddresses = async () => {
            if (!token) return;

            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/account/shipping-address`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch shipping addresses");
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setSelectedAddress(data[0] || null);
                    if (user) {
                        user.shipping_address = data;
                    }
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching shipping addresses:", error);
            }
        };


    useEffect(() => {
        fetchAddresses();
    }, [reloadAddresses]);

    return (
        <div className="d-flex flex-column gap-4 mt-5">
            <h2 className="mb-2">Endereços de Entrega</h2>

            { user && Array.isArray(user.shipping_address) && user.shipping_address.length > 0 ? (
                <div>
                    {user.shipping_address.map((address, index) => (
                        <AddressCard
                            key={address._id || index}
                            type="shipping"
                            {...address}
                            onDelete={() => {}}
                            allowEdit={false}
                            allowSelect={true}
                            checked={selectedAddress && selectedAddress._id === address._id}
                            onChange={() => setSelectedAddress(address)}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-muted">Não existem endereços de entrega.</p>
                </div>
            )}

            <div>
                {!newAddress ? (
                    <button className="primary-button" onClick={() => setNewAddress(true)}>
                        Adicionar Endereço de Entrega
                    </button>
                ) : (
                    <div>

                        <div className="mt-3">
                            <AddShippingAdress onClose={handleAddressAdded} />
                        </div>
                        <div className="d-flex justify-content-end">
                            <button className="primary-button" onClick={() => setNewAddress(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            


            
        </div>
    );
}