'use client'
import { createContext, useContext, PropsWithChildren } from 'react'
import { Cart } from './cart'
import { isServer } from '@/lib'

export const StoreContext = createContext<Cart | null>(null)

export function useCartStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  if (context === null) {
    throw new Error()
  }

  return context
}

let store: Cart

function initializeStore() {
  const _store = store ?? new Cart()

  if (isServer()) return _store
  store ??= _store

  return _store
}

export function CartStoreProvider({ children }: PropsWithChildren) {
  const store = initializeStore()

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
