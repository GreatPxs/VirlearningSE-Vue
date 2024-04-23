import request from '@/utils/request.js'

export const deleteExamUser = (examId, userId) => {
  console.log(
    `/exam/deleteExamUser?examId=` +
      examId +
      `&name&paperId=&startTime&endTime&limitTime&userId=` +
      userId +
      `&fileurl&nickName&loginName&passwordMd5&introduceSign&isDeleted&lockedFlag&createTime`
  )
  return request({
    method: 'DELETE',
    url:
      `/exam/deleteExamUser?examId=` +
      examId +
      `&name&paperId=&startTime&endTime&limitTime&userId=` +
      userId +
      `&fileurl&nickName&loginName&passwordMd5&introduceSign&isDeleted&lockedFlag&createTime`
  })
}
