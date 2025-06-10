import Stars from '../../ProductPage/Starts'
import style from './client.module.css'

export default function ClientReviewCard() {

    return (
        <div className={style.wrapper} style={{position: "relative"}}>
            <div className={`d-flex flex-column gap-3 ${style.box}`}>
                <Stars perc={50} showCount={false}/>

                <p>O Luke é sempre muito prestável, nunca me falhou e tem os melhores resultados.</p>

                <div>
                    <div className='d-flex align-items-center gap-3'>
                        <img src="http://localhost:5000/images/cursedMomo.jpg" alt="" 
                            style={{
                                width: "48px",
                                borderRadius: "50%"
                            }}
                        />

                        <div>
                            <p>Manuel das Quintas</p>
                            <p style={{fontSize: "12px"}}>Partner</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.floater}>
                99
            </div>
        </div>
    )

}