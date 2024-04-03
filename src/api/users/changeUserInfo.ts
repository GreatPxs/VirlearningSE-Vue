import request from '@/utils/request.js'

export const changeUserInfo = (nickName: string, passwordMd5: string, introduceSign: string) => {
  return request({
    method: 'PUT',
    url: '/api/v1/user/info',
    data: {
      nickName: nickName,
      passwordMd5: passwordMd5,
      introduceSign: introduceSign
    }
  })
}
