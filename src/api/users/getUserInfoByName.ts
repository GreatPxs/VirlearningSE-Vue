import request from '@/utils/request.js'

export const getUserInfoByName = (loginname) => {
  return request({
    method: 'POST',
    url: '/api/v1/user/findname?loginname=' + loginname
  })
}
