import { Logo } from '../Logo'
import styles from './Header.module.scss'
import CartIcon from './assets/cart.svg'
import BurgerMenu from './assets/burger-menu.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} height={65} width={65} />
      <ul className={styles.navbar}>
        <li>
          <CartIcon />
        </li>
        <li>
          <BurgerMenu />
        </li>
      </ul>
    </header>
  )
}
