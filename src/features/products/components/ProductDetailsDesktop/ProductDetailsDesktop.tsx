import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import { formatPrice } from '@/utils/formatPrice'
import ArrowIcon from './assets/arrow.svg'
import ArrowIcon2 from './assets/arrow2.svg'
import CartIcon from './assets/cart.svg'
import pepper from './assets/pepper.png'
import styles from './ProductDetailsDesktop.module.scss'

export interface Props {
  className?: string
  categoryName?: string
  product?: ProductDto | null
  onClickBack?: () => void
  onClickAddToCart?: (product: ProductDto) => void
  onClickPrev?: () => void
  onClickNext?: () => void
}

const clickHandler = (callback?: () => void) => (event: React.MouseEvent<HTMLElement>) => {
  event.stopPropagation()
  callback && callback()
}

export function ProductDetailsDesktop({ className, categoryName, product, onClickBack, onClickAddToCart, onClickPrev, onClickNext }: Props) {
  if (!product) return null
  const weight = product.weight < 1 ? `${product.weight * 1000} г` : `${product.weight} кг`

  const handleAddToCart: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation()
    onClickAddToCart && onClickAddToCart(product)
  }

  return (
    <div className={clsx(styles.productDetails, className)}>
      <Image width={530} height={500} src={product.images[0]?.url} alt={product.name} />
      <div className={styles.content}>
        <div>
          <div className={styles.backButton} onClick={clickHandler(onClickBack)}>
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
              <b>
                {product.proteins} г / {product.fats} г / {product.carbonhydrates} г
              </b>
            </div>
            <Image className={styles.flagImg} src={pepper.src} width={27} height={27} alt="" />
          </div>
        </div>
        <div>
          <b className={styles.price}>{formatPrice(product.price)}</b>
          <Button className={styles.button} onClick={handleAddToCart}>
            <CartIcon />
            <span>&nbsp;добавить в корзину</span>
          </Button>
        </div>
      </div>
      <button className={styles.navprev} onClick={clickHandler(onClickPrev)}>
        <ArrowIcon2 />
      </button>
      <button className={styles.navnext} onClick={clickHandler(onClickNext)}>
        <ArrowIcon2 />
      </button>
    </div>
  )
}
