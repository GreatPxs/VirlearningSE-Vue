import request from '@/utils/request.js'

export const getDrugByName = (pageCondition) => {
  console.log(
    `/drug/selectDrug?drugName=` +
      pageCondition.name +
      `&unit&origin&categoryId&pageNoStr=&pageSizeStr=`
  )
  return request({
    method: 'GET',
    url:
      `/drug/selectDrug?drugName=` +
      pageCondition +
      `&unit&origin&categoryId&pageNoStr=&pageSizeStr=`
  })
}
