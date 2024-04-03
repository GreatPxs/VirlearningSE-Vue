import request from '@/utils/request.js'

export const adminLogout = () => {
  return request({
    method: 'DELETE',
    url: `/manage-api/v1/logout`
  })
}
