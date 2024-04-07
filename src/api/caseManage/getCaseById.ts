import request from '@/utils/request.js'

export const getCaseById = (id) => {
  console.log(`/Case/findId?id=` + id)
  return request({
    method: 'GET',
    url: `/Case/findId?id=` + id
  })
}
