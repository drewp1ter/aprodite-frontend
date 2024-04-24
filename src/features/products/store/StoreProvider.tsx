'use client'
import { createContext, useContext, PropsWithChildren } from 'react'
import { Products } from '../store'
import { isServer } from '@/utils'

let store: Products
export const StoreContext = createContext<Products | null>(null)

export function useProductsStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return context
}

function initializeStore(initialData: Pick<Products, 'products'>) {
  const _store = store ?? new Products()

  if (initialData) {
    _store.hydrate(initialData)
  }

  if (isServer()) return _store
  if (!store) store = _store

  return _store
}

interface ProviderProps extends PropsWithChildren {
  initialState: Pick<Products, 'products'>
}

export function StoreProvider({ children, initialState: initialData }: ProviderProps) {
  const store = initializeStore(initialData)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
