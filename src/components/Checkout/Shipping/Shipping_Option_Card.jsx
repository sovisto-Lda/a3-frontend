import styles from './Shipping.module.css';

export default function ShippingOptionCard({icon_unselected, icon_selected, name, description, price, selected, handleSelect}) {
    return (
        <div 
        className={
            `
            d-flex flex-column w-100 justify-content-between text-center p-3 rounded
            ${selected ? styles.selected : styles.unselected}
            ${selected ? '' : styles.option_card_wrapper_unselected }            
            `
        } 
        onClick={handleSelect}
        >
            <div>
                <img src={selected ? icon_selected : icon_unselected}style={{height: '64px'}} alt="" />
            
                <h2
                >
                    {name}
                </h2>

                <p 
                className={`mt-2`}
                >
                    {description}
                </p>
            </div>
            
            
            <div className={`${selected ? 'active-button' : 'primary-button'} mt-5`}><h2>{price}</h2></div>
        </div>
    )
}