import request from '@/utils/request.js'

export const getDrugByName = (queryCondition, pageCondition) => {
  console.log(
    `/drug/selectDrug?drugName=` +
      queryCondition +
      `&unit&origin&categoryId&pageNoStr=` +
      pageCondition.pageNumber +
      `&pageSizeStr=` +
      pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      `/drug/selectDrug?drugName=` +
      queryCondition +
      `&unit&origin&categoryId&pageNoStr=` +
      pageCondition.pageNumber +
      `&pageSizeStr=` +
      pageCondition.pageSize
  })
}
