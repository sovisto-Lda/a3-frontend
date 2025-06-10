import styles from './ProductCatalogCard.module.css';

export default function ProductCatalogCard({ product }) {
  return (
    <div className={styles.card_produto_catalogo}>
      <img
        src={product.image}
        alt={product.name}
        className={styles.card_img}
      />
      <div className={styles.card_body}>
        <div className={styles.stars}>
          {/* Exemplo de estrelas: */}
          {'★'.repeat(product.rating) + '☆'.repeat(5 - product.rating)}
        </div>
        <div className={styles.card_title}>{product.name}</div>
        <div className={styles.card_price}>{product.price}€</div>
        <div className={styles.card_actions}>
          <button className={styles.fav_btn}>
            {/* Ícone de favoritos */}
            <span role="img" aria-label="favorito">♡</span>
          </button>
          <button className={styles.details_btn}>Detalhes</button>
        </div>
      </div>
    </div>
  );
}