import request from '@/utils/request.js'

export const editCase = (form) => {
  console.log(
    `/Case/updateIdCase?case_id=` +
      form.case_id +
      `&name=` +
      form.name +
      `&symptom&animal=` +
      form.animal +
      `&cure_method&uploadUser&jzword=` +
      form.jzword +
      `&jzphoto=` +
      form.jzphoto +
      `&jzvideo=` +
      form.jzvideo +
      `&jcword=` +
      form.jcword +
      `&jcphoto=` +
      form.jcphoto +
      `&jcvideo=` +
      form.jcvideo +
      `&zdword=` +
      form.zdword +
      `&zdphoto=` +
      form.zdphoto +
      `&zdvideo=` +
      form.zdvideo +
      `&zlword=` +
      form.zlword +
      `&zlphoto=` +
      form.zlphoto +
      `&zlvideo=` +
      form.zlvideo +
      `&isDelete=`
  )
  return request({
    method: 'GET',
    url:
      `/Case/updateIdCase?case_id=` +
      form.case_id +
      `&name=` +
      form.name +
      `&symptom&animal=` +
      form.animal +
      `&cure_method&uploadUser&jzword=` +
      form.jzword +
      `&jzphoto=` +
      form.jzphoto +
      `&jzvideo=` +
      form.jzvideo +
      `&jcword=` +
      form.jcword +
      `&jcphoto=` +
      form.jcphoto +
      `&jcvideo=` +
      form.jcvideo +
      `&zdword=` +
      form.zdword +
      `&zdphoto=` +
      form.zdphoto +
      `&zdvideo=` +
      form.zdvideo +
      `&zlword=` +
      form.zlword +
      `&zlphoto=` +
      form.zlphoto +
      `&zlvideo=` +
      form.zlvideo +
      `&isDelete=`
  })
}