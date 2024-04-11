import request from '@/utils/request.js'

export const getExamScore = (examId, userId) => {
  console.log(
    `/exam/getExamScore?examId=` +
      examId +
      `&name&paperId&startTime&endTime&userId=` +
      userId +
      `&fileurl&nickName&loginName&passwordMd5&introduceSign&isDeleted&lockedFlag&createTime`
  )
  return request({
    method: 'GET',
    url:
      `/exam/getExamScore?examId=` +
      examId +
      `&name&paperId&startTime&endTime&userId=` +
      userId +
      `&fileurl&nickName&loginName&passwordMd5&introduceSign&isDeleted&lockedFlag&createTime`
  })
}
