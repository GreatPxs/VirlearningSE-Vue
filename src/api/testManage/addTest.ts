import request from '@/utils/request.js'

export const addTest = (form) => {
  console.log(
    `/exam/insert?examId&name=` +
      form.name +
      `&paperId=` +
      form.paperId +
      `&startTime=` +
      form.startTime +
      `&endTime=` +
      form.endTime
  )
  return request({
    method: 'GET',
    url:
      `/exam/insert?examId&name=` +
      form.name +
      `&paperId=` +
      form.paperId +
      `&startTime=` +
      form.startTime +
      `&endTime=` +
      form.endTime
  })
}
