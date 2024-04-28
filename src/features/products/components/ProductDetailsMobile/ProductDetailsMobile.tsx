'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/ui'
import { getCartRoute } from '@/routes'
import { Product } from '../../models'
import CartIcon from './assets/cart.svg'
import BagIcon from './assets/bag.svg'
import ArrowIcon from './assets/arrow.svg'
import styles from './ProductDetailsMobile.module.scss'
import Loading from './assets/loading.svg'
import { formatPrice } from '@/lib'

export interface Props {
  className?: string
  product: Product
  isAddedToCart?: boolean
  backButtonTitle?: string
  onClickBack?: () => void
  onClickAddToCart?: (product: Product) => void
}

export function ProductDetailsMobile({
  className,
  product,
  backButtonTitle,
  isAddedToCart,
  onClickBack,
  onClickAddToCart
}: Props) {
  const [imgLoadState, setImgLoadState] = useState<LoadState>('pending')

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
          <b>{formatPrice(product.price)}</b>
          {isAddedToCart ? (
            <Link href={getCartRoute()}>
              <Button className={styles.cartButton}>
               <CartIcon />
                Перейти в корзину
              </Button>
            </Link>
          ) : (
            <Button className={styles.cartButton} onClick={handleAddToCart}>
              <BagIcon />
              Добавить в корзину
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
