import request from '@/utils/request.js'

export const getTestByName = (queryCondition) => {
  console.log(`/exam/select?name=` + queryCondition)
  return request({
    method: 'GET',
    url: `/exam/select?name=` + queryCondition
  })
}
