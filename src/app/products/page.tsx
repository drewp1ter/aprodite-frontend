import { ProductsStoreProvider } from './models/ProductsStoreProvider'
import * as api from './api'
import * as categoriesApi from '@/app/api'
import { ProductsPage } from './components'
import { getCategsOrProductsImages } from '@/lib'

export const dynamic = 'force-dynamic'

interface SearchParams {
  query: string
}

interface Props {
  searchParams: SearchParams
}

export default async function Page({ searchParams }: Props) {
  let products: ProductDto[] = []
  try {
    products = await api.fetchProductsByQuery(searchParams.query)
  } catch (e) {
    console.error(e)
  }

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
