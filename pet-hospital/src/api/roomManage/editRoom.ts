import request from '@/utils/request.js'

export const editRoom = (id, name, dep_inf, roles) => {
  console.log(`/dept/update?id=` + id + '&name=' + name + '&dep_inf=' + dep_inf + `&role=` + roles)
  return request({
    method: 'GET',
    url: `/dept/update?id=` + id + '&name=' + name + '&dep_inf=' + dep_inf + `&role=` + roles
  })
}
