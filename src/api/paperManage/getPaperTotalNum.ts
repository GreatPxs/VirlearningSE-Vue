import request from '@/utils/request.js'

export const getPaperTotalNum = (id) => {
  console.log(`/paper/getPaperTotalNum?paperId=` + id + `&name&totalNum&totalScore`)
  return request({
    method: 'GET',
    url: `/paper/getPaperTotalNum?paperId=` + id + `&name&totalNum&totalScore`
  })
}
