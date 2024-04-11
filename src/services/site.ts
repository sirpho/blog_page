import request from "@/utils/request";

/**
 * 站点信息
 */
export function getSiteInfo(): Promise<any> {
  return request({
    url: `/site/blog/info`,
    method: 'get',
  })
}