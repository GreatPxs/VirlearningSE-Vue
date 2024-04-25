import request from '@/utils/request.js'

export const getDeviceList = (pageCondition) => {
  console.log(
    '/device/showall?pageNumber=' + pageCondition.pageNumber + '&pageSize=' + pageCondition.pageSize
  )
  return request({
    method: 'GET',
    url:
      '/device/showall?pageNumber=' +
      pageCondition.pageNumber +
      '&pageSize=' +
      pageCondition.pageSize
  })
}
