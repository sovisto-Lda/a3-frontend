import { useNavigate } from "react-router-dom"

export default function ComingSoon() {
    const navigate = useNavigate()
    
    return (
        <div className="mt-5" style={{height: "60vh"}}>
            <h1>Em breve...</h1>
            <p>O conteúdo que procura estará disponível brevemente.</p>

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