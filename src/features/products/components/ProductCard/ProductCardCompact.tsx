'use client'
import { ReactNode } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import formatPrice from '@/utils/formatPrice'
import CartIcon from './assets/cart.svg'
import styles from './ProductCard.module.scss'
import { ProductCardBase, Props } from './ProductCardBase'

export class ProductCardCompact extends ProductCardBase {
  render(): ReactNode {
    const { className, product } = this.props
    const { isImgLoaded } = this.state

    return (
      <div className={clsx(styles.productCompact, className)}>
        <div className={styles.imgContainerCompact} data-loaded={isImgLoaded}>
          <Image
            onClick={this.handleImageClick}
            fill
            src={product.images[0]?.url}
            alt={product.name}
            loader={this.imgLoader}
            onLoad={this.handleOnImgLoad}
            onError={() => {}}
          />
        </div>
        <h3>{product.name}</h3>

        {this.supplementFacts({ product, className: styles.infoCompact })}

        <div className={styles.footerCompact}>
          <b>{formatPrice(product.price)}</b>
          <Button className={styles.button} onClick={this.handleCartButtonClick}>
            <CartIcon />
          </Button>
        </div>
      </div>
    )
  }
}
