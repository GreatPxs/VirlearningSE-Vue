import request from '@/utils/request.js'

export const editDevice = (id, name, feature, photo, video) => {
  console.log(
    `/device/update?id=` +
      id +
      `&isdeleted&name=` +
      name +
      `&feature=` +
      feature +
      `&photo=` +
      photo +
      `&video=` +
      video +
      `&dep`
  )
  return request({
    method: 'GET',
    url:
      `/device/update?id=` +
      id +
      `&isdeleted=0&name=` +
      name +
      `&feature=` +
      feature +
      `&photo=` +
      photo +
      `&video=` +
      video +
      `&dep`
  })
}
