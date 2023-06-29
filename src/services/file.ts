import {upload} from "@/services/common";
import request from "@/utils/request";

type QueryParam = {
  [key: string]: any
}

/**
 * 上传文件
 * @param formData
 */
export function uploadFile(formData: FormData) {
  return upload({
    url: '/file/upload',
    method: 'post',
    data: formData
  })
}

/**
 * 查询文件列表
 * @param params
 */
export function queryList(params: QueryParam): Promise<any> {
  return request({
    url: '/file/list',
    method: 'get',
    params
  })
}

/**
 * 删除文件
 * @param params
 */
export function deleteFile(params: QueryParam): Promise<any> {
  return request({
    url: '/file/delete',
    method: 'delete',
    params
  })
}
