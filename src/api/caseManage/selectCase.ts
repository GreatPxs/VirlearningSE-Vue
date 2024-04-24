import request from '@/utils/request.js'

export const selectCase = (queryCondition, pageCondition) => {
  console.log(
    `/Case/selectCase?symptom&animal=` +
      queryCondition.animal +
      `&name=` +
      queryCondition.name +
      `&cname` +
      `&pageNoStr=` +
      pageCondition.pageNumber +
      `&pageSizeStr=` +
      pageCondition.pageSize
  )
  return request({
    method: 'POST',
    url:
      `/Case/selectCase?symptom&animal=` +
      queryCondition.animal +
      `&name=` +
      queryCondition.name +
      `&cname` +
      `&pageNoStr=` +
      pageCondition.pageNumber +
      `&pageSizeStr=` +
      pageCondition.pageSize
  })
}
