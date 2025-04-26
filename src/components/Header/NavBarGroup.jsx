import styles from './Header.module.css';

export default function NavBarGroup({ title, items }) {
    return (
        <div className={`col-auto ${styles.prodNavGroup}`}>
            <h2>{title}</h2>
            <div className={styles.prodNavAnchor}>
                {items.map((item, index) => (
                    <a key={index} href={item.href}>
                        {item.label}
                    </a>
                ))}             
            </div>
        </div>
    )
    



}