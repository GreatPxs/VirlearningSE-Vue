import request from '@/utils/request.js'

export const getRoomByName = (queryCondition) => {
  console.log(`/dept/select?name=` + queryCondition)
  return request({
    method: 'POST',
    url: `/dept/select?name=` + queryCondition
  })
}
