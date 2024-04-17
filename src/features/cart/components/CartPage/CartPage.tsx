import clsx from 'clsx'
import Image from 'next/image'
import { Button } from '@/compenents'
import productImg from './assets/product.png'
import { ProductItem } from '..'
import TrashIcon from './assets/trash.svg'
import styles from './CartPage.module.scss'

export function CartPage() {
  return (
    <main className={styles.cartPage}>
      <h1>Корзина</h1>
      <h5 className={styles.clearCart}>
        <TrashIcon />
        Очистить корзину
      </h5>
      <div className={styles.content}>
        <div className={styles.productItems}>
          <ProductItem imgSrc={productImg.src} title="Мидии в тайском стиле" price="650 P" amount={1} />
        </div>
        <div className={styles.resume}>
          <h3>Резюме</h3>
          <div className={styles.summary}>
            <div>
              <h5>Сумма заказа</h5>
              <h5>Скидка 20%</h5>
              <h5>Сервисный сбор</h5>
            </div>
            <div>
              <h5>650 Р</h5>
              <h5>99,2 Р</h5>
              <h5>0 Р</h5>
            </div>
          </div>
          <div className={styles.total}>
            <h4>Итого</h4>
            <h4>750 Р</h4>
          </div>
          <Button className={styles.button}>Оформить заказ</Button>
          <Button className={styles.button}>Назад к покупкам</Button>
        </div>
      </div>
    </main>
  )
}
