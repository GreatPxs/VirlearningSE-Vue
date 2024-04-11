import request from '@/utils/request.js'

export const getTestList = (pageCondition) => {
  console.log(
    '/exam/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      '/exam/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  })
}
