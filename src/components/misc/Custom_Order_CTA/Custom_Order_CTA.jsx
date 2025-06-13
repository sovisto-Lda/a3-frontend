import styles from './Custom_Order_CTA.module.css'
import { useNavigate } from 'react-router-dom';


export default function Custom_Order_CTA() {
    const navigate = useNavigate();

    return (
        <div className={`d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 ${styles.wrapper}`}
        >
            <h1 className='m-0'>Não encontra o que procura?</h1>
    
            <button className='primary-button' onClick={()=> {navigate('/comingsoon')}}>
                <h1>Personalize o seu produto</h1>
            </button>
        </div>
    )


}