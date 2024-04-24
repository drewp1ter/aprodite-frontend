import createServerContext from '@nimpl/getters/create-server-context'
import Store from './store'

const ServerStoreContext = createServerContext<Store | null>(null)

export default ServerStoreContext
