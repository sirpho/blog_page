import { createPinia } from 'pinia'
import { useStoreRoutes } from './modules/routes'
import { useStoreUser } from './modules/user'
import { useStoreDict } from './modules/dict'
export { useStoreRoutes }

export function useStore() {
  return {
    routes: useStoreRoutes(),
    user: useStoreUser(),
    dict: useStoreDict(),
  }
}

export default createPinia()
