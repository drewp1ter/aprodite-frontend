'use client'
import { ReactNode } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/ui'
import CartIcon from './assets/cart.svg'
import styles from './ProductCard.module.scss'
import { ProductCardBase } from './ProductCardBase'

export class ProductCardCompact extends ProductCardBase {
  render(): ReactNode {
    const { className, product } = this.props
    const { imgLoadState } = this.state

    return (
      <div className={clsx(styles.productCompact, className)}>
        <div className={clsx(styles.imgContainerCompact, imgLoadState === 'failure' && 'imgPlaceholder')} data-status={imgLoadState}>
          <Image
            onClick={this.handleImageClick}
            fill
            src={product.images[0]?.url}
            alt={product.name}
            loader={this.imgLoader}
            onLoad={this.handleOnImgLoaded}
            onError={this.handleOnImgError}
            loading='eager'
          />
        </div>
        <h3>{product.name}</h3>

        {this.supplementFacts({ product, className: styles.infoCompact })}

        <div className={styles.footerCompact}>
          <b>{product.priceFormated}</b>
          <Button className={styles.button} onClick={this.handleCartButtonClick}>
            <CartIcon />
          </Button>
        </div>
      </div>
    )
  }
}
