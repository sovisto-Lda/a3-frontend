import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import InputGroup from "../components/Inputs/InputGroup";
import AddBillingAddress from "../components/Inputs/AddBillingAdress";
import AddShippingAddress from "../components/Inputs/AddShippingAdress";
import AddressCard from "../components/Cards/AddressCard";

export default function Account() {
    const navigate = useNavigate();
    const { token, decodedUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [showBillingForm, setShowBillingForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);

    useEffect(() => {
        if (!token) return;

        fetch(`${import.meta.env.VITE_API_URL}/account`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setUserData(data))
            .catch(err => console.error("Fetch error", err));
    }, [token]);
    
    console.log(token)
    if (!userData) return <p>Loading...</p>;
    
    // Função para remover endereço de faturação pelo índice, enviando um DELETE ao backend com o _id
    const handleDeleteBillingAddress = async (indexToDelete) => {
        const addressToDelete = userData.billing_address[indexToDelete];
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/account/billing-address`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ _id: addressToDelete._id })
            });

            if (!response.ok) throw new Error("Erro ao apagar o endereço");

            const updatedAddresses = userData.billing_address.filter((_, index) => index !== indexToDelete);
            setUserData({ ...userData, billing_address: updatedAddresses });
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    // Função para remover endereço de entrega pelo índice, enviando um DELETE ao backend com o _id
    const handleDeleteShippingAddress = async (indexToDelete) => {
        const addressToDelete = userData.shipping_address[indexToDelete];
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/account/shipping-address`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ _id: addressToDelete._id })
            });

            if (!response.ok) throw new Error("Erro ao apagar o endereço");

            const updatedAddresses = userData.shipping_address.filter((_, index) => index !== indexToDelete);
            setUserData({ ...userData, shipping_address: updatedAddresses });
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    return (
        <div className="account-container mt-4">
            <div className="row mb-3">
                <div className="col">
                    <h1>Perfil</h1>
                </div>
            </div>
            <section className="personal-data">
                <div className="row mb-3">
                    <div className="col">
                        <h2>Dados Pessoais</h2>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <InputGroup
                            id="name"
                            label="Nome"
                            type="text"
                            placeholder="Nome"
                            value={userData.name}
                            onChange={() => {}}
                            editable={false}
                        />
                        <InputGroup
                            id="phone_number"
                            label="Telefone"
                            type="tel"
                            placeholder="Nº Telefone"
                            value={userData.phone_number}
                            onChange={() => {}}
                            editable={false}
                        />
                    </div>
                    <div className="col-md-6">
                        <InputGroup
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={() => {}}
                            editable={false}
                        />
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col d-flex justify-content-end">
                        <button className="primary-button" onClick={() => navigate('#')}>
                            Editar
                        </button>
                    </div>
                </div>
            </section>

            <section className="enderecos_faturacao">
                <div className="row mb-2">
                    <div className="col">
                        <h2>Endereços de Faturação</h2>
                    </div>
                </div>
                <div className="row mb-2">
                    {userData.billing_address && userData.billing_address.length > 0 ? (
                        userData.billing_address.map((address, index) => (
                            <div className="col-md-12" key={index}>
                                <AddressCard
                                    type="billing"
                                    {...address}
                                    onDelete={() => handleDeleteBillingAddress(index)}
                                />
                            </div>
                        ))
                    ) : (
                        <p>Ainda não tem nenhum endereço de faturação.</p>
                    )}
                </div>
                {showBillingForm && <AddBillingAddress reload={true} onClose={() => setShowBillingForm(false)} />}
                <div className="row mb-3">
                    <div className="col d-flex justify-content-end">
                        <button className="primary-button" onClick={() => setShowBillingForm(!showBillingForm)}>
                            {showBillingForm ? "Fechar" : "Adicionar Endereço de Faturação"}
                        </button>
                    </div>
                </div>
                
            </section>

            <section className="shipping_addresses">
                <div className="row mb-2">
                    <div className="col">
                        <h2>Endereços de Entrega</h2>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                        {userData.shipping_address && userData.shipping_address.length > 0 ? (
                            userData.shipping_address.map((address, index) => (
                                <AddressCard
                                    key={index}
                                    type="shipping"
                                    {...address}
                                    onDelete={() => handleDeleteShippingAddress(index)}
                                />
                            ))
                        ) : (
                            <p>Ainda não tem nenhum endereço de faturação.</p>
                        )}                       
                    </div>
                </div>
                {showAddressForm && <AddShippingAddress reload={true} />}
                <div className="row">
                    <div className="col d-flex justify-content-end">
                        <button className="primary-button" onClick={() => setShowAddressForm(!showAddressForm)}>
                            Adicionar Endereço de Entrega
                        </button>
                    </div>
                </div>
            </section>


        </div>
    );
}