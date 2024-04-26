'use client'
import { createContext, useContext, PropsWithChildren } from 'react'
import { Checkout } from './checkout'
import { isServer } from '@/lib'

export const StoreContext = createContext<Checkout | null>(null)

export function useCheckoutStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  if (context === null) {
    throw new Error()
  }

  return context
}

let store: Checkout

function initializeStore() {
  const _store = store ?? new Checkout()

  if (isServer()) return _store
  store ??= _store

  return _store
}

export function CheckoutStoreProvider({ children }: PropsWithChildren) {
  const store = initializeStore()

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
