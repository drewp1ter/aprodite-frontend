'use client'
import { createContext, useContext, PropsWithChildren } from 'react'
import { Products } from './products'
import { isServer } from '@/lib'

export const StoreContext = createContext<Products | null>(null)

export function useProductsStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  if (context === null) {
    throw new Error()
  }

  return context
}

let store: Products

function initializeStore(initialData: ProductDto[]) {
  const _store = store ?? new Products()

  if (initialData) {
    _store.hydrate(initialData)
  }

  if (isServer()) return _store
  store ??= _store

  return _store
}

export interface ProviderProps extends PropsWithChildren {
  initialState: ProductDto[]
}

export function ProductsStoreProvider({ children, initialState: initialData }: ProviderProps) {
  const store = initializeStore(initialData)

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}
