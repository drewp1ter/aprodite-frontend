'use client'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import { useProductsStore, PRODUCT_NOT_SELECTED } from '../../models'
import { useCartStore } from '@/app/cart/models'
import { Modal, FullScreen } from '@/app/ui'
import { getCategoryProductsRoute } from '@/routes'
import { ProductCard, ProductDetailsDesktop, ProductDetailsMobile } from '..'
import { ViewSelector, ViewType } from '../ViewSelector'
import styles from './ProductsList.module.scss'

export interface Props {
  className?: string
  category?: Pick<CategoryDto, 'id' | 'name'>
}

export const ProductsList = observer(function ProductsList({ className, category }: Props) {
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
    router.push(`${pathname}?showProduct=${productId}`, { scroll: false })
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

  const handleModalClose = () => {
    if (category) {
      router.push(getCategoryProductsRoute(category.id))
    } else {
      router.back()
    }
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
      <Modal className={styles.modal} isOpen={!!productsStore.selectedProduct} onClose={handleModalClose}>
        <ProductDetailsDesktop
          product={productsStore.selectedProduct}
          isAddedToCart={cartStore.isProductInCart(productsStore.selectedProduct?.id)}
          closeButtonTitle={category?.name}
          hasPrev={productsStore.hasPrevProduct}
          hasNext={productsStore.hasNextProduct}
          onClickNext={handleClickNext}
          onClickPrev={handleClickPrev}
          onClickAddToCart={cartStore.add}
          onClose={handleModalClose}
        />
      </Modal>
      <FullScreen className={styles.fullScreen} isOpen={!!productsStore.selectedProduct}>
        <ProductDetailsMobile
          product={productsStore.selectedProduct}
          isAddedToCart={cartStore.isProductInCart(productsStore.selectedProduct?.id)}
          onClickBack={handleModalClose}
          backButtonTitle={category?.name}
          onClickAddToCart={cartStore.add}
        />
      </FullScreen>
    </div>
  )
})
