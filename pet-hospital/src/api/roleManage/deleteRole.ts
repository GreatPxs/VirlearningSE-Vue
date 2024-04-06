import request from '@/utils/request.js'

export const deleteRole = (id) => {
  console.log(`/role/delete?id=` + id + '&name&dep_name&role&sex&age')
  return request({
    method: 'GET',
    url: `/role/delete?id=` + id + '&name&dep_name&role&sex&age'
  })
}
