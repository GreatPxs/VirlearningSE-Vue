import request from '@/utils/request.js'

export const getRoomByRole = (role) => {
  console.log(`/dept/getdepname?role=` + role)
  return request({
    method: 'POST',
    url: `/dept/getdepname?role=` + role
  })
}
