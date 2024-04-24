import { StoreProvider } from '@/store/StoreProvider'
import { Page as ProductsPage } from '@/features/products/components'

interface Params {
  categoryId: string
}

interface Props {
  params: Params
}

export default function Page({ params }: Props) {
  return (
    <StoreProvider>
      <ProductsPage params={params} />
    </StoreProvider>
  )
}
