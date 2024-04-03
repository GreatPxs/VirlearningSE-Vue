import request from '@/utils/request.js'

export const addRole = (queryCondition) => {
  console.log(
    `/role/add?id&name=` +
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
      `/role/add?id&name=` +
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
