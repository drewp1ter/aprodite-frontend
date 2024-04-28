import { ProductsStoreProvider } from '@/features/products/store/ProductsStoreProvider'
import * as api from '@/features/products/api'
import { Page as ProductsPage } from '@/features/products/components'
import { getCategsOrProductsImages } from '@/lib'

interface Params {
  categoryId: string
}

interface Props {
  params: Params
}

export default async function Page({ params }: Props) {
  const products = await api.fetchProductsByCategoryId(params.categoryId)
  const images = getCategsOrProductsImages(products)

  return (
    <ProductsStoreProvider initialState={products}>
        <ProductsPage categoryId={params.categoryId} images={images} />
    </ProductsStoreProvider>
  )
}
