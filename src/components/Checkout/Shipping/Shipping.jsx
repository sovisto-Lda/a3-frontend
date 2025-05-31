import React, { useEffect, useState } from "react";
import ShippingOptionCard from "./Shipping_Option_Card";
import home_unselected from '../../../assets/images/shipping_home_black.svg';
import home_selected from '../../../assets/images/shipping_home_white.svg';
import pickup_unselected from '../../../assets/images/shipping_pickup_black.svg';
import pickup_selected from '../../../assets/images/shipping_pickup_white.svg';
import store_unselected from '../../../assets/images/shipping_store_black.svg';
import store_selected from '../../../assets/images/shipping_store_white.svg';
import HomeDeliveryOptions from "./Home_Delivery_Options";
import PickupDeliveryOptions from "./Pickup_Delivery_Options";
import StoreDeliveryOptions from "./Store_Delivery_Options";


export default function Shipping({onNext}){
    const [selected, setSelected] = useState(null);


    return (
        <div className="d-flex flex-column gap-3 col-10">
            <h2>Selecione o método de entrega</h2>

            <div className="d-flex flex-column flex-md-row gap-5 mt-3">
                <ShippingOptionCard 
                    icon_unselected={home_unselected}
                    icon_selected={home_selected}
                    name='Entrega ao Domicílio'
                    description='Entrega feita para a morada do cliente.'
                    price='3.99€' 
                    selected={selected === 1}
                    handleSelect={() => setSelected(1)}
                />

                <ShippingOptionCard 
                    icon_unselected={pickup_unselected}
                    icon_selected={pickup_selected}
                    name='Ponto de Recolha'
                    description='Entrega feita para um ponto de recolha.'
                    price='0.99€'
                    selected={selected === 2}
                    handleSelect={() => setSelected(2)} 
                />

                <ShippingOptionCard 
                    icon_unselected={store_unselected}
                    icon_selected={store_selected}
                    name='Reserva em Loja'
                    description='O produto é reservado e o processo de pagamento é todo realizado em loja.'
                    price='3.99€' 
                    selected={selected === 3}
                    handleSelect={() => setSelected(3)}
                />
            </div>

            <div>
                {selected === 1 && <HomeDeliveryOptions />}
                {selected === 2 && <PickupDeliveryOptions />}
                {selected === 3 && <StoreDeliveryOptions />}
            </div>

            {selected !== null &&
                (<div className="d-flex justify-content-end mt-3">
                    <div className={`primary-button`} onClick={onNext}><p>Continuar</p></div>
                </div>)
            }

        </div>
    )
}