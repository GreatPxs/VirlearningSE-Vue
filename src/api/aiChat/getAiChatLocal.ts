import request from '@/utils/request.js'

export const getAiChatLocal = (question) => {
  console.log(`/chatLocal?question=` + question)
  return request({
    method: 'POST',
    url: `/chatLocal?question=` + question
  })
}
