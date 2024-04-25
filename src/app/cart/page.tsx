import { Header } from '@/ui'
import { CartPage } from '@/features/cart/components'
import { CartStoreProvider } from '@/features/cart/store/CartStoreProvider'

export default function Page() {
  return (
    <CartStoreProvider>
      <Header />
      <CartPage />
    </CartStoreProvider>
  )
}
