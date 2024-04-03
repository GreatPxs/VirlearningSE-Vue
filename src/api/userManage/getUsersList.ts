import request from '@/utils/request.js'

export const getUsersList = (pageCondition) => {
  console.log(
    '/manage-api/v1/users?pageNumber=' +
      pageCondition.pageNumber +
      '&pageSize=' +
      pageCondition.pageSize +
      '&lockStatus=1'
  )
  return request({
    method: 'GET',
    url:
      '/manage-api/v1/users?pageNumber=' +
      pageCondition.pageNumber +
      '&pageSize=' +
      pageCondition.pageSize +
      '&lockStatus'
  })
}
