import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import header_styles from './Header.module.css';
import search_icon from '../../assets/images/search_icon.svg';

export default function SearchBar() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const initialSearch = params.get('search') || '';
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    useEffect(() => {
        const current = new URLSearchParams(location.search).get('search') || '';
        setSearchTerm(current);
    }, [location.search]);


    const handleSearch = () => {
        const trimmed = searchTerm.trim();
        if (trimmed) {
            navigate(`/products?search=${encodeURIComponent(trimmed)}`);
        } else {
            navigate('/products');
        }
    };
    

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
           handleSearch()
        }
    };

    return (
        <div className="input-group">
            <input
                className={`form-control form-control-md ${header_styles.inputField}`}
                type="text"
                placeholder="Pesquisar produtos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <span className={`input-group-text ${header_styles.inputField}`}>
                <img src={search_icon} alt="Search" onClick={() => handleSearch()} style={{cursor: 'pointer'}}/>
            </span>
        </div>
    );
}
