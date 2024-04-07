import request from '@/utils/request.js'

export const deletePaperQuestion = (paperId, id) => {
  console.log(
    `/paper/insertPaperQuestion?paperId=` +
      paperId +
      `&name&totalNum&totalScore&id=` +
      id +
      `&type&description&option_a&option_b&option_c&option_d&answer&pqScore`
  )
  return request({
    method: 'PUT',
    url:
      `/paper/deletePaperQuestion?paperId=` +
      paperId +
      `&name&totalNum&totalScore&id=` +
      id +
      `&type&description&option_a&option_b&option_c&option_d&answer`
  })
}
