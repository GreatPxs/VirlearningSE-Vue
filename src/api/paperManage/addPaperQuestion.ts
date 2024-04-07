import request from '@/utils/request.js'

export const addPaperQuestion = (paperId, id, pqscore) => {
  console.log(
    `/paper/insertPaperQuestion?paperId=` +
      paperId +
      `&name&totalNum&totalScore&id=` +
      id +
      `&type&description&option_a&option_b&option_c&option_d&answer&pqScore=` +
      pqscore
  )
  return request({
    method: 'GET',
    url:
      `/paper/insertPaperQuestion?paperId=` +
      paperId +
      `&name&totalNum&totalScore&id=` +
      id +
      `&type&description&option_a&option_b&option_c&option_d&answer&pqScore=` +
      pqscore
  })
}
