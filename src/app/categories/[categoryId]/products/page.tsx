import { Header } from '@/ui'
import { ProductsStoreProvider } from '@/features/products/store/ProductsStoreProvider'
import { CartStoreProvider } from '@/features/cart/store/CartStoreProvider'
import * as api from '@/features/products/api'
import { Page as ProductsPage } from '@/features/products/components'

interface Params {
  categoryId: string
}

interface Props {
  params: Params
}

export default async function Page({ params }: Props) {
  const products = await api.fetchProducts(params.categoryId)

  return (
    <ProductsStoreProvider initialState={{ products }}>
      <CartStoreProvider>
        <Header />
        <ProductsPage categoryId={params.categoryId} />
      </CartStoreProvider>
    </ProductsStoreProvider>
  )
}
