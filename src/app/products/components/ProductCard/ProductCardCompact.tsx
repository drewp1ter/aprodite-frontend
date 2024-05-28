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

export class ProductCardCompact extends ProductCardBase {
  render(): ReactNode {
    const { className, product, isAddedToCart } = this.props
    const { imgLoadState } = this.state

    return (
      <div className={clsx(styles.productCompact, className)}>
        <div
          className={clsx(styles.imgContainerCompact, imgLoadState === 'failure' && 'imgPlaceholder')}
          onClick={this.handleImageClick}
          data-status={imgLoadState}
        >
          <Image
            onClick={this.handleImageClick}
            fill
            src={product.images.at(-1)?.url ?? ''}
            alt={product.name}
            loader={this.imgLoader}
            onLoad={this.handleOnImgLoaded}
            onError={this.handleOnImgError}
            loading="eager"
          />
        </div>
        <h3>{product.name}</h3>

        {this.supplementFacts({ product, className: styles.infoCompact })}

        <div className={styles.footerCompact}>
          <b>{product.priceFormated}</b>
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
}
