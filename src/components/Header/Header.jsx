import header_styles from './Header.module.css';
import SearchBar from './SearchBar.jsx';
import logo from '../../assets/images/A3Projects_logo_new_vertical.svg';
import search_icon from '../../assets/images/search_icon.svg';
import shopping_cart_icon from '../../assets/images/shopping_cart_icon.svg';
import favourites from '../../assets/images/favourites_icon.svg';
import NavBarGroup from './NavBarGroup.jsx'
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';
import Dropdown from './Dropdown.jsx';



export default function Header(userState) {
  const location = useLocation().pathname
  const navigate = useNavigate()

  const isUserLogged = userState.userLogged

  const popupRef = useRef(null);
  const productsButtonRef = useRef(null);

  function handleHoverIn() {
    popupRef.current.style.visibility = "visible"
    popupRef.current.style.transform = 'translateY(0px)';
    popupRef.current.style.opacity = '1';
  }
  function handleHoverOut() {
    popupRef.current.style.visibility = "hidden"
    popupRef.current.style.transform = 'translateY(10px)';
    popupRef.current.style.opacity = '0';

  }
  


  return (
    <header className={`${header_styles.header}`}>
      <div className={header_styles.hoverDialog} ref={popupRef}
        onMouseEnter={handleHoverIn} onMouseLeave={handleHoverOut}>
            <div className={header_styles.hoverDialogOverhead}></div>
            <div className={header_styles.hoverDialogContent}>
              <div className='row d-flex gap-4'>
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
                    { label: "Acessórios", href: "/comingsoon" },
                    { label: "Filamentos", href: "/comingsoon" },
                    { label: "Impressoras", href: "/comingsoon" },
                  ]}
                />

                <NavBarGroup
                  title="Pedido Personalizado"
                  items={[
                    { label: "Fazer um pedido personalizado", href: "/comingsoon" },
                  ]}
                />

              </div>
            </div>
          </div>
      <div className={`row align-items-center m-0 gap-3`}>
        <div className={`d-flex align-items-center ${header_styles.logo_container}`}>
          <a href="/">
            <img src={logo} alt="a3 logo horizontal" className='' />
          </a>
        </div>

        <div className='col-5 d-none d-sm-block'>
          <SearchBar />
        </div>

        {isUserLogged === true
        ? (
          <div className='col-auto ms-auto d-flex align-items-center gap-3 p-0'>
            <button className={`col-auto icon-button`} onClick={()=> navigate('/cart')}>
              <img src={shopping_cart_icon} alt="Ícone de carrinho de compras" />
            </button>

            <button className={`col-auto icon-button`} onClick={()=> navigate('/account/favorites')}>
              <img src={favourites} alt="Ícone de favoritos" />
            </button>
            <Dropdown/>
           
          </div>
        )
        : (
          <div className='col-auto ms-auto d-flex align-items-center gap-3 p-0'>
            <button className={`col-auto icon-button`} onClick={()=> navigate('/cart')}>
              <img src={shopping_cart_icon} alt="Ícone de carrinho de compras" />
            </button>

            <button
              className={`col-auto primary-button`}
              onClick={() => navigate('/login')}
            >
              Login
            </button>

          </div>
        )}

      </div>

      <div className='col-auto d-block d-sm-none mt-3'>
        <SearchBar></SearchBar>
      </div>

    <div className={`col-auto col-sm-3 d-flex justify-content-between pt-2 pb-1 gap-3`}>
      <button 
        className={`col-auto ${header_styles.headerButton} ${location === '/' ? `${header_styles.selectedButton}` : ''}`}
        onClick={() => navigate('/')}
      >
        Página Inicial
      </button>

      <div className={`col-auto ${header_styles.hoverWrapper}`}>
        <button 
          className={`${header_styles.headerButton} ${header_styles.headerButtonProdutos} ${location.startsWith('/products') ? `${header_styles.selectedButton}` : ''}`}
          onClick={() => navigate('/products')}
          ref={productsButtonRef}
          onMouseEnter={handleHoverIn}
          onMouseLeave={handleHoverOut}
        >
          Produtos
        </button>

      </div>

        <button 
          className={`col-auto ${header_styles.headerButton} ${location.startsWith('/about-us') ? `${header_styles.selectedButton}` : ''}`}  
          onClick={() => navigate('/about-us')}
        >
          Sobre Nós
        </button>

    </div>

    </header>
  );
}
