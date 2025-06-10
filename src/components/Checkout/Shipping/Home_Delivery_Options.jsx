import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import AddressCard from "../../Cards/AddressCard";

export default function HomeDeliveryOptions({ selectedAddress, setSelectedAddress }) {
    const { token, user} = useAuth();

    return (
        <div className="d-flex flex-column gap-4 mt-5">
            <h2 className="mb-2">Endereços de Entrega</h2>

            { user && Array.isArray(user.shipping_address) && user.shipping_address.length > 0 ? (
                <div>
                    {user.shipping_address.map((address, index) => (
                        <AddressCard
                            key={index}
                            type="billing"
                            street_line={address.street_line}
                            nome={address.name}
                            floor={address.floor}
                            city={address.city}
                            postal_code={address.postal_code}
                            country={address.country}
                            phone_number={address.phone_number}
                            NIF={address.NIF}
                            onDelete={() => {}}
                            allowEdit={false}
                            allowSelect={true}
                            checked={selectedAddress === address}
                            onChange={() => setSelectedAddress(address)}
                        />
                    ))}
                </div>
            ) : (
                <div>
                    <p className="text-muted">Não existem endereços de entrega.</p>
                </div>
            )}


            {/* {user && Array.isArray(user.shipping_address) && user.shipping_address.length > 0  }
            {user.shipping_address.length === 0 && <p>Não existem endereços de entrega guardados.</p>}
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
                            <AddressCard 
                            allowSelect={true} 
                            {...address } 
                            checked={selectedAddress === address} 
                            onChange={() => setSelectedAddress(address)}
 />
                        </div>
                    </div>
                </div> */}
            {/* ))} */}
        </div>
    );
}