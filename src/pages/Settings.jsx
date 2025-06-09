// alterar palavra passe, terminar sessão, eliminar conta

import { useNavigate } from "react-router-dom";
import InputGroup from "../components/Inputs/InputGroup"

export default function Settings() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div>
            <div className="account-container mt-4">
                <div className="row mb-3 align-items-center">
                    <div className="col">
                        <h1>Definições de conta</h1>
                    </div>
                    <div className="col-auto d-flex justify-content-end">
                        <button className="primary-button" onClick={handleLogout}>Terminar Sessão</button>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className='col-md-6 mb-3'>
                        <InputGroup
                            id="password"
                            label="Palavra-Passe"
                            type="text"
                            placeholder="***********"
                            value="***********"
                            onChange={() => {}}
                            editable={false}
                        />
                        <div className="d-flex justify-content-end gap-2 mt-3">
                            <button className="primary-button">Alterar Palavra-Passe</button>
                            <button className="danger-button">Eliminar Conta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}