import { useNavigate } from 'react-router-dom';
import styles from './Order_Card.module.css';

 // Função util para traduzir e escolher cor
    function getStateInfo(state) {
    switch (state) {
        case "Pending Payment":
            return { label: "Pendente", color: "var(--alerta)" };
        case "Payment Confirmed":
            return { label: "Pagamento confirmado", color: "var(--info-hover)" };
        case "Processing":
            return { label: "Em processamento", color: "var(--sucesso)" };
        case "Shipped":
            return { label: "Enviado", color: "var(--info-hover)" };
        case "Completed":
            return { label: "Entregue", color: "var(--sucesso)" };
        case "Cancelled":
            return { label: "Cancelado", color: "var(--perigo)" };
        default:
            return { label: state, color: "var(--cinzento-claro)" };
    }
}

export default function OrderCard({ id, number, status, price, date, onInfo }) {
  const navigate = useNavigate();

  return (
    <div className={`card mb-3 ${styles.cardContainer}`}>
      <div className="card-body d-flex justify-content-between align-items-center p-3">
        <div>
          <div className={styles.orderNumber}>Nº {number}</div>
          <div style={{color: getStateInfo(status).color}}>{getStateInfo(status).label}</div>
          <div className={styles.price}>{price}€</div>
          <div className={styles.date}>{date}</div>
        </div>
        <button className="btn btn-dark" onClick={() => navigate(`/orders/${id}`)}>
          Ver Informações
        </button>
      </div>
    </div>
  );
}