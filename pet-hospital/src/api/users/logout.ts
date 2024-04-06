import request from '@/utils/request.js'

export const logout = () => {
  return request({
    method: 'POST',
    url: `/api/v1/user/logout`
  })
}
