'use client'
import { useState } from 'react'
import { useEffectOnce } from 'react-use'
import { observer } from 'mobx-react-lite'
import clsx from 'clsx'
import { useStore } from '@/store/hooks'
import { Modal, FullScreen } from '@/compenents'
import { ProductCard, ProductDetailsDesktop, ProductDetailsMobile } from '..'
import { ViewSelector, ViewType } from '../ViewSelector'
import styles from './ProductsList.module.scss'

export interface Props {
  className?: string
  categoryId: string
}

const DESKTOP_WIDTH_START = 1024

export const ProductsList = observer(function ProductsList({ className, categoryId }: Props) {
  const [view, setView] = useState<ViewType>('list')
  const [isModalOpened, setIsModalOpened] = useState(false)
  const [isFullScreenOpened, setIsFullScreenOpened] = useState(false)

  const handleProductClick = (productId: number) => {
    if (window.innerWidth < DESKTOP_WIDTH_START) {
      setIsFullScreenOpened(true)
    } else {
      setIsModalOpened(true)
    }
  }

  const store = useStore()

  useEffectOnce(() => {
    console.log(store?.products.status)
    if (store?.products.status === 'initial') {
      store.products.fetchProducts(categoryId)
    }
  })

  const productsList = store?.products.products.map((product) => {
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
        <ProductDetailsDesktop />
      </Modal>
      <FullScreen isOpen={isFullScreenOpened}>
        <ProductDetailsMobile onClickBack={() => setIsFullScreenOpened(false)} />
      </FullScreen>
    </div>
  )
})
