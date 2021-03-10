import Link from 'next/link'
import NavStyles from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={NavStyles.container}>
      <ul className={NavStyles.list}>
        <li className={NavStyles.listItem}>
          <Link href='/'>Home</Link>
        </li>
        <li className={NavStyles.listItem}>
          <Link href='/about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
