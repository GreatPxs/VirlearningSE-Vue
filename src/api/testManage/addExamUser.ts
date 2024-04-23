import request from '@/utils/request.js'

export const addExamUser = (examId, userId) => {
  console.log(
    `/exam/insertExamUser?examId=` +
      examId +
      `&name&paperId=&startTime&endTime&limitTime&userId=` +
      userId +
      `&fileurl&nickName&loginName&passwordMd5&introduceSign&isDeleted&lockedFlag&createTime`
  )
  return request({
    method: 'POST',
    url:
      `/exam/insertExamUser?examId=` +
      examId +
      `&name&paperId=&startTime&endTime&limitTime&userId=` +
      userId +
      `&fileurl&nickName&loginName&passwordMd5&introduceSign&isDeleted&lockedFlag&createTime`
  })
}
