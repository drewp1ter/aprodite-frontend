'use client'
import { PropsWithChildren } from 'react'
import CilentStoreContext from './StoreContext'
import initializeStore from './initializeStore'

function StoreProvider({ children }: PropsWithChildren) {
  const store = initializeStore()
  return <CilentStoreContext.Provider value={store}>{children}</CilentStoreContext.Provider>
}

export default StoreProvider