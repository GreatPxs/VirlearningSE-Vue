import request from '@/utils/request.js'

export const addRoom = (roomName, usage, roles, fileurl) => {
  console.log(
    `/dept/insert?id&name=` +
      roomName +
      `&dep_inf=` +
      usage +
      `&play_role=` +
      roles +
      `&fileurl=` +
      fileurl
  )
  return request({
    method: 'GET',
    url:
      `/dept/insert?id&name=` +
      roomName +
      `&dep_inf=` +
      usage +
      `&play_role=` +
      roles +
      `&fileurl=` +
      fileurl
  })
}
