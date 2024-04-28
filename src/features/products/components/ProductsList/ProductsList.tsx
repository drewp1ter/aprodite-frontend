'use client'
import { useState } from 'react'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'
import { useProductsStore } from '../../store'
import { useCartStore } from '@/features/cart/store'
import { Modal, FullScreen } from '@/ui'
import { ProductCard, ProductDetailsDesktop, ProductDetailsMobile } from '..'
import { ViewSelector, ViewType } from '../ViewSelector'
import styles from './ProductsList.module.scss'

export interface Props {
  className?: string
  categoryName?: string
}

const DESKTOP_WIDTH_START = 1024

export const ProductsList = observer(function ProductsList({ className, categoryName }: Props) {
  const productsStore = useProductsStore()
  const cartStore = useCartStore()
  const [view, setView] = useState<ViewType>('list')
  const [isModalOpened, setIsModalOpened] = useState<false | 'mobile' | 'desktop'>(false)

  const handleProductClick = (productId: number) => {
    productsStore.selectProductById(productId)
    const modalType = window.innerWidth < DESKTOP_WIDTH_START ? 'mobile' : 'desktop'
    setIsModalOpened(modalType)
  }

  const handleCloseModal = () => setIsModalOpened(false)

  const productsList = productsStore.products.map((product) => {
    const ProductComponent = view === 'grid' ? ProductCard.Compact : ProductCard
    return (
      <ProductComponent
        key={product.id}
        product={product}
        onImageClick={handleProductClick}
        isAddedToCart={cartStore.isProductInCart(product.id)}
        onClickAddToCart={cartStore.add}
      />
    )
  })

  return (
    <div className={clsx(styles.productsList, className)}>
      <div className={styles.selectAlign}>
        <ViewSelector value={view} onSelect={setView} />
      </div>
      <div data-view={view} className={styles.content}>
        {productsList}
      </div>
      {productsStore.selectedProduct && (
        <>
          <Modal isOpen={isModalOpened === 'desktop'} onClose={handleCloseModal}>
            <ProductDetailsDesktop
              product={productsStore.selectedProduct}
              isAddedToCart={cartStore.isProductInCart(productsStore.selectedProduct.id)}
              closeButtonTitle={categoryName}
              onClickNext={productsStore.selectNextProduct}
              onClickPrev={productsStore.selectPrevProduct}
              onClickAddToCart={cartStore.add}
              onClose={handleCloseModal}
            />
          </Modal>
          <FullScreen isOpen={isModalOpened === 'mobile'}>
            <ProductDetailsMobile
              product={productsStore.selectedProduct}
              isAddedToCart={cartStore.isProductInCart(productsStore.selectedProduct.id)}
              onClickBack={handleCloseModal}
              backButtonTitle={categoryName}
              onClickAddToCart={cartStore.add}
            />
          </FullScreen>
        </>
      )}
    </div>
  )
})
