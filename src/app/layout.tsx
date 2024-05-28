import { PropsWithChildren } from 'react'
import { ToastContainer } from 'react-toastify'
import type { Metadata } from 'next'
import { Footer, Header } from './ui'
import { CartStoreProvider } from './cart/models/CartStoreProvider'
import '@/styles/globals.scss'

export const metadata: Metadata = {
  title: 'РГК Афродита',
  description: 'Ресторанно-гостиничный комплекс "Афродита" - Доставка еды',
  keywords: 'доставка еды белореченск афродита еда пицца шашлык мангал',
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
        <ToastContainer theme="colored" position="top-right" autoClose={5000} />
      </body>
    </html>
  )
}
