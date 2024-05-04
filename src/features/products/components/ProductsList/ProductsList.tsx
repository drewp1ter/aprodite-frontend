'use client'
import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'
import { useProductsStore, PRODUCT_NOT_SELECTED } from '../../store'
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

  const pathname = usePathname()
  const router = useRouter()
  const showProductId = parseInt(useSearchParams().get('showProduct') ?? PRODUCT_NOT_SELECTED.toString(), 10)

  useEffect(() => {
    productsStore.selectProductById(showProductId)
  }, [showProductId])

  const [view, setView] = useState<ViewType>('list')

  const handleProductClick = (productId: number) => {
    router.push(`${pathname}?showProduct=${productId}`)
  }

  const handleClickNext = () => {
    if (showProductId === productsStore.nextProductId) return
    // router.replace isn't suitable because it causes a full page remount
    window.history.replaceState({}, '', `${pathname}?showProduct=${productsStore.nextProductId}`)
  }

  const handleClickPrev = () => {
    if (showProductId === productsStore.prevProductId) return
    window.history.replaceState({}, '', `${pathname}?showProduct=${productsStore.prevProductId}`)
  }

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
      <Modal isOpen={productsStore.selectedProduct && window.innerWidth >= DESKTOP_WIDTH_START} onClose={router.back}>
        <ProductDetailsDesktop
          product={productsStore.selectedProduct}
          isAddedToCart={cartStore.isProductInCart(productsStore.selectedProduct?.id)}
          closeButtonTitle={categoryName}
          hasPrev={productsStore.hasPrevProduct}
          hasNext={productsStore.hasNextProduct}
          onClickNext={handleClickNext}
          onClickPrev={handleClickPrev}
          onClickAddToCart={cartStore.add}
          onClose={router.back}
        />
      </Modal>
      <FullScreen isOpen={window.innerWidth < DESKTOP_WIDTH_START}>
        <ProductDetailsMobile
          product={productsStore.selectedProduct}
          isAddedToCart={cartStore.isProductInCart(productsStore.selectedProduct?.id)}
          onClickBack={router.back}
          backButtonTitle={categoryName}
          onClickAddToCart={cartStore.add}
        />
      </FullScreen>
    </div>
  )
})
