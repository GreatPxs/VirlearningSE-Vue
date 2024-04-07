import request from '@/utils/request.js'

export const getQuestionList = (pageCondition) => {
  console.log(
    '/question/showall?pageNumber=' +
      pageCondition.pageNumber +
      '&pageSize=' +
      pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      '/question/showall?pageNumber=' +
      pageCondition.pageNumber +
      '&pageSize=' +
      pageCondition.pageSize
  })
}
