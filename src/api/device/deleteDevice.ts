import request from '@/utils/request.js'

export const deleteDevice = (id) => {
  console.log(`/device/delete?id=` + id + `&isdeleted=1`)
  return request({
    method: 'GET',
    url: `/device/delete?id=` + id + `&isdeleted=1`
  })
}
