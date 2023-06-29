import { defineStore } from 'pinia'
import { reactive, toRefs } from 'vue'
import { getStorage } from "@/utils/storage";
import config from "/config/config";
const { shortName } = config

export const useStoreUser = defineStore('user', () => {
  const state = reactive({
    token: getStorage({key: `${shortName}_token`}),
    user: getStorage({key: `${shortName}_user`}) || {}
  })

  /**
   * 设置用户信息
   */
  const setStoreUser = (user: any) => {
    state.user = user
  }

  /**
   * 设置用户token
   */
  const setStoreToken = (token: string) => {
    state.token = token
  }

  return {
    ...toRefs(state),
    setStoreUser,
    setStoreToken,
  }
})
