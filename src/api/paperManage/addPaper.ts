import request from '@/utils/request.js'

export const addPaper = (form) => {
  return request({
    method: 'PUT',
    url: `/paper/add?paperId&name=` + form.name + `&totalNum&totalScore`
  })
}
