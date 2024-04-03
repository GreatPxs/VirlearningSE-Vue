import request from '@/utils/request.js'

export const login = (loginName, passwordMd5) => {
  return request({
    method: 'POST',
    url: `/api/v1/user/login`,
    data: {
      loginName: loginName,
      passwordMd5: passwordMd5
    }
  })
}
