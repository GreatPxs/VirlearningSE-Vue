import request from '@/utils/request.js'

export const addQuestion = (form) => {
  console.log(
    `/question/add?id&type=` +
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
    method: 'PUT',

    url:
      `/question/add?id&type=` +
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
