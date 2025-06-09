import Stars from '../ProductPage/Stars.jsx';
import { FaHeart } from "react-icons/fa";

export default function Product_Card({ image, name, price, ratingPerc, numRatings }) {
  return (
    <div className="h-100 d-flex flex-column">
      <img
        src={image}
        className="img-fluid rounded-1"
        alt={name}
        style={{ display: "block" }}
      />
      <div className="px-3 pt-3 d-flex flex-column flex-grow-1">
        <Stars perc={ratingPerc} showCount={false} />

        <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mt-3 flex-grow-1">
          <div>
            <h6 className="fw-bold mb-1">{name}</h6>
            <p className="fs-5 mb-0">{price.toFixed(2)}€</p>
          </div>
          <div className="d-flex flex-row justify-content-end align-items-center mt-auto gap-2">
            <button className="btn p-0 border-0 bg-transparent">
              <FaHeart size={28} />
            </button>
            <button className="btn btn-dark btn-lg rounded-2">Detalhes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

