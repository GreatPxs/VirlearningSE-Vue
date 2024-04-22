import request from '@/utils/request.js'

export const getNoExamUser = (examId, pageCondition) => {
  console.log(
    `/exam/noExamUserList?pageNumber=` +
      pageCondition.pageNumber +
      `&pageSize=` +
      pageCondition.pageSize +
      `&examId=` +
      examId
  )
  return request({
    method: 'GET',
    url:
      `/exam/noExamUserList?pageNumber=` +
      pageCondition.pageNumber +
      `&pageSize=` +
      pageCondition.pageSize +
      `&examId=` +
      examId
  })
}
