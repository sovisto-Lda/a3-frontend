import delete_icon from '../../../../assets/images/delete.svg';
import styles from '../Shopping_Card.module.css';

export default function ProductCard({product}) {
    return (
        <div className='d-flex w-100 h-100 align-items-center'>
            <div className='d-flex col-5 gap-3 align-items-center'>

                <img src={product.images[0]} alt="" className={styles.product_image}/>

                <div className='d-flex flex-column align-items-start justify-content-center'>
                    <p className={styles.product_name}>{`${product.name} #${product.code}`}</p>
                    <p className={styles.product_color}>{product.colors[0]}</p>
                </div>
            </div>

            <p className={`col-3 text-center ${styles.item_bold}`}>2</p>

            <p className={`col-2 text-center ${styles.item_bold}`}>{`${product.price}€`}</p>

            <div  className="col-2 d-flex justify-content-end pe-0 pe-sm-3" >
                <img src={delete_icon} alt=""/>
            </div>
        </div>
    )
}