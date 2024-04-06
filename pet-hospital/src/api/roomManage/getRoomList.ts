import request from '@/utils/request.js'

export const getRoomList = (pageCondition) => {
  console.log(
    '/dept/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      '/dept/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  })
}
