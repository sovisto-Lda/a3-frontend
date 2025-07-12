

import { useNavigate } from "react-router-dom";
import InputGroup from "../components/Inputs/InputGroup"

export default function Settings() {
    const navigate = useNavigate();

    const handleDeleteAccount = async () => {
        const confirmDelete = window.confirm("Tem a certeza que quer eliminar a sua conta? Esta ação é irreversível.");
        if (!confirmDelete) return;

        const token = localStorage.getItem('token');
        try{
            const response = await fetch(`${import.meta.env.VITE_API_URL}/account`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.ok){
                localStorage.removeItem('token');
                navigate('/register');
            } else{
                alert('Erro ao eliminar conta.');
            }
        } catch (error){
            alert('Não foi possível eliminar a conta.')
        }
    };


    return (
        <div>
            <div className="account-container mt-4">
                <div className="row mb-3 align-items-center">
                    <div className="col">
                        <h1>Definições de conta</h1>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className='col-md-6 mb-3'>
                        <InputGroup
                            id="password"
                            label="Palavra-passe"
                            type="text"
                            placeholder="***********"
                            value="***********"
                            onChange={() => {}}
                            editable={false}
                        />
                        <div className="d-flex justify-content-end gap-2 mt-4">
                            <button className="primary-button">Alterar Palavra-Passe</button>
                            <button className="danger-button" onClick={handleDeleteAccount}>Eliminar Conta</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}