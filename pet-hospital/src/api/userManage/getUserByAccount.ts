import request from '@/utils/request.js'

export const getUserByAccount = (queryCondition) => {
  console.log(`/api/v1/user/findname?loginname=` + queryCondition)
  return request({
    method: 'POST',
    url: `/api/v1/user/findname?loginname=` + queryCondition
  })
}
