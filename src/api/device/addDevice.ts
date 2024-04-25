import request from '@/utils/request.js'

export const addDevice = (form) => {
  return request({
    method: 'GET',

    url:
      `/device/add?id&isdeleted&name=` +
      form.name +
      `&feature=` +
      form.feature +
      `&photo=` +
      form.photo +
      `&video=` +
      form.video +
      `&dep`
  })
}
