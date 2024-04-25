<script setup lang="ts">
import { addDevice } from '@/api/device/addDevice'
import { deleteDevice } from '@/api/device/deleteDevice'
import { editDevice } from '@/api/device/editDevice'
import { getDeviceList } from '@/api/device/getDeviceList'
import type { UploadProps } from 'element-plus'

//文件上传URL
const uploadAction = 'http://114.55.135.87:28018/upload'
//照片处理
const handlePhotoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.photo = response.data
  console.log(form.photo)
}
const beforePhotoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type !== 'image/jpeg' &&
    rawFile.type !== 'image/jpg' &&
    rawFile.type !== 'image/png' &&
    rawFile.type !== 'image/webp'
  ) {
    ElMessage.error('Photo must be JPG、JPEG、PNG、WEBP format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Photo size can not exceed 2MB!')
    return false
  }
  return true
}
//视频处理
const beforeVideoUpload: UploadProps['beforeUpload'] = (rawFile) => {
  const isVideo = rawFile.type === 'video/mp4' || rawFile.type === 'video/avi'
  const isLt100M = rawFile.size / 1024 / 1024 < 100
  if (!isVideo) {
    ElMessage.error('请上传视频文件!')
  }
  if (!isLt100M) {
    ElMessage.error('上传视频大小不能超过100MB!')
  }
  return isVideo && isLt100M
}
const handleVideoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.video = response.data
  console.log(form.video)
}

onMounted(() => {
  getDeviceListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

const record = ref([])

//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getDeviceListPage = async (queryCondition) => {
  const data = await getDeviceList(queryCondition).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取设备列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取设备列表失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  record.value = data.data.list
  total.value = data.data.totalCount
  listCurrentPage.value = data.data.currPage
  listPageSize.value = data.data.pageSize
}

//处理页数大小改变
const handlePageSizeChange = (pageSize) => {
  getDeviceListPage({ pageSize: pageSize, pageNumber: 1 })
}
//处理页码改变
const handlePageNumberChange = (currentPage) => {
  getDeviceListPage({ pageSize: listPageSize.value, pageNumber: currentPage })
}

//刷新页面
const handleRefresh = () => {
  getDeviceListPage({
    pageNumber: 1,
    pageSize: listPageSize.value
  })
  listCurrentPage.value = 1
}

//新增药物的测试数据
const form = reactive({
  name: '',
  feature: '',
  photo: '',
  video: ''
})
//0为添加, 1为修改
const addOrEdit = ref(0)
//dialog标题
const title = computed(() => {
  return addOrEdit.value === 0 ? '添加设备' : '修改设备'
})
//控制新增/编辑的dialog
const dialogFormVisible = ref(false)

//待编辑药物id
const editId = ref(0)
//点击编辑,获取编辑药物信息
const toModify = async (id, name, feature, photo, video) => {
  addOrEdit.value = 1
  editId.value = id
  form.name = name
  form.feature = feature
  form.photo = photo
  form.video = video
  dialogFormVisible.value = true
}

//点击新增,初始化
const toAdd = async () => {
  addOrEdit.value = 0
  form.name = ''
  form.feature = ''
  form.photo = ''
  form.video = ''

  dialogFormVisible.value = true
}

//添加or编辑提交
const onSubmit = async () => {
  if (addOrEdit.value === 0) {
    const data = await addDevice(form).then((res) => {
      //添加失败
      if (res.data.state !== 200) {
        ElMessage.error('添加设备失败')

        //打印数据
        console.log(res.data)

        throw new Error('添加设备失败')
      }
      //添加成功
      return res.data
    })

    ElMessage.success('添加设备成功')
    dialogFormVisible.value = false
  } else {
    const data = await editDevice(
      editId.value,
      form.name,
      form.feature,
      form.photo,
      form.video
    ).then((res) => {
      //编辑失败
      if (res.data.state !== 200) {
        ElMessage.error('编辑失败')
        throw new Error('编辑失败')
      }
      //编辑成功
      return res.data
    })

    console.log(data)

    //编辑成功
    ElMessage.success('编辑成功')

    dialogFormVisible.value = false
  }

  getDeviceListPage({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}

//删除
const deleteDeviceById = async (id) => {
  const data = await deleteDevice(id).then((res) => {
    //删除失败
    if (res.data.state !== 200) {
      ElMessage.error('删除失败')
      //打印数据
      console.log(res.data)
      throw new Error('删除失败')
    }
    return res.data
  })

  //删除成功
  console.log(data)
  ElMessage.success('删除成功')

  //删除成功后,需要重新获取药物列表
  getDeviceListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
}
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <el-icon :size="40" class="refresh" @click="handleRefresh"><IEpRefresh /></el-icon>

          <el-button type="primary" @click="toAdd" class="addButton"> 新增设备 </el-button>
        </div>
      </template>

      <el-table :data="record" border style="width: 100%">
        <!-- prop绑定属性，如第一行 -->
        <el-table-column prop="id" label="设备编号" width="180" align="center" />
        <el-table-column prop="name" label="设备名称" width="180" align="center" />
        <el-table-column prop="feature" label="功能说明" align="center" />
        <el-table-column prop="photo" label="操作流程" align="center">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.photo"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="video" label="演示动画" align="center">
          <template #default="scope">
            <video :src="scope.row.video" controls playsinline></video>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" v-slot="{ row }">
          <el-button
            type="primary"
            @click="toModify(row.id, row.drugName, row.specifications, row.unit, row.drugNote)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteDeviceById(row.id)">删除</el-button>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogFormVisible" :title="title" center>
        <el-form :model="form" label-width="100px">
          <el-form-item label="设备名称">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>

          <el-form-item label="功能说明">
            <el-input v-model="form.feature" autocomplete="off" />
          </el-form-item>

          <el-form-item label="操作流程">
            <el-upload
              class="avatar-uploader"
              :action="uploadAction"
              :show-file-list="false"
              :on-success="handlePhotoSuccess"
              :before-upload="beforePhotoUpload"
            >
              <img v-if="form.photo" :src="form.photo" class="photo" />
              <el-icon v-else class="avatar-uploader-icon"><IEpPlus /></el-icon>
            </el-upload>
          </el-form-item>

          <el-form-item label="演示动画">
            <el-upload
              :action="uploadAction"
              :on-success="handleVideoSuccess"
              :before-upload="beforeVideoUpload"
            >
              <el-button type="primary">点击上传视频</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="onSubmit"> 提交 </el-button>
          </div>
        </template>
      </el-dialog>

      <el-pagination
        :page-sizes="[10, 20, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="listCurrentPage"
        v-model:page-size="listPageSize"
        :total="total || 0"
        @size-change="(pageSize) => handlePageSizeChange(pageSize)"
        @current-change="(currentPage: number) => handlePageNumberChange(currentPage)"
      />
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

video {
  width: 100px;
  height: 100px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}

.el-form-item {
  margin-bottom: 20px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.demo-form-inline {
  .el-form-item {
    margin: 0px;
  }

  .searchInput {
    margin-right: 5px;
  }
}

.refresh {
  margin-right: 40px;
}
.refresh:hover {
  color: #409eff;
}

.addButton {
  margin-left: 700px;
}

.avatar-uploader .photo {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
