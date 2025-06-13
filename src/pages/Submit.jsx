import { useNavigate } from "react-router-dom"

export default function Submit() {
    const navigate = useNavigate()

    return (
         <div className="mt-5" style={{height: "60vh"}}>
            <h1>Obrigado</h1>
            <p>Entraremos em contacto consigo brevemente.</p>

            <div
                style={{width: 'fit-content'}}
                className="primary-button mt-5"
                onClick={() => navigate('/')}
            >
                Voltar à página principal
            </div>
        </div>
    )
}