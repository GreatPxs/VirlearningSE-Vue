import request from '@/utils/request.js'

export const getPaperInfo = (id) => {
  console.log(`/paper/getPaperInf?paperId=` + id + `&name&totalNum&totalScore`)
  return request({
    method: 'GET',
    url: `/paper/getPaperInf?paperId=` + id + `&name&totalNum&totalScore`
  })
}
