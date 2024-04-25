import request from '@/utils/request.js'

export const deleteDevice = (id) => {
  console.log(`/device/delete?id=` + id)
  return request({
    method: 'GET',
    url: `/device/delete?id=` + id
  })
}
