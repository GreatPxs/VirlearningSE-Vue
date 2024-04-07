import request from '@/utils/request.js'

export const deleteCase = (id) => {
  console.log(`/Case/deleteCase?id=` + id)
  return request({
    method: 'GET',
    url: `/Case/deleteCase?id=` + id
  })
}
