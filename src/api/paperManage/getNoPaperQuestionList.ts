import request from '@/utils/request.js'

export const getNoPaperQuestionList = (paperId, pageNumber, pageSize) => {
  console.log(
    `/paper/nopaperQuestionList?pageNumber=` +
      pageNumber +
      `&pageSize=` +
      pageSize +
      `&paperId=` +
      paperId
  )
  return request({
    method: 'GET',
    url:
      `/paper/nopaperQuestionList?pageNumber=` +
      pageNumber +
      `&pageSize=` +
      pageSize +
      `&paperId=` +
      paperId
  })
}
