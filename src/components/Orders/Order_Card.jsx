import { useNavigate } from 'react-router-dom';
import styles from './Order_Card.module.css';

function getStatusClass(status) {
  if (
    status === "Pagamento Confirmado" ||
    status === "Em Processamento" ||
    status === "Enviado"
  ) {
    return styles.statusProcessamento;
  }
  if (status === "Entregue") {
    return styles.statusPendente;
  }
  if (status === "Cancelado") {
    return styles.statusCancelada;
  }
  return "";
}

export default function OrderCard({ id, number, status, price, date, onInfo }) {
  const navigate = useNavigate();

  return (
    <div className={`card mb-3 ${styles.cardContainer}`}>
      <div className="card-body d-flex justify-content-between align-items-center p-3">
        <div>
          <div className={styles.orderNumber}>Nº {number}</div>
          <div className={`${styles.status} ${getStatusClass(status)}`}>{status}</div>
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