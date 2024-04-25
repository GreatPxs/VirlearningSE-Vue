import request from '@/utils/request.js'

export const getPaperTotalScore = (id) => {
  console.log(`/paper/getPaperTotalScore?paperId=` + id + `&name&totalNum&totalScore`)
  return request({
    method: 'GET',
    url: `/paper/getPaperTotalScore?paperId=` + id + `&name&totalNum&totalScore`
  })
}
