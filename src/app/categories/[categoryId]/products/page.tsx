import { StoreProvider } from '@/features/products/store/StoreProvider'
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
    <StoreProvider initialState={{ products }}>
      <ProductsPage params={params} />
    </StoreProvider>
  )
}