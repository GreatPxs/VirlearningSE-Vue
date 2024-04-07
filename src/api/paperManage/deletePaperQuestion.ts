import request from '@/utils/request.js'

export const deletePaperQuestion = (paperId, id) => {
  console.log(
    `/paper/deletePaperQuestion?paperId=` +
      paperId +
      `&name&totalNum&totalScore&id=` +
      id +
      `&type&description&option_a&option_b&option_c&option_d&answer`
  )
  return request({
    method: 'GET',
    url:
      `/paper/deletePaperQuestion?paperId=` +
      paperId +
      `&name&totalNum&totalScore&id=` +
      id +
      `&type&description&option_a&option_b&option_c&option_d&answer`
  })
}
