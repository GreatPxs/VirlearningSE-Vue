import request from '@/utils/request.js'

export const editTest = (examId, form) => {
  console.log(
    `/exam/modify?examId=` +
      examId +
      `&name=` +
      form.name +
      `&paperId&startTime=` +
      form.startTime +
      `&endTime=` +
      form.endTime +
      `&limitTime=` +
      form.limitTime * 60
  )
  return request({
    method: 'GET',
    url:
      `/exam/modify?examId=` +
      examId +
      `&name=` +
      form.name +
      `&paperId&startTime=` +
      form.startTime +
      `&endTime=` +
      form.endTime +
      `&limitTime=` +
      form.limitTime * 60
  })
}
