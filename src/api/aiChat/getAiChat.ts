import request from '@/utils/request.js'

export const getAiChat = (question) => {
  console.log(`/chat?question=` + question)
  return request({
    method: 'POST',
    url: `/chat?question=` + question
  })
}
