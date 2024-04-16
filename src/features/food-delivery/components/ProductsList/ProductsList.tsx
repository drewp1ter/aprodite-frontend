'use client'
import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { Modal } from '@/compenents'
import { ProductCard, ProductDetailsDesktop, ProductDetailsMobile } from '..'
import { ViewSelector, ViewType } from '../ViewSelector'
import styles from './ProductsList.module.scss'

export interface Props {
  className?: string
  products?: ProductDto[]
}

export function ProductsList({ className, products }: Props) {
  const [view, setView] = useState<ViewType>('list')
  const [isModalOpened, setIsModalOpened] = useState(false)

  const handleProductClick = (productId: number) => {
    setIsModalOpened(true)
  }

  const productsList = useMemo(
    () =>
      products?.map((product) => {
        const ProductComponent = view === 'grid' ? ProductCard.Compact : ProductCard
        return <ProductComponent key={product.id} product={product} onImageClick={handleProductClick} />
      }),
    [view]
  )

  return (
    <div className={clsx(styles.productsList, className)}>
      <div className={styles.selectAlign}>
        <ViewSelector value={view} onSelect={setView} />
      </div>
      <div data-view={view} className={styles.content}>
        {productsList}
      </div>
      <Modal open={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <ProductDetailsDesktop />
      </Modal> 
      <ProductDetailsMobile />
    </div>
  )
}
