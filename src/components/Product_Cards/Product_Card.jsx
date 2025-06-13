import Stars from '../ProductPage/Stars.jsx';
import './Product_Card.module.css';
import Add_Favourite from '../../assets/images/add_favourites_icon.svg';

export default function Product_Card({ image, name, price, ratingPerc, numRatings }) {
  return (
    <div className="d-flex flex-column w-100">
      <div style={{ aspectRatio: '1.25', overflow: 'hidden' }}>
        <img
          src={image}
          className="img-fluid rounded-1 w-100 h-100 object-fit-cover"
          alt={name}
        />
      </div>

      {/* Info */}
      <div className="d-flex flex-column mt-2">
        <Stars perc={ratingPerc} showCount={false} height="18px" />

        <div className="d-flex justify-content-between align-items-end mt-2 flex-wrap">
          {/* Nome e preço */}
          <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
            <h6
              className="fw-bold mb-1 text-truncate"
              style={{ fontSize: "1rem" }}
              title={name}
            >
              {name}
            </h6>
            <p className="medium mb-0" style={{ fontSize: "0.95rem" }}>
              {price.toFixed(2)}€
            </p>
          </div>

          {/* Ações */}
          <div className="d-flex align-items-center gap-2 mt-2 mt-sm-0">
            <img
              className="icon-button"
              src={Add_Favourite}
              alt="Add to favourites"
              height="28px"
            />
            <button
              className="primary-button"
              style={{ fontSize: "0.85rem", padding: "4px 8px" }}
              onClick={() => {}}
            >
              Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


