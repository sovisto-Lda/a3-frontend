import search_icon from '/images/search_icon.svg';
import account_icon from '/images/account_circle_icon.svg';
import settings_icon from '/images/settings_icon.svg';
import styles from './PDTopBar.module.css';

export default function PDSideBar({userEmail, storeName}){
    return(
        <header className={`position-absolute top-0 end-0 ${styles['header']}`}>
            <div className={'row align-items-center w-100 px-3 py-2'}>
                <div className="col-12 col-md-6 col-lg-4">
                    <div className="input-group">
                        <input className={`form-control form-control-md ${styles['input']}`} type="text"
                        placeholder="Pesquisar por parâmetro..." />
                        <span className={`input-group-text ${styles['search']}`}>
                            <img src={search_icon} alt="Ícone de pesquisa" />
                        </span>
                    </div>
                </div>
                <div className='col-auto ms-auto d-flex align-items-center gap-2'>
                    <button className="col-auto icon-button gap-2">
                        <span className={styles.storeName}>{storeName}</span>
                        <img src={account_icon} alt="Ícone da conta" className={styles.icon} />
                    </button>
                    <button className="col-auto icon-button">
                        <img src={settings_icon} alt="Ícone de definições" className={styles.icon} />
                    </button>
                </div>
            </div>
        </header>
    )
}