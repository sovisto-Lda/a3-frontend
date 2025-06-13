import React from 'react';
import InputGroup from './InputGroup';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const AddBillingAddress = ({ onClose }) => {
    const { token } = useAuth();

    const [formData, setFormData] = useState({
        NIF: '',
        phone_number: '',
        street_line: '',
        floor: '',
        postal_code: '',
        city: '',
        country: '',
        name: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async () => {
        try {
            const res = await fetch('http://localhost:5000/account/billing-address', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (res.ok) {
                if (typeof onClose === 'function') onClose();
            } else {
                alert(data.error || 'Error adding address.');
            }
        } catch (error) {
            console.error('Error on submission:', error);
            alert('Error connecting to the server.');
        }
    };

    return (
        <div>
            <div className="row mb-2 flex-wrap">
                <div className="col-xl-3">
                    <InputGroup
                        id="name"
                        label="Nome"
                        type="text"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-xl-3">
                    <InputGroup
                        id="NIF"
                        label="NIF"
                        type="text"
                        placeholder="NIF"
                        value={formData.NIF}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-xl-3">
                    <InputGroup
                        id="phone_number"
                        label="Telefone"
                        type="tel"
                        placeholder="Telefone"
                        value={formData.phone_number}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-xl-6">
                    <InputGroup
                        id="street_line"
                        label="Morada"
                        type="text"
                        placeholder="Morada"
                        value={formData.street_line}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-xl-3">
                    <InputGroup
                        id="floor"
                        label="Andar"
                        type="text"
                        placeholder="Andar"
                        value={formData.floor}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-xl-3">
                    <InputGroup
                        id="postal_code"
                        label="Código Postal"
                        type="text"
                        placeholder="Código Postal"
                        value={formData.postal_code}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-xl-3">
                    <InputGroup
                        id="city"
                        label="Cidade"
                        type="text"
                        placeholder="Cidade"
                        value={formData.city}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-xl-3">
                    <InputGroup
                        id="country"
                        label="País"
                        type="text"
                        placeholder="País"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col d-flex justify-content-end">
                    <button
                        className='success-button'
                        onClick={async () => {
                            await handleSubmit();
                        }}
                    >
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBillingAddress;