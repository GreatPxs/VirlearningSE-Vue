import request from '@/utils/request.js'

export const deleteQuestion = (id) => {
  console.log(
    `/question/delete?id=` + id + `&type&description&option_a&option_b&option_c&option_d&answer`
  )
  return request({
    method: 'GET',
    url:
      `/question/delete?id=` + id + `&type&description&option_a&option_b&option_c&option_d&answer`
  })
}
