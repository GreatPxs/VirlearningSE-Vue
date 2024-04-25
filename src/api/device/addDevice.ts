import request from '@/utils/request.js'

export const addDevice = (form) => {
  console.log(
    `/device/add?id=0&isdeleted=0&name=` +
      form.name +
      `&feature=` +
      form.feature +
      `&photo=` +
      form.photo +
      `&video=` +
      form.video +
      `&dep`
  )
  return request({
    method: 'POST',

    url:
      `/device/add?id=0&isdeleted=0&name=` +
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
