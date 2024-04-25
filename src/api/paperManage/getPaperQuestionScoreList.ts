import request from '@/utils/request.js'

export const getPaperQuestionScoreList = (id) => {
  console.log(`/paper/getPaperQuestionScoreList?paperId=` + id + `&name&totalNum&totalScore`)
  return request({
    method: 'GET',
    url: `/paper/getPaperQuestionScoreList?paperId=` + id + `&name&totalNum&totalScore`
  })
}
