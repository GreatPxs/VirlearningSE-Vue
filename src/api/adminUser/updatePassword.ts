import request from '@/utils/request.js'

export const updatePassword = (oldPasswordMd5, newPasswordMd5) => {
  return request({
    method: 'PUT',
    url: `/manage-api/v1/adminUser/password`,
    data: {
      originalPassword: oldPasswordMd5,
      newPassword: newPasswordMd5
    }
  })
}
