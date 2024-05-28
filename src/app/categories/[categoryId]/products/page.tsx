import { ProductsStoreProvider } from '@/app/products/models/ProductsStoreProvider'
import * as api from '@/app/products/api'
import { ProductsPage } from '@/app/products/components'
import { getCategsOrProductsImages } from '@/lib'

// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config
export const dynamic = 'force-dynamic'
interface Params {
  categoryId: string
}

interface Props {
  params: Params
}

export default async function Page({ params }: Props) {
  let products: ProductDto[] = []
  
  try {
    products = await api.fetchProductsByCategoryId(params.categoryId)
  } catch (e) {
    console.error(e)
  }
  
  const images = getCategsOrProductsImages(products)

  return (
    <ProductsStoreProvider initialState={products}>
        <ProductsPage categoryId={params.categoryId} images={images} />
    </ProductsStoreProvider>
  )
}
