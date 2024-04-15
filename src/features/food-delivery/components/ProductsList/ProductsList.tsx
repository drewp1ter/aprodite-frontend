'use client'
import { useState } from 'react'
import clsx from 'clsx'
import { Product } from '../Product'
import { ViewSelector, ViewType } from '../ViewSelector'
import styles from './ProductsList.module.scss'
import productImg from './assets/product.png'

export interface Props {
  className?: string
  products?: Omit<ProductDto, 'createdAt' | 'updatedAt' >[]
}

export function ProductsList({ className, products }: Props) {
  const [view, setView] = useState<ViewType>('list')

  const productsList = products?.map((product) => {
        const ProductComponent = view === 'grid' ? Product.Compact : Product
        return (
          <ProductComponent
            key={product.id}
            title="Мидии в тайском стиле"
            imgSrc={productImg.src}
            calories={product.calories}
            carbonhydrates={product.carbonhydrates}
            fats={product.fats}
            proteins={product.proteins}
            weight={product.weight}
            price={Number(product.price)}
          />
        )
      })

  return (
    <div className={clsx(styles.productsList, className)}>
      <div className={styles.selectAlign}>
        <ViewSelector value={view} onSelect={setView} />
      </div>
      <div data-view={view} className={styles.content}>{productsList}</div>
    </div>
  )
}
