import Stars from '../ProductPage/Stars.jsx';
import './Product_Card.module.css';
import Add_Favourite from '../../assets/images/add_favourites_icon.svg';
import styles from './Product_Card.module.css'
import { useNavigate } from 'react-router-dom';
import Favorite_Button from '../misc/Favourite_Button.jsx';

export default function Product_Card({ code, id, image, name, price, ratingPerc, numRatings }) {
  const navigate = useNavigate()

  return (
    <div className={`d-flex flex-column w-100 ${styles.wrapper}`}>
      <div style={{ aspectRatio: '1.25', overflow: 'hidden' }}>
        <img
          src={image}
          className="img-fluid rounded-1 w-100 h-100 object-fit-cover"
          alt={name}
          onClick={() => {navigate(`/product/${code}`)}}
        />
      </div>
      <div className="d-flex flex-column" style={{}}>
        <div className="mt-2 mb-1">
          <Stars perc={ratingPerc} showCount={false} height="18px" />
        </div>
        
        <div className="d-flex justify-content-between align-items-end">
          <div className="d-flex flex-column" style={{ flexShrink: "1", minWidth: "0"}}>
            <h6 
              className="fw-bold mb-1" 
              style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: "24px"}}
              onClick={() => {navigate(`/product/${code}`)}}
            >
              {name}
            </h6>
            <p className="medium" style={{fontSize: "16px"}}>{price.toFixed(2)}€</p>

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
          <div className="d-flex align-items-center gap-3" style={{height: "fit-content",}}>
            
            <Favorite_Button productId= {id} height={36} />

            <button className="primary-button" style={{height: "fit-content"}} onClick={() => {navigate(`/product/${code}`)}}>

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


