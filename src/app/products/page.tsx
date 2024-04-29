import { ProductsStoreProvider } from '@/features/products/store/ProductsStoreProvider'
import * as api from '@/features/products/api'
import * as categoriesApi from '@/features/home/api'
import { Page as ProductsPage } from '@/features/products/components'
import { getCategsOrProductsImages } from '@/lib'

export const dynamic = 'force-dynamic'
interface SearchParams {
  query: string
}

interface Props {
  searchParams: SearchParams
}

export default async function Page({ searchParams }: Props) {
  const products = await api.fetchProductsByQuery(searchParams.query)
  let images = getCategsOrProductsImages(products)

  if (!images.length) {
    const categories = await categoriesApi.fetchCategories()
    images = getCategsOrProductsImages(categories)
  }

  return (
    <ProductsStoreProvider initialState={products}>
      <ProductsPage images={images} />
    </ProductsStoreProvider>
  )
}
