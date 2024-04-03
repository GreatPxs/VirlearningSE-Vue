import request from '@/utils/request.js'

export const changeUserStatus = (userId, targetStatus) => {
  console.log(`/manage-api/v1/users/${targetStatus}`)
  return request({
    method: 'PUT',
    url: `/manage-api/v1/users/${targetStatus}`,
    data: {
      ids: [userId]
    }
  })
}
