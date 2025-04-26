import styles from './Header.module.css';
import logo from '../assets/images/a3_logo_horizontal.svg';
import search_icon from '../assets/images/search_icon.svg';

export default function Header() {
  return (
    <header className={`${styles.header}`}>
      <div className='row align-items-center'>
        <div className='col-auto'>
          <a href="">
            <img src={logo} alt="a3 logo horizontal" />
          </a>
        </div>

        <div className='col-4'>
          <div className="input-group">
            <input
              className={`form-control form-control-md ${styles.inputField}`}
              type="text"
              placeholder="Pesquisar produtos..."
            />
            <span 
            className={`input-group-text ${styles.inputField}`}>
              <img src={search_icon} alt=""/>
            </span>
          </div>
        </div>
      </div>

    <div className='d-flex justify-content-start gap-5 ps-3 pt-2 pb-4'>
      <button className={`col-auto ${styles.headerButton}`}>Página Inicial</button>

        <div className={`col-auto ${styles.hoverWrapper}`}>
          <button className={`${styles.headerButton} ${styles.headerButtonProdutos}`}>Produtos</button>
          <div className={styles.hoverDialog}>
            <div className={styles.hoverDialogOverhead}></div>
            <div className={styles.hoverDialogContent}>
              <div className='row'>
                <div className={`col-auto ${styles.prodNavGroup}`}>
                  <h2>Animais</h2>
                  <div className={styles.prodNavAnchor}>
                    <a href="">Aves</a>
                    <a href="">Domésticos</a>
                    <a href="">Mamíferos Selvagens</a>
                    <a href="">Insetos e Aracnídeos</a>                  
                    <a href="">Répteis</a>                  
                  </div>

                </div>

                <div className={`col-auto ${styles.prodNavGroup}`}>
                  <h2>Material de Impressão</h2>
                  <div className={styles.prodNavAnchor}>
                    <a href="">Acessórios</a>
                    <a href="">Filamentos</a>
                    <a href="">Impressoras</a>
                  </div>
                </div>

                <div className={`col-auto ${styles.prodNavGroup}`}>
                  <h2>Pedido Personalizado</h2>
                  <div className={styles.prodNavAnchor}>
                    <a href="">Fazer um pedido personalizado</a>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>

        <button className={`col-auto ${styles.headerButton}`}>Sobre Nós</button>
      </div>

    </header>
  );
}
