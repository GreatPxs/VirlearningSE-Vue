import request from '@/utils/request.js'

export const calculateScore = (examId, userAnswer, time) => {
  console.log(
    `/exam/calculateExamScore?examId=` +
      examId +
      `&name&paperId&startTime&endTime&limitTime&userAnswer=` +
      userAnswer +
      `&time=` +
      time
  )
  return request({
    method: 'POST',
    url:
      `/exam/calculateExamScore?examId=` +
      examId +
      `&name&paperId&startTime&endTime&limitTime&userAnswer=` +
      userAnswer +
      `&time=` +
      time
  })
}
