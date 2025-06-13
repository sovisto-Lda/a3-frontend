import Stars from '../ProductPage/Stars.jsx';
import './Product_Card.module.css';
import Add_Favourite from '../../assets/images/add_favourites_icon.svg';
import { FaHeart } from "react-icons/fa";
import styles from './Product_Card.module.css'
import { useNavigate } from 'react-router-dom';

export default function Product_Card({ code, image, name, price, ratingPerc, numRatings }) {
  const navigate = useNavigate()

  return (
    <div className={`d-flex flex-column w-100 ${styles.wrapper}`}
      onClick={() => {navigate(`/product/${code}`)}}
    >
      <div style={{ aspectRatio: '1.25', overflow: 'hidden'}}>
        <img
          src={image}
          className="img-fluid rounded-1 w-100 h-100 object-fit-cover"
          alt={name}
        />
      </div>
      <div className="d-flex flex-column" style={{}}>
        <div className="mt-2 mb-1">
          <Stars perc={ratingPerc} showCount={false} height="18px" />
        </div>
        
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex flex-column" style={{ flexShrink: "1", minWidth: "0"}}>
            <h6 className="fw-bold mb-1" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: "24px"}}>{name}</h6>
            <p className="medium" style={{fontSize: "16px"}}>{price.toFixed(2)}€</p>
          </div>
          <div className="d-flex align-items-center gap-3" style={{height: "fit-content",}}>
            
            <img
              className="icon-button"
              src={Add_Favourite}
              alt="Add to favourites"
              height= "32px"
            />
            <button className="primary-button" style={{height: "fit-content"}} onClick={() => {}}>
              Detalhes
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}

