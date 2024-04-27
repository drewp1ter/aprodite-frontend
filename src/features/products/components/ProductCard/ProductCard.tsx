'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/ui'
import CartIcon from './assets/cart.svg'
import BagIcon from './assets/bag.svg'
import { formatPrice } from '@/lib'
import { getCartRoute } from '@/routes'
import styles from './ProductCard.module.scss'
import { ProductCardBase } from './ProductCardBase'
import { ProductCardCompact } from './ProductCardCompact'

export class ProductCard extends ProductCardBase {
  render(): ReactNode {
    const { className, product, isAddedToCart } = this.props
    const { imgLoadState } = this.state

    return (
      <div className={clsx(styles.product, className)}>
        <div
          onClick={this.handleImageClick}
          className={clsx(styles.imgContainer, imgLoadState === 'failure' && 'imgPlaceholder')}
          data-status={imgLoadState}
        >
          <Image
            fill
            src={product.images[0]?.url}
            alt={product.name}
            loader={this.imgLoader}
            onLoad={this.handleOnImgLoaded}
            onError={this.handleOnImgError}
            sizes="100vh"
            loading="eager"
          />
        </div>

        <div className={styles.title}>
          <h3>{product.name}</h3>
          <b>{formatPrice(product.price)}</b>
        </div>

        <div className={styles.footer}>
          {this.supplementFacts({ product, className: styles.info })}
          {isAddedToCart ? (
            <Link href={getCartRoute()}>
              <Button className={styles.button}>
                <CartIcon />
              </Button>
            </Link>
          ) : (
            <Button className={styles.button} onClick={this.handleCartButtonClick}>
              <BagIcon />
            </Button>
          )}
        </div>
      </div>
    )
  }

  static Compact = ProductCardCompact
}
