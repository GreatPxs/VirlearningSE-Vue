import request from '@/utils/request.js'

export const editRole = (id, queryCondition) => {
  console.log(
    `/role/update?id=` +
      id +
      `&name=` +
      queryCondition.name +
      `&dep_name=` +
      queryCondition.dep_name +
      `&role=` +
      queryCondition.role +
      `&sex=` +
      queryCondition.sex +
      `&age=` +
      queryCondition.age
  )
  return request({
    method: 'GET',
    url:
      `/role/update?id=` +
      id +
      `&name=` +
      queryCondition.name +
      `&dep_name=` +
      queryCondition.dep_name +
      `&role=` +
      queryCondition.role +
      `&sex=` +
      queryCondition.sex +
      `&age=` +
      queryCondition.age
  })
}
