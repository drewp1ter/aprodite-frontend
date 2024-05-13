import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/ui'
import { withStopPropagation } from '@/lib'
import { getCartRoute } from '@/routes'
import { Product } from '../../models'
import CartIcon from './assets/cart.svg'
import BagIcon from './assets/bag.svg'
import ArrowIcon from './assets/arrow.svg'
import styles from './ProductDetailsMobile.module.scss'
import Loading from './assets/loading.svg'

export interface Props {
  className?: string
  product?: Product
  isAddedToCart?: boolean
  backButtonTitle?: string
  onClickBack?: () => void
  onClickAddToCart?: (product: Product) => void
}

export function ProductDetailsMobile({ className, product, backButtonTitle, isAddedToCart, onClickBack, onClickAddToCart }: Props) {
  const [imgLoadState, setImgLoadState] = useState<LoadState>('pending')
  const router = useRouter()

  useEffect(() => {
    setImgLoadState('pending')
  }, [product?.images])

  const handleOnImgLoaded = () => setImgLoadState('success')
  const handleOnImgError = () => setImgLoadState('failure')

  if (!product) return null

  return (
    <div className={clsx(styles.productDetailsMobile, className)}>
      <div
        className={clsx(styles.imgContainer, imgLoadState === 'failure' && 'imgPlaceholder')}
        data-state={imgLoadState}
        onLoad={handleOnImgLoaded}
        onError={handleOnImgError}
      >
        <Loading />
        <Image fill src={product.images[0]?.url} alt={product.name} sizes="100vh" />
      </div>
      <div className={styles.content}>
        <Button className={styles.backButton} onClick={onClickBack}>
          {backButtonTitle || ''}
          <ArrowIcon />
        </Button>
        <div>
          <h3>{product.name}</h3>
          <h5>Подробности</h5>
          <p>{product.description}</p>
          <div className={styles.productInfo}>
            <div>
              <span>Вес</span>
              <b>{product.weightFormated}</b>
            </div>
            <div>
              <span>Ккал</span>
              <b>{product.calories}</b>
            </div>
            <div>
              <span>Б / Ж / У</span>
              {product.proteins} г / {product.fats} г / {product.carbonhydrates} г
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <b>{product.priceFormated}</b>
          {isAddedToCart ? (
            <Button className={styles.cartButton} onClick={withStopPropagation(router.push, getCartRoute())}>
              <CartIcon />
              Перейти в корзину
            </Button>
          ) : (
            <Button className={styles.cartButton} onClick={withStopPropagation(onClickAddToCart, product)}>
              <BagIcon />
              Добавить в корзину
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
