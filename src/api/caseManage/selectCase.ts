import request from '@/utils/request.js'

export const selectCase = (queryCondition) => {
  console.log(
    `/Case/selectCase?symptom&animal=` +
      queryCondition.animal +
      `&name=` +
      queryCondition.name +
      `&pageNoStr&pageSizeStr`
  )
  return request({
    method: 'GET',
    url:
      `/Case/selectCase?symptom&animal=` +
      queryCondition.animal +
      `&name=` +
      queryCondition.name +
      `&pageNoStr&pageSizeStr`
  })
}
