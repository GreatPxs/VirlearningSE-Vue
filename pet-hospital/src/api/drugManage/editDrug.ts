import request from '@/utils/request.js'

export const editDrug = (id, drugName, specifications, unit, drugNote) => {
  console.log(
    `/drug/updateIdDrug?id=` +
      id +
      `&drugName=` +
      drugName +
      `&referred=&specifications=` +
      specifications +
      `&unit=` +
      unit +
      `&origin&approvalNumber&pleasedTo&salesPrice&inventory&totalSales&drugNote=` +
      drugNote +
      `&categoryId=&isDelete`
  )
  return request({
    method: 'GET',
    url:
      `/drug/updateIdDrug?id=` +
      id +
      `&drugName=` +
      drugName +
      `&referred=&specifications=` +
      specifications +
      `&unit=` +
      unit +
      `&origin&approvalNumber&pleasedTo&salesPrice&inventory&totalSales&drugNote=` +
      drugNote +
      `&categoryId=&isDelete`
  })
}
