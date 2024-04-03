import request from '@/utils/request.js'

export const addRoom = (roomName, usage, roles) => {
  console.log(`/dept/insert?id&name=` + roomName + `&dep_inf=` + usage + `&role=` + roles)
  return request({
    method: 'GET',
    url: `/dept/insert?id&name=` + roomName + `&dep_inf=` + usage + `&role=` + roles
  })
}
