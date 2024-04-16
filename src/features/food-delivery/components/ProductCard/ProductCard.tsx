import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import CartIcon from './assets/cart.svg'
import styles from './ProductCard.module.scss'

export interface Props {
  className?: string
  product: ProductDto
  onCartButtonClick?: (productId: number) => void
  onImageClick?: (productId: number) => void
}

function ProductCard({ className, product, onCartButtonClick, onImageClick }: Props) {
  const handleImageClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    onImageClick && onImageClick(product.id)
  }

  const handleCartButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    onCartButtonClick && onCartButtonClick(product.id)
  }

  return (
    <div className={clsx(styles.product, className)}>
      <div onClick={handleImageClick} className={styles.imgContainer}>
        <Image fill src={product.imgSrc} alt="" />
      </div>

      <div className={styles.title}>
        <h3>{product.name}</h3>
        <b>{formatPrice(product.price)}</b>
      </div>

      <div className={styles.footer}>
        <SupplementFacts product={product} className={styles.info} />
        <Button className={styles.button} onClick={handleCartButtonClick}>
          <CartIcon />
        </Button>
      </div>
    </div>
  )
}

ProductCard.Compact = function ProductCardCompact({ className, product, onCartButtonClick, onImageClick }: Props) {
  const handleImageClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation()
    onImageClick && onImageClick(product.id)
  }

  const handleCartButtonClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation()
    onCartButtonClick && onCartButtonClick(product.id)
  }

  return (
    <div className={clsx(styles.productCompact, className)}>
      <div className={styles.imgContainerCompact}>
        <Image onClick={handleImageClick} fill src={product.imgSrc} alt="" />
      </div>
      <h3>{product.name}</h3>

      <SupplementFacts product={product} className={styles.infoCompact} />

      <div className={styles.footerCompact}>
        <b>{formatPrice(product.price)}</b>
        <Button className={styles.button} onClick={handleCartButtonClick}>
          <CartIcon />
        </Button>
      </div>
    </div>
  )
}

function SupplementFacts({ product, className }: Pick<Props, 'product' | 'className'>) {
  return (
    <div className={className}>
      <div>
        <small>Вес</small>
        <small>{product.weight} Г</small>
      </div>
      <div>
        <small>Ккал</small>
        <small>{product.calories}</small>
      </div>
      <div>
        <small>Б / Ж / У</small>
        <small>
          {product.proteins} Г / {product.fats} Г / {product.carbonhydrates} Г
        </small>
      </div>
    </div>
  )
}

function formatPrice(price: string): string {
  return parseInt(price).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 })
}

export default ProductCard
