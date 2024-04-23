import request from '@/utils/request.js'

export const getExamAnswer = (examId, userId) => {
  console.log(
    `/exam/getExamUserAnswer?examId=` +
      examId +
      `&name&paperId&startTime&endTime&limitTime&userId=` +
      userId +
      `&fileurl&nickName&loginName&passwordMd5&introduceSign&isDeleted&lockedFlag&createTime`
  )
  return request({
    method: 'GET',
    url:
      `/exam/getExamUserAnswer?examId=` +
      examId +
      `&name&paperId&startTime&endTime&limitTime&userId=` +
      userId +
      `&fileurl&nickName&loginName&passwordMd5&introduceSign&isDeleted&lockedFlag&createTime`
  })
}
