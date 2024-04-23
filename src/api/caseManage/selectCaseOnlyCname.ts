import request from '@/utils/request.js'

export const selectCaseOnlyCname = (cname) => {
  console.log(`/Case/selectCase?symptom&animal&name&cname=` + cname + `&pageNoStr&pageSizeStr`)
  return request({
    method: 'GET',
    url: `/Case/selectCase?symptom&animal&name&cname=` + cname + `&pageNoStr&pageSizeStr`
  })
}
