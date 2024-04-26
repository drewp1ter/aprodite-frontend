import { CheckoutPage } from '@/features/checkout/components'
import { CheckoutStoreProvider } from '@/features/checkout/store/CheckoutStoreProvider'

export default function Page() {
  return (
    <CheckoutStoreProvider>
      <CheckoutPage />
    </CheckoutStoreProvider>
  )
}
