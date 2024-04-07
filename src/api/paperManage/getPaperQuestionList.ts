import request from '@/utils/request.js'

export const getPaperQuestionList = (paperId, pageNumber, pageSize) => {
  console.log(
    `/paper/paperQuestionList?pageNumber=` +
      pageNumber +
      `&pageSize=` +
      pageSize +
      `&paperId=` +
      paperId
  )
  return request({
    method: 'GET',
    url:
      `/paper/paperQuestionList?pageNumber=` +
      pageNumber +
      `&pageSize=` +
      pageSize +
      `&paperId=` +
      paperId
  })
}
