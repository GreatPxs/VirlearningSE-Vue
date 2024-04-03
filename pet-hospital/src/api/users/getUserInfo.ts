import request from '@/utils/request.js'

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/api/v1/user/info'
  })
}
