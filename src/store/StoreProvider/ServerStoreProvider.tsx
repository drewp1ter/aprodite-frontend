import { PropsWithChildren } from 'react'
import ServerStoreContext from './ServerStoreContext'
import Store from './store'

export interface Props extends PropsWithChildren {
  store: Store
}

function ServerContextProvider({ children, store }: Props) {
  return <ServerStoreContext.Provider value={store}>{children}</ServerStoreContext.Provider>
}

export default ServerContextProvider
