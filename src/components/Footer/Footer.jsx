import styles from './Footer.module.css';
import aaalda from '../../assets/images/aaalda_logo.png'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        © 2025 Todos os direitos reservados a
        <a href='https://aalda.com'>
          <img src={aaalda} alt="" style={{width: '35px'}}/>
        </a>
      </p>

      <div className={styles.powered}>
        <p>
          Website powered by <a href="https://www.sovisto.pt" target='_blank'>sovisto</a>
        </p>
      </div>


    </footer>
  );
}