import header_styles from './Header.module.css';
import logo from '../../assets/images/a3_logo_horizontal.svg';
import search_icon from '../../assets/images/search_icon.svg';
import shopping_cart_icon from '../../assets/images/shopping_cart_icon.svg';
import NavBarGroup from './NavBarGroup.jsx'
import { useLocation, useNavigate } from 'react-router-dom';



export default function Header() {
  const location = useLocation().pathname
  const navigate = useNavigate()

  return (
    <header className={`${header_styles.header}`}>
      <div className='row align-items-center'>
        <div className='col-auto'>
          <a href="">
            <img src={logo} alt="a3 logo horizontal" />
          </a>
        </div>

        <div className='col-4'>
          <div className="input-group">
            <input
              className={`form-control form-control-md ${header_styles.inputField}`}
              type="text"
              placeholder="Pesquisar produtos..."
            />
            <span className={`input-group-text ${header_styles.inputField}`}>
              <img src={search_icon} alt="" />
            </span>
          </div>
        </div>

        <div className='col-auto ms-auto d-flex align-items-center gap-3'>
          <button className={`col-auto icon-button`}>
            <img src={shopping_cart_icon} alt="Ícone de carrinho de compras" />
          </button>

          <button className={`col-auto primary-button`}>Login</button>

        </div>
      </div>



      <div className='d-flex justify-content-start gap-5 ps-3 pt-2 pb-4'>
        <button
          className={`col-auto ${header_styles.headerButton} ${location === '/' ? `${header_styles.selectedButton}` : ''}`}
          onClick={() => navigate('/')}
        >

          Página Inicial
        </button>

        <div className={`col-auto ${header_styles.hoverWrapper}`}>
          <button className={`${header_styles.headerButton} ${header_styles.headerButtonProdutos}`}>Produtos</button>
          <div className={header_styles.hoverDialog}>
            <div className={header_styles.hoverDialogOverhead}></div>
            <div className={header_styles.hoverDialogContent}>
              <div className='row'>
                <NavBarGroup
                  title="Animais"
                  items={[
                    { label: "Aves", href: "" },
                    { label: "Domésticos", href: "" },
                    { label: "Mamíferos Selvagens", href: "" },
                    { label: "Insetos e Aracnídeos", href: "" },
                    { label: "Répteis", href: "" },
                  ]}
                />

                <NavBarGroup
                  title="Material de Impressão"
                  items={[
                    { label: "Acessórios", href: "" },
                    { label: "Filamentos", href: "" },
                    { label: "Impressoras", href: "" },
                  ]}
                />

                <NavBarGroup
                  title="Pedido Personalizado"
                  items={[
                    { label: "Fazer um pedido personalizado", href: "" },
                  ]}
                />

              </div>
            </div>
          </div>
        </div>

        <button className={`col-auto ${header_styles.headerButton}`}>Sobre Nós</button>
      </div>

    </header>
  );
}
