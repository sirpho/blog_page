import { Message } from '@arco-design/web-vue'
import type { Method } from 'axios'
import request from '@/utils/request'

export type UploadRequestConfig<D = any> = {
  url: string
  method?: Method | string
  timeout?: number
  headers?: HeadersInit
  data?: D
  params?: any
  showTip?: boolean // 展示下载中字样
}

export default async function uploadFile(options: UploadRequestConfig): Promise<ResponseResult> {
  if (options.showTip) {
    Message.loading({
      content: `文件上传中，请耐心等待。。。。`,
      id: 'uploadKey',
      duration: 0
    })
  }
  const headers = {
    ...options.headers,
    'Content-Type': 'multipart/form-data'
  }
  const res = await request({
    url: options.url,
    method: options.method,
    data: options.data,
    params: options.params,
    headers: headers,
    timeout: options.timeout
  })
  if (options.showTip) {
    if (res.code === 200) {
      Message.success({
        content: `导入成功`,
        id: 'uploadKey',
        duration: 1
      })
    } else {
      Message.error({
        content: res.msg || '操作异常',
        id: 'uploadKey',
        duration: 1
      })
    }
  }

  return res
}
