import { useNavigate } from 'react-router-dom';
import arrow from '../../assets/images/return_arrow.svg';

export default function Return_Button({ returnAction = false, text = "Voltar", page = "checkout" }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(-1); // Go back to the previous page
    };

    // Usa variáveis CSS para a cor do texto
    const textColor = page === "order" ? "var(--preto)" : "var(--cinzento-claro)";
    const fontSize = page === "order" ? "20px" : "16px"
    return (
        <div
            className='d-flex align-items-center gap-1 my-1'
            style={{ cursor: 'pointer' }}
            onClick={returnAction || handleClick}
        >
            <img src={arrow} alt="" />
            <p style={{
                margin: '0px',
                fontSize: fontSize,
                fontWeight: '600',
                color: textColor // <-- use the variable, not the string!
            }}>
                {text}
            </p>
        </div>
    );
}