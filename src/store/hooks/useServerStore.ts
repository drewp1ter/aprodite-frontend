import getServerContext from '@nimpl/getters/get-server-context'
import ServerStoreContext from '../StoreProvider/ServerStoreContext'

export function useServerStore() {
  const context = getServerContext(ServerStoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within StoreProvider')
  }

  return context
}
