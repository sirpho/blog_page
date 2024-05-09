import request from '@/utils/request'

type QueryParam = {
  [key: string]: any
}

/**
 * 统计
 */
export function getStatistics(): Promise<any> {
  return request({
    url: `/article/statistics`,
    method: 'get',
  })
}

/**
 * 统计
 */
export function getTagStatistics(): Promise<any> {
  return request({
    url: `/tag/statistics`,
    method: 'get',
  })
}

export function queryList(params: QueryParam): Promise<any> {
  return request({
    url: '/article/list',
    method: 'get',
    params
  })
}

export function updateArticle(data: QueryParam): Promise<any> {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function removeArticle(data: QueryParam): Promise<any> {
  return request({
    url: `/article/remove/${data.id}`,
    method: 'get',
  })
}

/**
 * 分类列表
 * @param params
 */
export function queryCategoryList(params?: QueryParam): Promise<any> {
  return request({
    url: '/enum/query/ARTICLE_CATEGORY',
    method: 'get',
    params: params || {}
  })
}

/**
 * 标签列表
 * @param params
 */
export function queryTagList(params?: QueryParam): Promise<any> {
  return request({
    url: '/tag/article/list',
    method: 'get',
    params: params || {}
  })
}

/**
 * 浏览文章详情
 * @param id
 */
export function browseArticle(id: string): Promise<any> {
  return request({
    url: `/article/browse/${id}`,
    method: 'get'
  })
}
