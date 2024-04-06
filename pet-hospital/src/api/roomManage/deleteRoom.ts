import request from '@/utils/request.js'

export const deleteRoom = (id) => {
  console.log(`/dept/delete?id=` + id + '&name&dep_inf&play_role&fileurl')
  return request({
    method: 'GET',
    url: `/dept/delete?id=` + id + '&name&dep_inf&play_role&fileurl'
  })
}
