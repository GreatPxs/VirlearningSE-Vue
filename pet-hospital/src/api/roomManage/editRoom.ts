import request from '@/utils/request.js'

export const editRoom = (id, name, dep_inf, roles, fileurl) => {
  console.log(
    `/dept/update?id=` +
      id +
      '&name=' +
      name +
      '&dep_inf=' +
      dep_inf +
      `&play_role=` +
      roles +
      `&fileurl=` +
      fileurl
  )
  return request({
    method: 'GET',
    url:
      `/dept/update?id=` +
      id +
      '&name=' +
      name +
      '&dep_inf=' +
      dep_inf +
      `&play_role=` +
      roles +
      `&fileurl=` +
      fileurl
  })
}
