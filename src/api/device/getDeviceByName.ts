import request from '@/utils/request.js'

export const getDeviceByName = (name) => {
  console.log(`/device/select?name=` + name + `&dep`)
  return request({
    method: 'GET',
    url: `/device/select?name=` + name + `&dep`
  })
}
