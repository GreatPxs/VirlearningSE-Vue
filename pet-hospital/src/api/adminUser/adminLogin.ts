import request from '@/utils/request.js'

export const adminLogin = (userName, passwordMd5) => {
  return request({
    method: 'POST',
    url: `/manage-api/v1/adminUser/login`,
    data: {
      userName: userName,
      passwordMd5: passwordMd5
    }
  })
}
