import request from '@/utils/request.js'

export const getUserExamTodo = (userId, pageCondition) => {
  console.log(
    `/exam/userExamTodoList?pageNumber=` +
      pageCondition.pageNumber +
      `&pageSize=` +
      pageCondition.pageSize +
      `&userId=` +
      userId
  )
  return request({
    method: 'GET',
    url:
      `/exam/userExamTodoList?pageNumber=` +
      pageCondition.pageNumber +
      `&pageSize=` +
      pageCondition.pageSize +
      `&userId=` +
      userId
  })
}
