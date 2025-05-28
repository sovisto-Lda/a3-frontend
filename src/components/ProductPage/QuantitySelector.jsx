import styles from './ProductMain.module.css';
import React, { useEffect, useState, useRef } from "react";
import addButton from '../../assets/images/add_box_icon.svg';
import removeButton from '../../assets/images/remove_box_icon.svg';

export default function QuantitySelector({quantity, setQuantity, stock=0}) {
    return (
        <div className='d-flex flex-column justify-content-between gap-2'>
            <p className={styles.price_qnt_titles}>Quantidade</p>
            <div className='d-flex align-items-center justify-items-center h-100 gap-3' > {/* quantity selector and remaining */}
                <div className='d-flex align-items-center gap-2'> {/* quantity selector */}
                    <img 
                        src={removeButton} 
                        alt="" 
                        className={styles.qnt_button}
                        onClick={() => {if(quantity > 1) {setQuantity(quantity - 1)}}}
                    />
                    
                    <p className={styles.qnt_text}>{quantity}</p>
                    
                    <img 
                        src={addButton} 
                        alt="" 
                        className={styles.qnt_button}
                        onClick={() => {{setQuantity(quantity + 1)}}}
                    />
                </div>

                <p className={styles.remaining_text}>{`Restam ${stock} unidade`}(s)</p>

            </div>
        </div>
    );

}