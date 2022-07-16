import { Link } from 'react-router-dom';

import { FaPlusCircle } from 'react-icons/fa';
import styles from './LinkButton.module.css';

function LinkButton({ to, text }) {
  return (
      <div className={styles.linkButton}>
      <Link className={styles.btn} to={to}>
        {text}
        <FaPlusCircle />
      </Link>
      </div>
  )
}

export default LinkButton;