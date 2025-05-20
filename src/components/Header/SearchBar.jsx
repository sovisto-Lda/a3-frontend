import header_styles from './Header.module.css';
import search_icon from '../../assets/images/search_icon.svg';

export default function SearchBar() {
    return <div className="input-group">
        <input
            className={`form-control form-control-md ${header_styles.inputField}`}
            type="text"
            placeholder="Pesquisar produtos..."
        />
        <span className={`input-group-text ${header_styles.inputField}`}>
            <img src={search_icon} alt="" />
        </span>
    </div>
}