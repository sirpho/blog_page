import type { DownLoadRequestConfig } from '@/utils/axios/fetchFile'
import fetchFile from '@/utils/axios/fetchFile'
import uploadFile from '@/utils/axios/uploadFile'
import type { UploadRequestConfig } from '@/utils/axios/uploadFile'

export function download(params: DownLoadRequestConfig) {
  const { showTip = true, method = 'get' } = params
  return fetchFile({
    ...params,
    showTip,
    method
  })
}
export function upload(params: UploadRequestConfig) {
  const { showTip = true, timeout = 60 * 1000, method = 'post' } = params
  return uploadFile({
    ...params,
    showTip,
    timeout,
    method
  })
}
