import request from '@/utils/request.js'

export const addDrug = (queryCondition) => {
  return request({
    method: 'GET',
    // url: '/drug/addDrug',
    // params: queryCondition

    url:
      `/drug/addDrug?id&drugName=` +
      queryCondition.drugName +
      '&referred&specifications=' +
      queryCondition.specifications +
      '&unit=' +
      queryCondition.unit +
      '&origin&approvalNumber&pleasedTo&salesPrice&inventory&totalSales&drugNote=' +
      queryCondition.drugNote +
      '&categoryId=1&isDelete'
  })
}
