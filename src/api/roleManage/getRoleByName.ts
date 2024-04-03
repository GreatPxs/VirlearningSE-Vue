import request from '@/utils/request.js'

export const getRoleByName = (queryCondition) => {
  console.log(`/role/select?name=` + queryCondition + `&dep`)
  return request({
    method: 'GET',
    url: `/role/select?name=` + queryCondition + `&dep`
  })
}
