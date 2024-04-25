'use client'
import { observer } from 'mobx-react-lite'
import { Logo } from '../Logo'
import Link from 'next/link'
import { getCartRoute } from '@/routes'
import { useCartStore } from '@/features/cart/store'
import styles from './Header.module.scss'
import CartIcon from './assets/cart.svg'
import BurgerMenu from './assets/burger-menu.svg'

export const Header = observer(function Header() {
  const cartStore = useCartStore()

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
          {cartStore.itemsCount > 0 && <div className={styles.cartItemsCount}>{cartStore.itemsCount}</div>}
          <Link rel="nofollow" href={getCartRoute()}>
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
})
