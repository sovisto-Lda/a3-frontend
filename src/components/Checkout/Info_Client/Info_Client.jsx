import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import AddressCard from "../../Cards/AddressCard";
import AddBillingAddress from "../../Inputs/AddBillingAdress";

export default function InfoClient({ clientInfo, setClientInfo, onNext }) {
    const { token, user } = useAuth();
    const { orderId } = useParams();

    const [name, setName] = useState(clientInfo.name || '');
    const [email, setEmail] = useState(clientInfo.email || '');
    const [phone_number, setPhone] = useState(clientInfo.phone_number || '');
    const [fatura, setFatura] = useState(clientInfo.fatura || false);
    const [sellectedBillingAddress, setSellectedBillingAddress] = useState(clientInfo.billing_address || null);
    const [newAddress, setNewAddress] = useState(false);
    const [reloadAddresses, setReloadAddresses] = useState(false);

    // Effect to initialize form fields with user data
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPhone(user.phone_number || '');
            setSellectedBillingAddress(user.billing_address?.[0] || null);
        }
    }, [user]);

    // Effect to fetch billing addresses when component mounts or reloadAddresses changes
    useEffect(() => {
        if (!token) return;
        fetch(`${import.meta.env.VITE_API_URL}/account/billing-address`, {
        headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (Array.isArray(data)) {
            setSellectedBillingAddress(data[0] || null);
            if (user) user.billing_address = data;
            }
        })
        .catch(err => console.error("Error fetching billing addresses:", err));
    }, [reloadAddresses]);


    // Effect to update clientInfo state when form fields change
    const handleAddressAdded = () => {
        setNewAddress(false);
        setReloadAddresses(prev => !prev);
    };


    // Function to save personal information
    const savePersonalInfo = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/personal-info`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, email, phone_number, fatura })
        });
        return res.ok ? null : await res.json();
    };


    // Function to save billing address
    const saveBillingAddress = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/orders/${orderId}/billing-address`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ billing_address: sellectedBillingAddress })
        });
        return res.ok ? null : await res.json();
    };


    // Function to handle continue button click
    const handleContinue = async () => {
        if (!token) return alert("Token not available. Please log in again.");
        if (!name || !email || !phone_number) return alert("Por favor, preencha todos os campos obrigatórios.");
        if (fatura && !sellectedBillingAddress) return alert("Por favor, selecione um endereço de faturação.");

        const personalErr = await savePersonalInfo();
        if (personalErr) return alert(personalErr.error || "Erro ao guardar os dados pessoais.");

        if (fatura) {
        const billingErr = await saveBillingAddress();
        if (billingErr) return alert(billingErr.error || "Erro ao guardar endereço de faturação.");
        }

        onNext();
    };


    // Function to render billing section
    const renderBillingSection = () => {
        if (!fatura) return null;

        const hasAddresses = user?.billing_address?.length > 0;

        return (
        <div>
            {hasAddresses && user.billing_address.map((address, i) => (
            <AddressCard
                key={i}
                {...address}
                type="billing"
                allowEdit={false}
                allowSelect={true}
                checked={sellectedBillingAddress === address}
                onChange={() => setSellectedBillingAddress(address)}
                onDelete={() => {}}
            />
            ))}

            {!hasAddresses && <p className="text-muted">Não existem endereços de faturação.</p>}

            {!newAddress ? (
            <button className="primary-button" onClick={() => setNewAddress(true)}>
                Adicionar Endereço de Faturação
            </button>
            ) : (
            <div className="mt-3">
                <AddBillingAddress onClose={handleAddressAdded} />
                <div className="d-flex justify-content-end">
                <button className="primary-button" onClick={() => setNewAddress(false)}>
                    Cancelar
                </button>
                </div>
            </div>
            )}
        </div>
        );
    };

    return (
        <div className="d-flex flex-column gap-3 col-md-6 col-10">
            <h2>Dados Pessoais</h2>

            <div>
                <div className="inputGroup mb-3">
                    <label htmlFor="name">Nome</label>
                    <input
                        id='name'
                        className="form-control form-control-md inputField"
                        type="name"
                        placeholder="Nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="inputGroup mb-4">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="form-control form-control-md inputField"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="inputGroup mb-4">
                    <label htmlFor="phone_number">Telefone</label>
                    <input
                        id="phone_number"
                        className="form-control form-control-md inputField"
                        type="phone_number"
                        placeholder="Telefone"
                        value={phone_number}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
            </div>

            <div>
                <div className="form-check d-flex align-items-center gap-2">
                    <input
                        className="form-check-input custom-checkbox"
                        style={{
                            width: '32px',
                            height: '32px',
                            border: '3px solid black'
                        }}
                        type="checkbox"
                        id="fatura"
                        checked={fatura}
                        onChange={() => setFatura(!fatura)}
                    />
                    <label className="form-check-label m-0" htmlFor="fatura">
                        Deseja fatura?
                    </label>
                </div>
            </div>

            {renderBillingSection()}

            <div className="d-flex justify-content-end mt-3">
                <div className={`primary-button`} onClick={handleContinue}>
                    <p>Continuar</p>
                </div>
            </div>

        </div>
    )
}