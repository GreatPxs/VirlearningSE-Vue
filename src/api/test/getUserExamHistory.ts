import request from '@/utils/request.js'

export const getUserExamHistory = (userId, pageCondition) => {
  console.log(
    `/exam/userExamHistoryList?pageNumber=` +
      pageCondition.pageNumber +
      `&pageSize=` +
      pageCondition.pageSize +
      `&userId=` +
      userId
  )
  return request({
    method: 'GET',
    url:
      `/exam/userExamHistoryList?pageNumber=` +
      pageCondition.pageNumber +
      `&pageSize=` +
      pageCondition.pageSize +
      `&userId=` +
      userId
  })
}
