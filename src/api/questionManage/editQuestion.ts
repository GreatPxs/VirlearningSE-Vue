import request from '@/utils/request.js'

export const editQuestion = (form) => {
  console.log(
    `/question/modify?id=` +
      form.id +
      `&type=` +
      form.type +
      `&description=` +
      form.description +
      `&option_a=` +
      form.option_a +
      `&option_b=` +
      form.option_b +
      `&option_c=` +
      form.option_c +
      `&option_d=` +
      form.option_d +
      `&answer=` +
      form.answer
  )
  return request({
    method: 'GET',

    url:
      `/question/modify?id=` +
      form.id +
      `&type=` +
      form.type +
      `&description=` +
      form.description +
      `&option_a=` +
      form.option_a +
      `&option_b=` +
      form.option_b +
      `&option_c=` +
      form.option_c +
      `&option_d=` +
      form.option_d +
      `&answer=` +
      form.answer
  })
}
