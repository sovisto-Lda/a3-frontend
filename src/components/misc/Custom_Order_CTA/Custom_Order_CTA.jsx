import styles from './Custom_Order_CTA.module.css'

export default function Custom_Order_CTA() {
    return (
        <div className={`d-flex justify-content-center align-items-center gap-3 ${styles.wrapper}`}
        >
            <h1 className='m-0'>Não encontra o que procura?</h1>
    
            <div className='primary-button'><h1>Personalize o seu produto</h1></div>
        </div>
    )


}