import request from '@/utils/request.js'

export const getCaseList = (pageCondition) => {
  console.log(
    '/Case/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      '/Case/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  })
}
