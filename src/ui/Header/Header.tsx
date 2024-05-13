'use client'
import { useReducer } from 'react'
import { observer } from 'mobx-react-lite'
import { Logo } from '../Logo'
import Link from 'next/link'
import { getCartRoute } from '@/routes'
import { useCartStore } from '@/features/cart/store'
import * as Assets from './assets'
import styles from './Header.module.scss'
import { withStopPropagation } from '@/lib'

export const Header = observer(function Header() {
  const cartStore = useCartStore()
  const [isMobileMenuVisible, toggleMobileMenuVisible] = useReducer((value) => !value, false)

  return (
    <header id="header" className={styles.header} data-opened={isMobileMenuVisible}>
      <Link className={styles.logo} href="/">
        <Logo />
      </Link>
      <nav className={styles.navbar}>
        <menu>
          <li>
            <a href="https://hotel.rgk-afrodita.ru">Гостиница</a>
          </li>
          <li>
            <a href="https://restaurant.rgk-afrodita.ru">Ресторан</a>
          </li>
          <li>
            <a href="https://summer.rgk-afrodita.ru">Летний ресторан</a>
          </li>
          <li>
            <a href="https://karaoke.rgk-afrodita.ru">Караоке</a>
          </li>
          <li data-active="true">
            <a href="/">Доставка еды</a>
          </li>
        </menu>
      </nav>
      <ul className={styles.cartAndMenu}>
        <li>
          {cartStore.itemsCount > 0 && <div className={styles.cartItemsCount}>{cartStore.itemsCount}</div>}
          <Link rel="nofollow" href={getCartRoute()}>
            <Assets.CartIcon />
          </Link>
        </li>
        <li onClick={withStopPropagation(toggleMobileMenuVisible)}>{isMobileMenuVisible ? <Assets.CloseIcon /> : <Assets.BurgerMenu />}</li>
      </ul>
    </header>
  )
})
