import request from '@/utils/request.js'

export const deleteTest = (examId) => {
  console.log(`/exam/delete?examId=` + examId + `&name&paperId&startTime&endTime`)
  return request({
    method: 'GET',
    url: `/exam/delete?examId=` + examId + `&name&paperId&startTime&endTime`
  })
}
