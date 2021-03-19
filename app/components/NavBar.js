import Link from 'next/link'
import styles from '../styles/NavBar.module.scss'

export default function NavBar() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <Link href='/'>
          <li className={styles.listItem}>Home</li>        
        </Link>
        <Link href='/BitcoinPrice'>
          <li className={styles.listItem}>BitcoinPrice</li>        
        </Link>
        <Link href='/AboutBitzPrice'>
          <li className={styles.listItem}>AboutBitzPrice</li>        
        </Link>
      </ul>
    </nav>
  )
}