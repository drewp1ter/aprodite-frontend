'use client'
import { useContext } from 'react'
import StoreContext from '../StoreProvider/StoreContext'

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return context
}
