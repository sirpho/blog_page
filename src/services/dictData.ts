// // 查询字典数据详细
import { getStatistics, getTagStatistics, queryCategoryList } from "@/services/article";

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
      // 分类列表
      case 'CATEGORIES':
        nameKey = 'name'
        valueKey = 'id'
        operation = queryCategoryList
        break
      // 文章类别统计
      case 'STATISTICS':
        nameKey = 'category'
        valueKey = 'category'
        operation = getStatistics
        break
      // 标签云统计
      case 'TAG_STATISTICS':
        nameKey = 'name'
        valueKey = 'name'
        operation = getTagStatistics
        break
    }
    if (!operation) {
      reject()
      return
    }
    operation(params)
      .then((res: any) => {
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
      .catch((error: any) => {
        reject(error)
      })
  })
}
