

import styles from './Category_Card.module.css'
import { useNavigate } from 'react-router-dom'

export default function Category_Card({ image, name }) {
    const navigate = useNavigate()

    return (
        <div 
            className={`d-flex flex-column w-100 ${styles.wrapper}`}
            onClick={() => {navigate(`/products?category=${encodeURIComponent(name)}`)}}
        
        >
            <div style={{ aspectRatio: '1.15', overflow: 'hidden'}}>
                <img 
                src={image}
                className="img-fluid rounded-1 w-100 h-100 object-fit-cover" 
                alt={name}>
                </img>
            </div>
            <div className = "d-flex flex-column mt-1" style={{ flexShrink: "1", minWidth: "0"}}>
                <h6 className="fw-bold mb-1" style={{whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: "24px"}}>{name}</h6>
            </div>
        </div>
    )
}

