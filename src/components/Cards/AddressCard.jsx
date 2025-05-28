import React from "react";
import editIcon from '../../assets/images/edit_icon.svg';
import deleteIcon from '../../assets/images/delete_icon.svg';

const AddressCard = ({type, street_line, nome, floor, city, postal_code, country, phone_number, NIF, onDelete}) => (
    <>
        <div className="address-card mb-5 p-4 shadow-sm">
            <div className="row">
                <div className="col-md-8">
                <h2>
                    {nome}
                </h2>

                {type === 'billing' && NIF && (
                <p className="mb-1 ">
                    NIF: {NIF}
                </p>
                )}

                <p className="mb-1">
                    {street_line} - {floor}
                </p>
                
                <p className="mb-1">
                    {postal_code} {city}, {country}
                </p>

                <p className="mb-1">
                    +351 {phone_number}
                </p>
            </div>
            <div className="col-md-4 justify-content-end d-flex align-items-center">
                <div className="row">
                    <div className="col-6">
                        <button className="icon-button">
                            <img src={editIcon} alt="Editar" />
                        </button>       
                    </div>
                    <div className="col-6">
                        <button className="icon-button" onClick={onDelete}>
                            <img src={deleteIcon} alt="Eliminar" />
                        </button>
                    </div>
                </div>
                
            </div>

            </div>
            
            
            
            
            
        </div>
    </>
);

export default AddressCard;