import request from '@/utils/request.js'

export const getPaperList = (pageCondition) => {
  console.log(
    '/paper/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      '/paper/showall?pageNumber=' +
      pageCondition.pageNumber +
      '&pageSize=' +
      pageCondition.pageSize
  })
}
