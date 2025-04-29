import styles from './Header.module.css';
import logo from '../../assets/images/a3_logo_horizontal.svg';
import search_icon from '../../assets/images/search_icon.svg';
import NavBarGroup from './NavBarGroup.jsx'
import { useLocation, useNavigate  } from 'react-router-dom';



export default function Header() {
  const location = useLocation().pathname
  const navigate = useNavigate()

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
      <button 
        className={`col-auto ${styles.headerButton} ${location === '/' ? `${styles.selectedButton}` : ''}`}
        onClick={() => navigate('/')}
      >
          Página Inicial
        </button>

        <div className={`col-auto ${styles.hoverWrapper}`}>
          <button 
            className={`${styles.headerButton} ${styles.headerButtonProdutos}`}
            onClick={() => navigate('/products')}
          >
            
            Produtos
          </button>
          <div className={styles.hoverDialog}>
            <div className={styles.hoverDialogOverhead}></div>
            <div className={styles.hoverDialogContent}>
              <div className='row'>
                <NavBarGroup
                  title="Animais"
                  items={[
                    {label: "Aves", href: ""},
                    {label: "Domésticos", href: ""},
                    {label: "Mamíferos Selvagens", href: ""},
                    {label: "Insetos e Aracnídeos", href: ""},
                    {label: "Répteis", href: ""},
                  ]}
                />

                <NavBarGroup
                  title="Material de Impressão"
                  items={[
                    {label: "Acessórios", href: ""},
                    {label: "Filamentos", href: ""},
                    {label: "Impressoras", href: ""},
                  ]}
                />

                <NavBarGroup
                  title="Pedido Personalizado"
                  items={[
                    {label: "Fazer um pedido personalizado", href: ""},
                  ]}
                />

              </div>
            </div>
          </div>
        </div>

        <button className={`col-auto ${styles.headerButton}`}>Sobre Nós</button>
      </div>

    </header>
  );
}
