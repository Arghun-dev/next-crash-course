import LayoutStyles from '../styles/Layout.module.css'
import Nav from './Nav'
import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <div className={LayoutStyles.container}>
        <Header />
        <main className={LayoutStyles.main}>
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout