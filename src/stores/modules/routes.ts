import { reactive, toRefs } from 'vue'
import { defineStore } from 'pinia'

/**
 * @description store-routes 路由
 */
export interface RoutesState {
  routes: any[]
  routerLoadList: string[]
  routerLoading: boolean
}

export const useStoreRoutes = defineStore('routes', () => {
  const state = reactive({
    routes: [],
    routerLoadList: [],
    routerLoading: false
  } as RoutesState)

  /**
   * @description 重置路由
   */
  const resetRoute = () => {
    state.routes = []
    state.routerLoadList = []
  }

  /**
   * @description 添加路由记录
   */
  const addRouterLoadList = (path: string) => {
    state.routerLoadList.push(path)
  }

  /**
   * @description 修改state状态
   */
  const changeValue = (type: string, value: any) => {
    // @ts-ignore
    state[type] = value
  }

  return {
    ...toRefs(state),
    resetRoute,
    addRouterLoadList,
    changeValue
  }
})
