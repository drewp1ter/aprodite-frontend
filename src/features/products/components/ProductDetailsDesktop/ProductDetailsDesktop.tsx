import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/ui'
import { withStopPropagation } from '@/lib'
import { getCartRoute } from '@/routes'
import { Product } from '../../models'
import ArrowIcon from './assets/arrow.svg'
import ArrowIcon2 from './assets/arrow2.svg'
import Loading from './assets/loading.svg'
import BagIcon from './assets/bag.svg'
import CartIcon from './assets/cart.svg'
import styles from './ProductDetailsDesktop.module.scss'

export interface Props {
  className?: string
  closeButtonTitle?: string
  product?: Product
  isAddedToCart?: boolean
  hasPrev?: boolean
  hasNext?: boolean
  onClose?: () => void
  onClickAddToCart?: (product: Product) => void
  onClickPrev?: () => void
  onClickNext?: () => void
}

export function ProductDetailsDesktop({
  className,
  closeButtonTitle,
  product,
  isAddedToCart,
  hasPrev,
  hasNext,
  onClose,
  onClickAddToCart,
  onClickPrev,
  onClickNext,
}: Props) {
  const [imgLoadState, setImgLoadState] = useState<LoadState>('pending')

  useEffect(() => {
    setImgLoadState('pending')
  }, [product?.images])

  const handleOnImgLoaded = () => setImgLoadState('success')
  const handleOnImgError = () => setImgLoadState('failure')

  if (!product) return null

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
              <b>{product.weightFormated}</b>
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
          <b className={styles.price}>{product.priceFormated}</b>
          {isAddedToCart ? (
            <Link href={getCartRoute()}>
              <Button className={styles.button}>
                <CartIcon />
                <span>&nbsp;Перейти в корзину</span>
              </Button>
            </Link>
          ) : (
            <Button className={styles.button} onClick={withStopPropagation(onClickAddToCart, product)}>
              <BagIcon />
              <span>&nbsp;Добавить в корзину</span>
            </Button>
          )}
        </div>
      </div>
      <Button disabled={!hasPrev} className={styles.navprev} onClick={withStopPropagation(onClickPrev)}>
        <ArrowIcon2 />
      </Button>
      <Button disabled={!hasNext} className={styles.navnext} onClick={withStopPropagation(onClickNext)}>
        <ArrowIcon2 />
      </Button>
    </div>
  )
}
