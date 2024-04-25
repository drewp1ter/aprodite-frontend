'use client'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { Button, Steps } from '@/ui'
import { withStopPropagation } from '@/lib'
import { getCheckOutRoute } from '@/routes'
import { CartItem } from '..'
import { useCartStore } from '../../store'
import TrashIcon from './assets/trash.svg'
import styles from './CartPage.module.scss'

export const CartPage = observer(function CartPage() {
  const cartStore = useCartStore()
  const router = useRouter()

  useEffect(() => {
    cartStore.isEmty && router.push('/')
  }, [cartStore.isEmty])

  const cartItems = cartStore.items.map((item) => (
    <CartItem
      key={item.id}
      item={item}
      onDecrementAmount={cartStore.decreaseItemAmount}
      onIncrementAmount={cartStore.increaseItemAmount}
      onDelete={cartStore.del}
    />
  ))

  return (
    <main className={styles.cartPage}>
      <div className={styles.head}>
        <h1>Корзина</h1>
        <Steps className={styles.steps} currentStep={0}>
          <b>Корзина</b>
          <b>Оформление заказа</b>
        </Steps>
      </div>
      <h5 className={styles.clearCart} onClick={withStopPropagation(cartStore.clear)}>
        <TrashIcon />
        Очистить корзину
      </h5>
      <div className={styles.content}>
        <div className={styles.productItems}>{cartItems}</div>
        <div className={styles.resume}>
          <h3>Резюме</h3>
          <div className={styles.summary}>
            <div>
              <h5>Сумма заказа</h5>
              <h5>Скидка 20%</h5>
              <h5>Сервисный сбор</h5>
            </div>
            <div>
              <h5>{cartStore.total}</h5>
              <h5>0 Р</h5>
              <h5>0 Р</h5>
            </div>
          </div>
          <div className={styles.total}>
            <h4>Итого</h4>
            <h4>{cartStore.total}</h4>
          </div>
          <Button className={styles.button} onClick={withStopPropagation(router.push, getCheckOutRoute())}>
            Оформить заказ
          </Button>
          <Button className={styles.button} onClick={withStopPropagation(router.back)}>
            Назад к покупкам
          </Button>
        </div>
      </div>
    </main>
  )
})
