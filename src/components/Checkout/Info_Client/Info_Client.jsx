import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import AddressCard from "../../Cards/AddressCard";
import AddBillingAddress from "../../Inputs/AddBillingAdress";

export default function InfoClient({ onNext, setClientInfo }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone_number, setPhone] = useState('');
    const [fatura, setFatura] = useState(false);
    const [sellectedBillingAddress, setSellectedBillingAddress] = useState(null);
    const [newAddress, setNewAddress] = useState(false);
    const [reloadAddresses, setReloadAddresses] = useState(false);

    const { orderId } = useParams();
    const { token, user } = useAuth();
    console.log("User:", user);

    const handleContinue = async () => {
        if (!token) {
            alert("Token not available. Please log in again.");
            return;
        }

        const personalInfo = { name, email, phone_number, fatura };
        setClientInfo(personalInfo);
        if (!name || !email || !phone_number) {
            alert("Por favor, preencha todos os campos obrigatórios.");
            return;
        }
        if (fatura && !sellectedBillingAddress) {
            alert("Por favor, selecione um endereço de faturação.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/orders/${orderId}/personal-info`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(personalInfo)
            });
            if (!res.ok) {
                const data = await res.json();
                alert(data.error || "Error saving personal information");
                return;
            }
        } catch (err) {
            alert("Error connecting to the server");
            return;
        }
        try {
            const res = await fetch(`http://localhost:5000/orders/${orderId}/billing-address`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    billing_address: sellectedBillingAddress
                })
            });
            if (!res.ok) {
                const data = await res.json();
                alert(data.error || "Error saving billing address");
                return;
            }
        }
        catch (err) {
            alert("Error connecting to the server");
            return;
        }

        onNext();
    };

    // Function to handle the addition of a new address
    const handleAddressAdded = () => {
        setNewAddress(false);
        setReloadAddresses(prev => !prev);
    };

    // useEffect to fetch addresses and update user/billing_address
    useEffect(() => {
        const fetchAddresses = async () => {
            if (!token) return;

            try {
                const response = await fetch('http://localhost:5000/account/billing-address', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch billing addresses");
                }

                const data = await response.json();
                if (Array.isArray(data)) {
                    setSellectedBillingAddress(data[0] || null);
                    if (user) {
                        user.billing_address = data;
                    }
                } else {
                    console.error("Unexpected data format:", data);
                }
            } catch (error) {
                console.error("Error fetching billing addresses:", error);
            }
        };

        fetchAddresses();
    }, [reloadAddresses]);

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

            {fatura && user && Array.isArray(user.billing_address) && user.billing_address.length > 0 ? (
                <div>
                    {user.billing_address.map((address, index) => (
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
                            checked={sellectedBillingAddress === address}
                            onChange={() => setSellectedBillingAddress(address)}
                        />
                    ))}
                    
                    <div>
                        {!newAddress ? (
                            <button className="primary-button" onClick={() => setNewAddress(true)}>
                                Adicionar Endereço de Faturação
                            </button>
                        ) : (
                            <div>
                               
                                <div className="mt-3">
                                    <AddBillingAddress onClose={handleAddressAdded} />
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

            ) : fatura && (
                <div>
                    <p className="text-muted">Não existem endereços de faturação.</p>
                    {!newAddress ? (
                        <button className="primary-button" onClick={() => setNewAddress(true)}>
                            Adicionar Endereço de Faturação
                        </button>
                    ) : (
                        <div>
                            <div className="mt-3">
                                <AddBillingAddress onClose={handleAddressAdded} />
                                <div className="d-flex justify-content-end">
                                    <button className="primary-button" onClick={() => setNewAddress(false)}>
                                        Cancelar
                                    </button>
                                </div>
                                </div>
                            </div>
                            
                    )}
                </div>
            )}
                
                <div className="d-flex justify-content-end mt-3">
                    <div className={`primary-button`} onClick={handleContinue}>
                        <p>Continuar</p>
                    </div>
                </div>
            

            
        </div>
    )
}