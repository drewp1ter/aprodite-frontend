'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/ui'
import { formatPrice, withStopPropagation } from '@/lib'
import ArrowIcon from './assets/arrow.svg'
import ArrowIcon2 from './assets/arrow2.svg'
import Loading from './assets/loading.svg'
import CartIcon from './assets/cart.svg'
import styles from './ProductDetailsDesktop.module.scss'

export interface Props {
  className?: string
  closeButtonTitle?: string
  product?: ProductDto | null
  onClose?: () => void
  onClickAddToCart?: (product: ProductDto) => void
  onClickPrev?: () => void
  onClickNext?: () => void
}

export function ProductDetailsDesktop({ className, closeButtonTitle, product, onClose, onClickAddToCart, onClickPrev, onClickNext }: Props) {
  if (!product) return null
  const [imgLoadState, setImgLoadState] = useState<LoadState>('pending')
  const weight = product.weight < 1 ? `${product.weight * 1000} г` : `${product.weight} кг`

  useEffect(() => {
    setImgLoadState('pending')
  }, [product.images])

  const handleOnImgLoaded = () => setImgLoadState('success')
  const handleOnImgError = () => setImgLoadState('failure')

  return (
    <div className={clsx(styles.productDetails, className)}>
      <div className={clsx(styles.imgContainer, imgLoadState === 'failure' && 'imgPlaceholder')} data-state={imgLoadState}>
        <Loading />
        <Image width={530} height={500} src={product.images[0]?.url} alt={product.name} onLoad={handleOnImgLoaded} onError={handleOnImgError} />
      </div>
      <div className={styles.content}>
        <div>
          <div className={styles.backButton} onClick={withStopPropagation(onClose)}>
            <span>{closeButtonTitle || ''}</span>
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
          </div>
        </div>
        <div>
          <b className={styles.price}>{formatPrice(product.price)}</b>
          <Button className={styles.button} onClick={withStopPropagation(onClickAddToCart, product)}>
            <CartIcon />
            <span>&nbsp;добавить в корзину</span>
          </Button>
        </div>
      </div>
      <button className={styles.navprev} onClick={withStopPropagation(onClickPrev)}>
        <ArrowIcon2 />
      </button>
      <button className={styles.navnext} onClick={withStopPropagation(onClickNext)}>
        <ArrowIcon2 />
      </button>
    </div>
  )
}
