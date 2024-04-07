import request from '@/utils/request.js'

export const modifyPaper = (id, name) => {
  return request({
    method: 'GET',
    url: `/paper/modify?paperId=` + id + `&name=` + name + `&totalNum&totalScore`
  })
}
