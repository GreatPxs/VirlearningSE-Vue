import request from '@/utils/request.js'

export const getAdminUserInfo = () => {
  return request({
    method: 'GET',
    url: '/manage-api/v1/adminUser/profile'
  })
}
