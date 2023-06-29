// // 查询字典数据详细
import { queryCategoryList, queryTagList } from '@/services/article'

export function getDictOptions(dictCode: string) {
  return new Promise((resolve, reject) => {
    let operation
    let valueKey = ''
    let nameKey = ''
    const params: {
      [key: string]: any
    } = {
      limit: undefined
    }
    switch (dictCode) {
      // 标签列表
      case 'TAGS':
        nameKey = 'name'
        valueKey = 'id'
        operation = queryTagList
        break
      // 分类列表
      case 'CATEGORIES':
        nameKey = 'name'
        valueKey = 'id'
        operation = queryCategoryList
        break
    }
    if (!operation) {
      reject()
      return
    }
    operation(params)
      .then((res) => {
        let result = res.data || []
        result = result?.list || result
        result = result.map((item: any) => ({
          ...item,
          label: item[nameKey] || undefined,
          value: item[valueKey] || undefined,
          name: item[nameKey] || undefined
        }))
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
