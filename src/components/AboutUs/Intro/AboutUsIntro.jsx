import styles from './Info.module.css';
import general from '../general.module.css'

export default function AboutUsIntro() {
    return (
        <div className={`${general.wrapper} d-flex flex-column flex-sm-row gap-4 gap-sm-5 my-4 my-sm-5 py-3 align-items-center`}>
            
            <div className="col-auto me-5 d-flex gap-3">
                <div className={styles.verticalLine}></div>

                <div className={`d-flex flex-column gap-1`}>
                    <h3>Quem Somos</h3>
                    <h3>Valores</h3>
                    <h3>Diferenciais</h3>
                </div>
                
            </div>


            <div>
                <p>Somos uma organização tecnológica que desenvolve produtos para consumidores e revendedores, e cria soluções personalizadas em modelação e impressão 3D para clientes particulares e empresariais. Valorizamos a qualidade, a personalização, a sustentabilidade e a transparência. Utilizamos tecnologia de ponta e contamos com uma equipa experiente, oferecendo um atendimento próximo e soluções feitas à medida de cada necessidade.</p>
            </div>

        </div>
    )
}