import { PropsWithChildren } from 'react'
import { Header } from '@/ui'
import { CartStoreProvider } from '@/features/cart/store/CartStoreProvider'

export default function RootTemplate({ children }: PropsWithChildren) {
  return (
    <CartStoreProvider>
      <Header />
      {children}
    </CartStoreProvider>  
  )
}
