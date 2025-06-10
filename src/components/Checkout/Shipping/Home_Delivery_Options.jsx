import AddressCard from "../../Cards/AddressCard"
import { useAuth } from "../../../hooks/useAuth"
import { useState } from 'react';

export default function HomeDeliveryOptions() {
    const User = useAuth()

    return (
        <div className="d-flex flex-column gap-4 mt-5">
            <h2>Endereços de Entrega</h2>
            {User.user && User.user.shipping_address.map((address, index) => (
                <AddressCard
                    key={index}
                    type="shipping"
                    street_line={address.street_line}
                    nome={address.name}
                    floor={address.floor}
                    city={address.city}
                    postal_code={address.postal_code}
                    country={address.country}
                    phone_number={address.phone_number}
                    onDelete={() => {}}
                    allowEdit={false}
                    allowSelect={true}
                />
            ))}
            
        </div>
    )
}