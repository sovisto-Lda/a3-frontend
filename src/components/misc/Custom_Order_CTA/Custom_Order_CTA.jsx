import styles from './Custom_Order_CTA.module.css'
import { useNavigate } from 'react-router-dom';



export default function Custom_Order_CTA({ noMargin = false,  bg=false}) {
    const navigate = useNavigate()

    return (
        <div className={`d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 ${styles.wrapper} ${noMargin ? styles.noMargin : ''} ${bg ? styles.bg : ''}`}
        >
            <h1 className={`m-0 ${styles.text}`}>Não encontra o que procura?</h1>
    
            <button className='primary-button' onClick={()=> {navigate('/comingsoon')}} style={{textAlign: 'start'}}>
                <h1 className={styles.text}>Personalize o seu produto</h1>
            </button>
        </div>
    )


}