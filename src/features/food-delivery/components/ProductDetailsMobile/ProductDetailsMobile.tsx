import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import CartIcon from './assets/cart.svg'
import ArrowIcon from './assets/arrow.svg'
import styles from './ProductDetailsMobile.module.scss'
import pepper from './assets/pepper.png'
import productImg from './assets/product.png'

export interface Props {
  className?: string
  product?: ProductDto
}

export function ProductDetailsMobile({ className, product }: Props) {
  return (
    <div className={clsx(styles.productDetailsMobile, className)}>
      <div className={styles.imgContainer}>
        <Image fill src={productImg.src} alt="" />
      </div>
      <div className={styles.content}>
        <Button className={styles.backButton}>
          Фастфуд
          <ArrowIcon />
        </Button>
        <div>
          <h3>Мидии в тайском стиле</h3>
          <h5>Подробности</h5>
          <p>
            в соусе из кокосового молока с тайскими травами, сервируются в соусе из кокосового молока с тайскими травами, сервируются. сервируются в
            соусе из кокосового молока с тайскими травами, сервируются.
          </p>
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
        <div className={styles.footer}>
          <b>Р 650</b>
          <Button className={styles.cartButton}>
            <CartIcon />
            добавить в корзину
          </Button>
        </div>
      </div>
    </div>
  )
}
