import request from '@/utils/request.js'

export const getDrugList = (pageCondition) => {
  console.log(
    '/drug/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      '/drug/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  })
}
