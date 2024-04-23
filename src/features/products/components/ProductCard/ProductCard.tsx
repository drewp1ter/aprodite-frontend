'use client'
import { ReactNode } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Button } from '@/compenents'
import CartIcon from './assets/cart.svg'
import formatPrice from '@/utils/formatPrice'
import styles from './ProductCard.module.scss'
import { ProductCardBase } from './ProductCardBase'
import { ProductCardCompact } from './ProductCardCompact'

export class ProductCard extends ProductCardBase {
  render(): ReactNode {
    const { className, product } = this.props
    const { isImgLoaded } = this.state

    return (
      <div className={clsx(styles.product, className)}>
        <div onClick={this.handleImageClick} className={styles.imgContainer} data-loaded={isImgLoaded}>
          <Image fill src={product.images[0]?.url} alt={product.name} loader={this.imgLoader} onLoad={this.handleOnImgLoad} onError={() => {}} />
        </div>

        <div className={styles.title}>
          <h3>{product.name}</h3>
          <b>{formatPrice(product.price)}</b>
        </div>

        <div className={styles.footer}>
          {this.supplementFacts({ product, className: styles.info })}
          <Button className={styles.button} onClick={this.handleCartButtonClick}>
            <CartIcon />
          </Button>
        </div>
      </div>
    )
  }

  static Compact = ProductCardCompact
}

