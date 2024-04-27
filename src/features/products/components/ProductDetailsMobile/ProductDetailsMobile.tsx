'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/ui'
import CartIcon from './assets/cart.svg'
import ArrowIcon from './assets/arrow.svg'
import styles from './ProductDetailsMobile.module.scss'
import Loading from './assets/loading.svg'
import { formatPrice } from '@/lib'

export interface Props {
  className?: string
  product?: ProductDto
  backButtonTitle?: string
  onClickBack?: () => void
  onClickAddToCart?: (product: ProductDto) => void
}

export function ProductDetailsMobile({ className, product, backButtonTitle, onClickBack, onClickAddToCart }: Props) {
  if (!product) return
  const [imgLoadState, setImgLoadState] = useState<LoadState>('pending')
  const weight = product.weight < 1 ? `${product.weight * 1000} г` : `${product.weight} кг`

  useEffect(() => {
    setImgLoadState('pending')
  }, [product.images])

  const handleOnImgLoaded = () => setImgLoadState('success')
  const handleOnImgError = () => setImgLoadState('failure')

  const handleAddToCart: React.MouseEventHandler<HTMLElement> = (event) => {
    event.stopPropagation()
    onClickAddToCart && onClickAddToCart(product)
  }

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
