import React, { useEffect } from 'react';
import InputGroup from './InputGroup';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';

const AddShippingAddress = ({onClose, reload=false}) => {
    const { token } = useAuth();
    
    const [formData, setFormData] = useState({
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
            const res = await fetch(`${import.meta.env.VITE_API_URL}/account/shipping-address`, {
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
                if (reload) window.location.reload();
            } else {
                alert(data.error || 'Error adding shipping address.');
            }
        } catch (error) {
            console.error('Error on submission:', error);
            alert('Error connecting to the server.');
        }
    };

    return (
        <div>
            <div className="row mb-2">
                <div className="col-lg-9">
                    <InputGroup
                        id="name"
                        label="Nome"
                        type="text"
                        placeholder="Nome"
                        value={formData.name}
                        onChange={handleChange} />
                </div>
                <div className="col-lg-3">
                    <InputGroup
                        id="phone_number"
                        label="Telefone"
                        type="tel"
                        placeholder="Telefone"
                        value={formData.phone_number}
                        onChange={handleChange} />
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-lg-12">
                    <InputGroup
                        id="street_line"
                        label="Morada"
                        type="text"
                        placeholder="Morada"
                        value={formData.street_line}
                        onChange={handleChange} />
                </div>
                
            </div>
             <div className="row mb-2">
                <div className="col-lg-6">
                    <InputGroup
                        id="floor"
                        label="Andar"
                        type="text"
                        placeholder="Andar"
                        value={formData.floor}
                        onChange={handleChange} />
                </div>
                <div className="col-lg-6">
                    <InputGroup
                        id="postal_code"
                        label="Código Postal"
                        type="text"
                        placeholder="Código Postal"
                        value={formData.postal_code}
                        onChange={handleChange} />
                </div>
                
            </div>
            <div className="class row">
                <div className="col-lg-6">
                    <InputGroup
                        id="city"
                        label="Cidade"
                        type="text"
                        placeholder="Cidade"
                        value={formData.city}
                        onChange={handleChange} />
                </div>
                 <div className="col-lg-6">
                    <InputGroup
                        id="country"
                        label="País"
                        type="text"
                        placeholder="País"
                        value={formData.country}
                        onChange={handleChange} />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col d-flex justify-content-end">
                    <button
                        className='success-button'
                        onClick={async () => {
                            await handleSubmit();
                        } }
                    >
                        Adicionar
                    </button>
                </div>
            </div>

        </div>
    )
  
};

export default AddShippingAddress;