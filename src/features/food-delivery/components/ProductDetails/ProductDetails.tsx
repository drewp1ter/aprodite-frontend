import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import styles from './ProductDetails.module.scss'
import productImg from './assets/product.png'
import ArrowIcon from './assets/arrow.svg'
import CartIcon from './assets/cart.svg'
import pepper from './assets/pepper.png'

export interface Props {
  className?: string
  product?: ProductDto
}

export function ProductDetails({ className, product }: Props) {
  return (
    <div className={clsx(styles.productDetails, className)}>
      <Image width={530} height={500} src={productImg.src} alt="" />
      <div className={styles.content}>
        <div>
          <div className={styles.backButton}>
            <span>Фастфуд</span>
            <ArrowIcon />
          </div>
          <h3>Мидии в тайском стиле</h3>
          <h5>Подробности</h5>
          <p>В соусе из кокосового молока с тайскими травами, сервируются в соусе из кокосового молока с тайскими травами, сервируются.</p>
          <div className={styles.productInfo}>
            <div>
              <span>Вес</span>
              <b>200 Г</b>
            </div>
            <div>
              <span>Ккал</span>
              <b>476</b>
            </div>
            <div>
              <span>Б / Ж / У</span>
              <b>23.5 Г / 20.8 Г / 48.7 Г</b>
            </div>
            <Image className={styles.flagImg} src={pepper.src} width={27} height={27} alt="" />
          </div>
        </div>
        <div>
          <b className={styles.price}>Р 650</b>
          <Button className={styles.button}>
            <CartIcon />
            <span>&nbsp;добавить в корзину</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
