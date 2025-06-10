import styles from './Footer.module.css';
import aaalda from '../../assets/images/aaalda_logo.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © 2025 todos os direitos reservados a
        <a href='https://aalda.com'>
          <img src={aaalda} alt="" style={{width: '35px'}}/>
        </a>
      </p>
    </footer>
  );
}