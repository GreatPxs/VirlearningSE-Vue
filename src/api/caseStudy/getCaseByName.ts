import request from '@/utils/request.js'

export const getCaseByName = (name, pageCondition) => {
  console.log(`/Case/selectCase?symptom&animal&name=` + name + `&pageNoStr&pageSizeStr`)
  return request({
    method: 'POST',
    url:
      `/Case/selectCase?symptom&animal&name=` +
      name +
      `&pageNoStr=` +
      pageCondition.pageNumber +
      `&pageSizeStr=` +
      pageCondition.pageSize
  })
}
