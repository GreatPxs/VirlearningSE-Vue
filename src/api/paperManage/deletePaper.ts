import request from '@/utils/request.js'

export const deletePaper = (id) => {
  console.log(`/paper/delete?paperId=` + id + `&name&totalNum&totalScore`)
  return request({
    method: 'GET',
    url: `/paper/delete?paperId=` + id + `&name&totalNum&totalScore`
  })
}
