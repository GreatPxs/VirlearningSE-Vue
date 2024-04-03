import request from '@/utils/request.js'

export const deleteDrug = (id) => {
  console.log(`/drug/deleteIdDrug?id=` + id)
  return request({
    method: 'GET',
    url: `/drug/deleteIdDrug?id=` + id
  })
}
