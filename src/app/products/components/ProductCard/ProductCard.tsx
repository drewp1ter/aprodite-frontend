'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/app/ui'
import { getCartRoute } from '@/routes'
import * as assets from './assets'
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
            src={product.images.at(-1)?.url ?? ''}
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
          <b>{product.priceFormated}</b>
        </div>

        <div className={styles.footer}>
          {this.supplementFacts({ product, className: styles.info })}
          {isAddedToCart ? (
            <Link href={getCartRoute()}>
              <Button className={styles.button}>
                <assets.CartIcon />
              </Button>
            </Link>
          ) : (
            <Button className={styles.button} onClick={this.handleCartButtonClick}>
              <assets.BagIcon />
            </Button>
          )}
        </div>
      </div>
    )
  }

  static Compact = ProductCardCompact
}
