import request from '@/utils/request.js'

export const register = (form) => {
  return request({
    method: 'POST',
    url: `/api/v1/user/register`,
    data: {
      loginName: form.loginName,
      password: form.password
    }
  })
}
