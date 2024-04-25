import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import CartIcon from './assets/cart.svg'
import ArrowIcon from './assets/arrow.svg'
import styles from './ProductDetailsMobile.module.scss'
import pepper from './assets/pepper.png'
import { formatPrice } from '@/utils'

export interface Props {
  className?: string
  product?: ProductDto
  onClickBack?: () => void
  onClickAddToCart?: (product: ProductDto) => void
}

export function ProductDetailsMobile({ className, product, onClickBack, onClickAddToCart }: Props) {
  if (!product) return 
  const weight = product.weight < 1 ? `${product.weight * 1000} г` : `${product.weight} кг`

  const handleAddToCart: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation()
    onClickAddToCart && onClickAddToCart(product)
  }

  return (
    <div className={clsx(styles.productDetailsMobile, className)}>
      <div className={styles.imgContainer}>
        <Image fill src={product.images[0]?.url} alt={product.name} sizes='100vh' />
      </div>
      <div className={styles.content}>
        <Button className={styles.backButton} onClick={onClickBack}>
          Фастфуд
          <ArrowIcon />
        </Button>
        <div>
          <h3>{product.name}</h3>
          <h5>Подробности</h5>
          <p>{product.description}</p>
          <div className={styles.productInfo}>
            <div>
              <span>Вес</span>
              <b>{weight} г</b>
            </div>
            <div>
              <span>Ккал</span>
              <b>{product.calories}</b>
            </div>
            <div>
              <span>Б / Ж / У</span>
              {product.proteins} г / {product.fats} г / {product.carbonhydrates} г
            </div>
            <Image className={styles.flagImg} src={pepper.src} width={27} height={27} alt="" />
          </div>
        </div>
        <div className={styles.footer}>
          <b>{formatPrice(product.price)}</b>
          <Button className={styles.cartButton} onClick={handleAddToCart}>
            <CartIcon />
            добавить в корзину
          </Button>
        </div>
      </div>
    </div>
  )
}
