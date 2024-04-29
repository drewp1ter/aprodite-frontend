import { PropsWithChildren } from 'react'
import type { Metadata } from 'next'
import { Footer, Header } from '@/ui'
import { CartStoreProvider } from '@/features/cart/store/CartStoreProvider'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'РГК Афродита',
  description: 'Ресторанно-гостиничный комплекс "Афродита"',
  icons: '/favicon.ico'
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="ru">
      <body>
        <CartStoreProvider>
          <Header />
          {children}
          <Footer />
        </CartStoreProvider>
      </body>
    </html>
  )
}
