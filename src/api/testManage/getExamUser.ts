import request from '@/utils/request.js'

export const getExamUser = (examId, pageCondition) => {
  console.log(
    `/exam/examUserList?pageNumber=` +
      pageCondition.pageNumber +
      `&pageSize=` +
      pageCondition.pageSize +
      `&examId=` +
      examId
  )
  return request({
    method: 'GET',
    url:
      `/exam/examUserList?pageNumber=` +
      pageCondition.pageNumber +
      `&pageSize=` +
      pageCondition.pageSize +
      `&examId=` +
      examId
  })
}
