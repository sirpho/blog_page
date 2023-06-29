import request from "@/utils/request";

/**
 * 登录
 * @param data
 */
export function login(data: any): Promise<any> {
  return request({
    url: `/user/login`,
    method: 'post',
    data
  })
}