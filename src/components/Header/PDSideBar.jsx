import React, { useState } from 'react';
import logo from '/images/A3Logo.png';
import home from '/images/home.svg';
import home_selected from '/images/home_selected.svg';
import inventory from '/images/inventory.svg';
import inventory_selected from '/images/inventory_selected.svg';
import finance from '/images/finance.svg';
import finance_selected from '/images/finance_selected.svg';
import receipt_long from '/images/receipt_long.svg';
import receipt_long_selected from '/images/receipt_long_selected.svg';
import restock from '/images/restock.svg';
import restock_selected from '/images/restock_selected.svg';
import email_icon from '/images/email_icon.svg';
import email_icon_selected from '/images/email_icon_selected.svg';


import styles from './PDSideBar.module.css';


export default function PDSideBar() {
    console.log(styles);
    const [selected, setSelected] = useState('inicio');
    const [hovered, setHovered] = useState(null);

    return (
        <div className="layout">
            <aside className="sidebar d-flex flex-column gap-4 min-vh-100">
                <a className={`navbar-brand ${styles.brand}`} href="#">
                    <img src={logo} alt="a3 logo horizontal" className={styles.logo} />
                </a>

                <nav className="menu">
                    <ul className={`nav flex-column ${styles.menu}`}>
                        <li className='nav-item'>
                            <button
                                className={`btn ${styles['content']} ${selected === 'inicio' ? styles.selected : ''}`}
                                onClick={() => setSelected('inicio')}
                                onMouseEnter={() => setHovered('inicio')}
                                onMouseLeave={() => setHovered(null)}
                            >
                                <img src={
                                    selected === 'inicio' || hovered === 'inicio'
                                        ? home_selected
                                        : home
                                }
                                    alt="home" />
                                Início
                            </button>

                        </li>
                        <li className='nav-item'>
                            <button className={`btn ${styles.content} ${selected === 'stock' ? styles.selected : ''}`}
                                onClick={() => setSelected('stock')}
                                onMouseEnter={() => setHovered('stock')}
                                onMouseLeave={() => setHovered(null)}>
                                <img src={
                                    selected === 'stock' || hovered === 'stock'
                                    ? inventory_selected
                                    : inventory
                                } alt="stock" />
                                Stock
                            </button>

                        </li>
                        <li className='nav-item'>
                            <button className={`btn ${styles.content} ${selected === 'orders' ? styles.selected : ''}`}
                                onClick={() => setSelected('orders')}
                                onMouseEnter={() => setHovered('orders')}
                                onMouseLeave={() => setHovered(null)}>
                                <img src={
                                    selected === 'orders' || hovered === 'orders'
                                    ? receipt_long_selected
                                    :receipt_long

                                } alt="orders" />
                                Pedidos
                            </button>

                        </li>
                        <li className='nav-item'>
                            <button className={`btn ${styles.content} ${selected === 'statistics' ? styles.selected : ''}`}
                                onClick={() => setSelected('statistics')}
                                onMouseEnter={() => setHovered('statistics')}
                                onMouseLeave={() => setHovered(null)}>
                                <img src={
                                    selected === 'statistics' || hovered === 'statistics'
                                    ? finance_selected
                                    : finance

                                } alt="statistics" />
                                Estatísticas
                            </button>

                        </li>
                        <li className='nav-item'>
                            <button className={`btn ${styles.content} ${selected === 'communication' ? styles.selected : ''}`}
                                onClick={() => setSelected('communication')}
                                onMouseEnter={() => setHovered('communication')}
                                onMouseLeave={() => setHovered(null)}>
                                <img src={
                                    selected === 'communication' || hovered === 'communication'
                                    ? email_icon_selected
                                    : email_icon
                                } alt="communication" />
                                Comunicação
                            </button>

                        </li>
                        <li className='nav-item'>
                            <button className={`btn ${styles.content} ${selected === 'restock' ? styles.selected : ''}`}
                                onClick={() => setSelected('restock')}
                                onMouseEnter={() => setHovered('restock')}
                                onMouseLeave={() => setHovered(null)}>
                                <img src={
                                    selected === 'restock' || hovered === 'restock'
                                    ?restock_selected
                                    :restock
                                } alt="restock" />
                                Restock
                            </button>

                        </li>

                    </ul>
                </nav>

            </aside>
        </div>
    )
}