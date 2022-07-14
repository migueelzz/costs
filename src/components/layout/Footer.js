import styles from './Footer.module.css';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

function Footer() {
  return (
    <footer className={styles.footer}>
      <ul className={styles.socialList}>
        <li>
          <FaFacebook />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaLinkedin />
        </li>
      </ul>
      <p className={styles.copy_right}>
        <span>Costs</span> &copy;  2022. Todos os direitos reservados.
      </p>
    </footer>
  )
}

export default Footer;