import Store from './store'

export let store: Store

function initializeStore() {
  const _store = store ?? new Store()

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export default initializeStore