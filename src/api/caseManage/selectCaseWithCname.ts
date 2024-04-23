import request from '@/utils/request.js'

export const selectCaseWithCname = (queryCondition, pageCondition) => {
  console.log(
    `/Case/selectCase?symptom&animal` +
      `&name=` +
      queryCondition.name +
      `&cname=` +
      queryCondition.cname +
      `&pageNoStr=` +
      pageCondition.pageNumber +
      `&pageSizeStr=` +
      pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      `/Case/selectCase?symptom&animal` +
      `&name=` +
      queryCondition.name +
      `&cname=` +
      queryCondition.cname +
      `&pageNoStr=` +
      pageCondition.pageNumber +
      `&pageSizeStr=` +
      pageCondition.pageSize
  })
}
