import { Logo } from '../Logo'
import Link from 'next/link'
import styles from './Header.module.scss'
import CartIcon from './assets/cart.svg'
import BurgerMenu from './assets/burger-menu.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Logo className={styles.logo} />
      </Link>
      <nav className={styles.navbarFull}>
        <menu>
          <li>
            <a href="#">Гостиница</a>
          </li>
          <li>
            <a href="#">Ресторан</a>
          </li>
          <li>
            <a href="#">Летний ресторан</a>
          </li>
          <li>
            <a href="#">Караоке</a>
          </li>
          <li data-active="true">
            <a href="#">Доставка еды</a>
          </li>
        </menu>
      </nav>
      <ul className={styles.navbar}>
        <li>
          <Link rel="nofollow" href="#">
            <CartIcon />
          </Link>
        </li>
        <li>
          <a href="#">
            <BurgerMenu />
          </a>
        </li>
      </ul>
    </header>
  )
}
