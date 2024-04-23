import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import formatPrice from '@/utils/formatPrice'
import productImg from './assets/product.png'
import ArrowIcon from './assets/arrow.svg'
import ArrowIcon2 from './assets/arrow2.svg'
import CartIcon from './assets/cart.svg'
import pepper from './assets/pepper.png'
import styles from './ProductDetailsDesktop.module.scss'

export interface Props {
  className?: string
  categoryName?: string
  product?: ProductDto
  onClickBack?: React.MouseEventHandler<HTMLDivElement>
  onClickAddToCart?: React.MouseEventHandler<HTMLButtonElement>
  onClickPrev?: React.MouseEventHandler<HTMLElement>
  onClickNext?: React.MouseEventHandler<HTMLElement>
}

export function ProductDetailsDesktop({ className, categoryName, product, onClickBack, onClickAddToCart }: Props) {
  if (!product) return null
  const weight = product.weight < 1 ? `${product.weight * 1000} г` : `${product.weight} кг`
  return (
    <div className={clsx(styles.productDetails, className)}>
      <Image width={530} height={500} src={productImg.src} alt="" />
      <div className={styles.content}>
        <div>
          <div className={styles.backButton} onClick={onClickBack}>
            <span>{categoryName}</span>
            <ArrowIcon />
          </div>
          <h3>{product.name}</h3>
          <h5>Подробности</h5>
          <p>{product.description}</p>
          <div className={styles.productInfo}>
            <div>
              <span>Вес</span>
              <b>{weight}</b>
            </div>
            <div>
              <span>Ккал</span>
              <b>{product.calories}</b>
            </div>
            <div>
              <span>Б / Ж / У</span>
              <b>{product.proteins} г / {product.fats} г / {product.carbonhydrates} г</b>
            </div>
            <Image className={styles.flagImg} src={pepper.src} width={27} height={27} alt="" />
          </div>
        </div>
        <div>
          <b className={styles.price}>{formatPrice(product.price)}</b>
          <Button className={styles.button} onClick={onClickAddToCart}>
            <CartIcon />
            <span>&nbsp;добавить в корзину</span>
          </Button>
        </div>
      </div>
      <div className={styles.navprev}>
        <ArrowIcon2 />
      </div>
      <div className={styles.navnext}>
        <ArrowIcon2 />
      </div>    
    </div>
  )
}
