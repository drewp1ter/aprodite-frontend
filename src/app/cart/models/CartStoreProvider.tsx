'use client'
import useEffectOnce from 'react-use/lib/useEffectOnce'
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

let isHydrated = false

export function CartStoreProvider({ children }: PropsWithChildren) {
  const store = initializeStore()

  useEffectOnce(() => {
    if (!isHydrated) {
      store.hydrate()
      isHydrated = true
    } 
  })

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
