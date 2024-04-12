import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios, { Axios } from 'axios'
import type { AxiosPromise } from 'axios'
import qs from 'qs'
import config from '/config/config'
import router from '@/router'
import { tansParams } from '@sirpho/utils'
import { checkURL } from '@sirpho/utils/validate'
import { AxiosCanceler } from './axios/axiosCancel'
import { delayAsync } from '@sirpho/utils/delayAsync'
import { Message } from '@arco-design/web-vue'
import { useStoreUser } from "@/stores/modules/user";
import { removeStorage } from "@/utils/storage";

export interface CreateAxiosOptions extends AxiosRequestConfig {
  headers?: any
  isMock?: boolean
  customize?: boolean
  carryToken?: boolean
  ignoreCancelToken?: boolean
}

export interface GAxiosInstance extends Axios {
  (config: CreateAxiosOptions): AxiosPromise<ResponseResult>

  (url: string, config?: CreateAxiosOptions): AxiosPromise<ResponseResult>
}

let loadingInstance: any

const { contentType, requestTimeout, successCode, shortName } = config

const axiosCanceler = new AxiosCanceler()

/**
 * @description 处理code异常
 * @param {*} code
 * @param {*} msg
 */
const handleCode = (code: number, msg: string) => {
  setTimeout(async () => {
    switch (code) {
      case 401:
        Message.error(msg || '登录失效')
        await delayAsync(1)
        removeStorage(`${shortName}_user`)
        removeStorage(`${shortName}_token`)
        await router.push("login")
        window.location.reload()
        break
      case 403:
        router.push({ path: '/' })
        Message.error(msg || '无访问权限')
        break
      default:
        Message.error(msg || `后端接口${code}异常`)
        break
    }
  })
}
/**
 * @description axios初始化
 */
const instance: GAxiosInstance = axios.create({
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})
/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(
  (config: any) => {
    const user = useStoreUser()

    const {
      headers: { ignoreCancelToken }
    } = config

    const ignoreCancel =
      ignoreCancelToken !== undefined ? ignoreCancelToken : config?.ignoreCancelToken || true
    !ignoreCancel && axiosCanceler.addPending(config)

    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    if (!checkURL(config.url)) {
      config.baseURL = import.meta.env.VITE_BASE_URL
    }

    if(user?.token) {
      config.headers.token = user.token
    }

    if (
      config.data &&
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8'
    )
      config.data = qs.stringify(config.data)
    return config
  },
  (error: Error | AxiosError) => {
    return Promise.reject(error)
  }
)
/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response: AxiosResponse<any>): any => {
    response && axiosCanceler.removePending(response.config as CreateAxiosOptions)
    if (loadingInstance) loadingInstance.close()
    const { data, config } = response
    const { code, msg = '', message = '' } = data as ResponseResult
    // 是否操作正常
    if ((config as CreateAxiosOptions).customize) return data
    else if (successCode.includes(code)) return data
    else {
      handleCode(code, msg || message)
      return Promise.reject(false)
    }
  },
  (error: any): Promise<ResponseResult | boolean> => {
    if (loadingInstance) loadingInstance.close()
    const { response, config } = error
    let errorMessage = error.message || ''
    if (error.response && error.response.data) {
      const { status } = response
      handleCode(status, errorMessage)
      return Promise.reject(errorMessage)
    } else {
      if (errorMessage === 'Network Error') {
        errorMessage = '后端接口连接异常'
      }
      if (errorMessage.includes('timeout')) {
        errorMessage = '后端接口请求超时'
      }
      if (errorMessage.includes('Request failed with status code')) {
        const code = errorMessage.substr(errorMessage.length - 3)
        errorMessage = '后端接口' + code || '' + '异常'
      }
      if (!(config as CreateAxiosOptions).customize) {
        Message.error(errorMessage || `后端接口未知异常`)
      }
      return Promise.reject(errorMessage || `后端接口未知异常`)
    }
  }
)

const request: (opt?: CreateAxiosOptions) => Promise<ResponseResult> | any = async (opt: any) =>
  await instance.request(opt)

export default request
