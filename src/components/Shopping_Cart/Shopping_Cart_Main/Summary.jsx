import DividerLine from "../Divider_Line";
import styles from './Shopping_Card.module.css';


export default function Summary() { 
    return (
        <div className={`${styles.summary_wrapper}`}>
            {/* linha cabeçalho */}
            <div className="d-flex">
                <h2 className="col-5">Sumário</h2>

            </div>

            <DividerLine />

            <div className="d-flex flex-column gap-3">
                {/* cupon */}
                <div className="inputGroup d-flex flex-row align-items-end mb-3 gap-4">
                    <div className="flex-grow-1">
                        <label htmlFor="cupon">Código Cupão</label>
                        <input
                            id="cupon"
                            className="form-control form-control-md inputField"
                            type="text"
                            placeholder="Ex.: 123453"
                        />
                    </div>
                    <button
                        className={`primary-button h-100 ${styles.cupon_button}`}
                        type="button"
                        style={{ height: '38px' }} // Match default .form-control-md height
                    >
                        Ativar
                    </button>
                </div>

                {/* valores */}
                <div className="d-flex flex-column gap-3">
                    {/* subtotal */}
                    <div className="d-flex w-100 justify-content-between">
                        <p style={{color: 'var(--cinzento)'}}>Subtotal</p>
                        <p>17.98€</p>
                    </div>

                    {/* desconto */}
                    <div className="d-flex w-100 justify-content-between">
                        <p style={{color: 'var(--cinzento)'}}>Desconto</p>
                        <p>-0.00€</p>
                    </div>

                    {/* total */}
                    <div className="d-flex w-100 justify-content-between">
                        <h2>TOTAL</h2>
                        <h2>17.98€</h2>
                    </div>
                </div>

                <button
                    className={`success-button w-100 mt-2`}
                    type="button"
                    style={{ height: '38px' }} // Match default .form-control-md height
                >
                    <p className={styles.continue_button_text}>Prosseguir com a compra</p>
                </button>
            </div>



        </div> 
    )
}