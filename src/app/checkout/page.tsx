import { CheckoutPage } from './components'
import { CheckoutStoreProvider } from './models/CheckoutStoreProvider'
import * as api from './api'

export const dynamic = 'force-dynamic'

export default async function Page() {
  let deliveryPrices: DeliveryPriceDto[] = []
  try {
    deliveryPrices = await api.getDeliveryPrices()
  } catch (e) {
    console.error(e)
  }

  return (
    <CheckoutStoreProvider>
      <CheckoutPage deliveryPrices={deliveryPrices} />
    </CheckoutStoreProvider>
  )
}
