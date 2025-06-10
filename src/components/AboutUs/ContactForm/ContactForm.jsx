import general from '../general.module.css'
import styles from './ContactForm.module.css'
import InputGroup from '../../Inputs/InputGroup'
import TextArea from '../../Inputs/TextArea'
import phone from '../../../assets/images/phone.svg'
import email from '../../../assets/images/email.svg'
import location from '../../../assets/images/location.svg'

export default function ContactForm() {

    return (

        <div className={`${general.fullWidthImage} ${styles.box} my-5 py-5`}>
            <div className={styles.form}>
                <h3 className='mb-4'>Contacte-nos para mais informações</h3>

                <form
                action="/submit"
                method="POST"
                >
                <div className='d-flex gap-5 '>
                    <div className='w-100'>
                        <InputGroup
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="Email"
                            //value={email}
                            //onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='w-100'>
                        <InputGroup
                            id="phone"
                            label="Telefone"
                            type="phone"
                            placeholder="Telefone"
                            //value={email}
                            //onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className='w-100'>
                    <InputGroup
                        id="name"
                        label="Nome"
                        type="name"
                        placeholder="Nome"
                        //value={email}
                        //onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='w-100'>
                    <TextArea
                        id="message"
                        label="Mensagem"
                        type="text"
                        placeholder="Mensagem"
                        //value={email}
                        //onChange={(e) => setEmail(e.target.value)}
                    />
                </div>


                <button
                    className={`success-button mt-2`}
                    type="submit"
                    style={{ height: '38px' }}
                    onClick={()=> {}}
                >
                    <p className={styles.continue_button_text}>Submeter</p>
                </button>                

                </form>

            </div>

            <div className={styles.infoCardsWrapper}>
                <div className={styles.infoCard}>
                    <img src={phone} alt="" />
                    <p>+351 932 740 802</p>
                </div>

                <div className={styles.infoCard}>
                    <img src={email} alt="" />
                    <p>geral@aaalda.com</p>
                </div>

                <div className={styles.infoCard}>
                    <img src={location} alt="" />
                    <p>Sintra, Portugal</p>
                </div>
            </div>

        </div>

        
    )

}