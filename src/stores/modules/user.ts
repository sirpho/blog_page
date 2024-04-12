import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { getStorage } from "@/utils/storage";

export const useStoreUser = defineStore('user', () => {
  const state = reactive({
    user: getStorage({key: `user`}) || {}
  })

  /**
   * 设置用户信息
   */
  const setStoreUser = (user: any) => {
    state.user = user
  }


  return {
    ...toRefs(state),
    setStoreUser,
  }
})
