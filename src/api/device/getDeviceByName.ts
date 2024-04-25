import request from '@/utils/request.js'

export const getDeviceByName = (name) => {
  console.log(`/device/select?name=` + name + `&dep`)
  return request({
    method: 'POST',
    url: `/device/select?name=` + name + `&dep`
  })
}