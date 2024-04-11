import request from '@/utils/request.js'

export const getChatHistory = (form) => {
  console.log(`/getchat?beforedate=` + form.startTime + `&afterdate=` + form.endTime)
  return request({
    method: 'POST',
    url: `/getchat?beforedate=` + form.startTime + `&afterdate=` + form.endTime
  })
}
