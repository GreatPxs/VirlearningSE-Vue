import request from '@/utils/request.js'

export const getDrugList = (pageCondition) => {
  console.log(
    '/drug/selectDrug?drugName=&unit&origin&categoryId&pageNoStr=' +
      pageCondition.pageNumber +
      '&pageSizeStr=' +
      pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      '/drug/selectDrug?drugName=&unit&origin&categoryId&pageNoStr=' +
      pageCondition.pageNumber +
      '&pageSizeStr=' +
      pageCondition.pageSize
  })
}
