'use client'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'
import { useProductsStore } from '../../store'
import { Modal, FullScreen } from '@/compenents'
import { ProductCard, ProductDetailsDesktop, ProductDetailsMobile } from '..'
import { ViewSelector, ViewType } from '../ViewSelector'
import styles from './ProductsList.module.scss'

export interface Props {
  className?: string
}

const DESKTOP_WIDTH_START = 1024

export const ProductsList = observer(function ProductsList({ className }: Props) {
  const productsStore = useProductsStore()
  const [view, setView] = useState<ViewType>('list')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isFullScreenOpened, setIsFullScreenOpened] = useState(false)

  const handleProductClick = (productId: number) => {
    productsStore.selectProductById(productId)
    if (window.innerWidth < DESKTOP_WIDTH_START) {
      setIsFullScreenOpened(true)
    } else {
      setIsModalOpened(true)
    }
  }

  const productsList = productsStore.products.map((product) => {
    const ProductComponent = view === 'grid' ? ProductCard.Compact : ProductCard
    return <ProductComponent key={product.id} product={product} onImageClick={handleProductClick} />
  })

  return (
    <div className={clsx(styles.productsList, className)}>
      <div className={styles.selectAlign}>
        <ViewSelector value={view} onSelect={setView} />
      </div>
      <div data-view={view} className={styles.content}>
        {productsList}
      </div>
      <Modal isOpen={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <ProductDetailsDesktop
          product={productsStore.selectedProduct}
          onClickNext={productsStore.selectNextProduct}
          onClickPrev={productsStore.selectPrevProduct}
        />
      </Modal>
      <FullScreen isOpen={isFullScreenOpened}>
        <ProductDetailsMobile onClickBack={() => setIsFullScreenOpened(false)} />
      </FullScreen>
    </div>
  )
})
