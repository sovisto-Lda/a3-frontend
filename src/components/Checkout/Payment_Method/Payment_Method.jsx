import mbway from '../../../assets/images/mbway.png'
import visa from '../../../assets/images/visa.svg'
import paypal from '../../../assets/images/paypal.svg'
import styles from './Payment_Method.module.css'
import React, { useEffect, useState } from "react";

export default function PaymentMethod({onNext}) {
    const [selected, setSelected] = useState(null);

    return (
        <div className="d-flex flex-column gap-3 col-md-6 col-10">
            <h2>Selecione o método de pagamento</h2>

            <div className='d-flex flex-sm-row flex-column gap-4 align-items-center'>
                <div className={`${styles.payment_card_wrapper} ${selected === 1 ? styles.payment_card_active : ''}`}
                onClick={() => setSelected(1)}
                >
                    <img src={mbway} className={styles.payment_card_image} alt="" />
                </div>

                <div className={`${styles.payment_card_wrapper} ${selected === 2 ? styles.payment_card_active : ''}`}
                onClick={() => setSelected(2)}
                >
                    <img src={visa} className={styles.payment_card_image} alt="" />
                </div>

                <div className={`${styles.payment_card_wrapper} ${selected === 3 ? styles.payment_card_active : ''}`}
                onClick={() => setSelected(3)}
                >
                    <img src={paypal} className={styles.payment_card_image} alt="" />
                </div>
            </div>

            {selected !== null &&
                (<div className="d-flex justify-content-end mt-3">
                    <div className={`primary-button`} onClick={onNext}><p>Continuar</p></div>
                </div>)
            }

        </div>
    )
}