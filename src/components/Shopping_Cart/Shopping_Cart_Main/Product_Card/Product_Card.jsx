import delete_icon from '../../../../assets/images/delete.svg';
import { useAuth } from '../../../../hooks/useAuth';
import styles from '../Shopping_Card.module.css';

export default function ProductCard({shoppingCartProduct}) {
    const { token, decodedUser } = useAuth();
    
    const handleDeleteProduct = () => {
        console.log('Delete product');

        // Implement delete functionality here
        fetch(`http://localhost:5000/shopping-cart/${shoppingCartProduct.product}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ userId: decodedUser.id })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete product');
            }
            return response.json();
        })
    }
   

    return (
        <div className='d-flex w-100 h-100 align-items-center'>
            <div className='d-flex col-5 gap-3 align-items-center'>

                <img 
                src={shoppingCartProduct?.productDetails?.images?.[0] || 'fallback.jpg'} 
                alt={shoppingCartProduct?.productDetails?.name || 'Produto'} 
                className={styles.product_image}
                />
                <div className='d-flex flex-column align-items-start justify-content-center'>
                    <p className={styles.product_name}>{`${shoppingCartProduct?.productDetails?.name || 'Sem nome'} #${shoppingCartProduct?.productDetails?.code}`}</p>
                    <p className={styles.product_color}>{shoppingCartProduct?.productDetails?.colors?.[0] || 'Sem cor'}</p>
                </div>
            </div>

            <p className={`col-3 text-center ${styles.item_bold}`}>{shoppingCartProduct.quantity}</p>

            <p className={`col-2 text-center ${styles.item_bold}`}>{`${shoppingCartProduct.total_price}€`}</p>

            <div  className="col-2 d-flex justify-content-end pe-0 pe-sm-3" >
                {/* delete the item and reload the page */}

                <button
                    className='icon-button'
                    onClick={() => {
                        handleDeleteProduct();
                        window.location.reload();
                    }}
                >
                    <img src={delete_icon} alt=""/>
                </button>
                
            </div>
        </div>
    )
}