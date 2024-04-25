import { CartPage } from '@/features/cart/components'
import { CartStoreProvider } from '@/features/cart/store/CartStoreProvider'

export default function Page() {
  return (
    <CartStoreProvider>
      <CartPage />
    </CartStoreProvider>
  )
}
