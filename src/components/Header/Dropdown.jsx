 import account_icon from '../../assets/images/account_circle_icon.svg';
import header_styles from './Header.module.css';
import { useNavigate } from 'react-router-dom';
 export default function Dropdown() {
    const navigate = useNavigate();

    // Function to handle logout    
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

  return (
    <div className='dropdown'>
        <button className={`col-auto icon-button dropdown-toggle hidden-arrow`} 
        type='button'
        id='dropdownProfileIcon'
        data-bs-toggle='dropdown'
        aria-expanded='false'>
        <img src={account_icon} alt="Ícone de conta" />
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownProfileIcon'>
        <li><a className={`dropdown-item ${header_styles.profile_dropdown}`} href="" onClick={()=> navigate('/account')}>O meu Perfil</a></li>
        <li><a className={`dropdown-item ${header_styles.profile_dropdown}`} href="" onClick={()=> navigate('/account/all-orders')}>As minhas Encomendas</a></li>
        <li><a className={`dropdown-item ${header_styles.profile_dropdown}`} href="" onClick={()=> navigate('/account/settings')}>Definições da Conta</a></li>
        <li><a className={`dropdown-item ${header_styles.profile_dropdown}`} href="" onClick={handleLogout}>Terminar Sessão</a></li>
        </ul>
    </div>
        );
    }