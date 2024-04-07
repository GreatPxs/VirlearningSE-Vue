import request from '@/utils/request.js'

export const getQuestionByName = (queryCondition) => {
  console.log(
    `/question/select?type=` + queryCondition.type + `&description=` + queryCondition.description
  )
  return request({
    method: 'GET',
    url:
      `/question/select?type=` + queryCondition.type + `&description=` + queryCondition.description
  })
}
