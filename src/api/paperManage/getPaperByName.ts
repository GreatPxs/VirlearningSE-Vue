import request from '@/utils/request.js'

export const getPaperByName = (name) => {
  console.log(`/paper/select?name=` + name)
  return request({
    method: 'GET',
    url: `/paper/select?name=` + name
  })
}
