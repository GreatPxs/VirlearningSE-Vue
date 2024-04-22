import request from '@/utils/request.js'

export const calculateScore = (examId, userAnswer) => {
  console.log(
    `/exam/calculateExamScore?examId=` +
      examId +
      `&name&paperId&startTime&endTime&userAnswer=` +
      userAnswer
  )
  return request({
    method: 'POST',
    url:
      `/exam/calculateExamScore?examId=` +
      examId +
      `&name&paperId&startTime&endTime&userAnswer=` +
      userAnswer
  })
}
