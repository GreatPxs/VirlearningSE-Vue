<script setup lang="ts">
import { addRoom } from '@/api/roomManage/addRoom.js'
import { getRoomByName } from '@/api/roomManage/getRoomByName.js'
import { deleteRoom } from '@/api/roomManage/deleteRoom.js'
import { editRoom } from '@/api/roomManage/editRoom.js'
import { getRoomList } from '@/api/roomManage/getRoomList.js'
import type { UploadProps } from 'element-plus'

onMounted(() => {
  getRoomListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

//角色表
const options = [
  {
    value: '医助',
    label: '医助'
  },
  {
    value: '兽医',
    label: '兽医'
  },
  {
    value: '前台',
    label: '前台'
  }
]

//测试科室数据
const records = ref([])

//新建科室
const form = reactive({
  name: '',
  dep_inf: '',
  roles: [],
  fileurl: ''
})
//0为添加, 1为修改
const addOrEdit = ref(0)
//dialog标题
const title = computed(() => {
  return addOrEdit.value === 0 ? '添加科室' : '修改科室'
})
//控制新增/编辑的dialog
const dialogFormVisible = ref(false)

//待编辑药物id
const editId = ref(0)
//点击编辑,获取编辑药物信息
const toModify = async (id, name, dep_inf, roles, url) => {
  addOrEdit.value = 1
  editId.value = id
  form.name = name
  form.dep_inf = dep_inf
  form.roles = roles
  form.fileurl = url
  dialogFormVisible.value = true
}

//点击新增,初始化
const toAdd = async () => {
  addOrEdit.value = 0
  form.name = ''
  form.dep_inf = ''
  form.roles = []
  form.fileurl = ''

  dialogFormVisible.value = true
}

//添加or编辑提交
const onSubmit = async () => {
  if (addOrEdit.value === 0) {
    const data = await addRoom(form.name, form.dep_inf, form.roles.join('，'), form.fileurl).then(
      (res) => {
        //添加失败
        if (res.data.resultCode !== 200) {
          ElMessage.error('添加科室失败')

          //打印数据
          console.log(res.data)

          throw new Error('添加科室失败')
        }
        //添加成功
        return res.data
      }
    )

    ElMessage.success('添加科室成功')
    dialogFormVisible.value = false
  } else {
    const data = await editRoom(
      editId.value,
      form.name,
      form.dep_inf,
      form.roles.join('，'),
      form.fileurl
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

  getRoomListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
}

//是否为条件查询
const conditionSearch = ref(0)
//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getRoomListPage = async (queryCondition) => {
  const data = await getRoomList(queryCondition).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取科室列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取科室列表失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  records.value = data.data.list
  total.value = data.data.totalCount
  listCurrentPage.value = data.data.currPage
  listPageSize.value = data.data.pageSize
}
//搜索条件
const queryCondition = reactive({
  roomName: ''
})
//搜索查询
const getRoomInfoByName = async () => {
  const data = await getRoomByName(queryCondition.roomName).then((res) => {
    //搜索失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('搜索失败')
      //打印数据
      console.log(res.data)
      throw new Error('搜索失败')
    }
    return res.data
  })

  //搜索成功
  conditionSearch.value = 1
  console.log(data)
  ElMessage.success('搜索成功')
  for (let i = 0; i < data.data.length; i++) {
    records.value[i] = {
      id: data.data[i].id,
      name: data.data[i].name,
      dep_inf: data.data[i].dep_inf,
      roles: data.data[i].role !== null ? data.data[i].role.split('，') : [],
      fileurl: data.data[i].fileurl
    }
  }
  records.value = records.value.splice(0, data.data.length)
  listCurrentPage.value = 1
  total.value = data.data.length

  queryCondition.roomName = ''

  console.log(records.value)
}

//刷新页面
const handleRefresh = () => {
  getRoomListPage({
    pageNumber: 1,
    pageSize: listPageSize.value
  })
  conditionSearch.value = 0
  listCurrentPage.value = 1
}

//删除
const deleteRoomById = async (id) => {
  const data = await deleteRoom(id).then((res) => {
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

  //删除成功后,需要重新获取科室列表
  getRoomListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
}

const handlePhotoSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  form.fileurl = response.data
  console.log(form.fileurl)
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
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-icon :size="40" class="refresh" @click="handleRefresh"><IEpRefresh /></el-icon>
        <el-form :inline="true" :form="queryCondition" class="demo-form-inline">
          <el-form-item label="科室" class="searchInput">
            <el-input v-model="queryCondition.roomName" placeholder="请输入科室名" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getRoomInfoByName">查询</el-button>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="toAdd" class="addButton"> 新增科室 </el-button>
      </div>
    </template>
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="id" label="科室编号" align="center" />
      <el-table-column prop="name" label="科室名称" align="center" />
      <el-table-column prop="dep_inf" label="功能" align="center" />
      <el-table-column prop="play_role" label="主要负责人" align="center" />
      <el-table-column prop="fileurl" label="照片" width="180" align="center" v-slot="{ row }">
        <el-image style="width: 100px; height: 100px" :src="row.fileurl" fit="fill" />
      </el-table-column>
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <el-button
          type="primary"
          @click="toModify(row.id, row.name, row.dep_inf, row.roles, row.fileurl)"
          >编辑</el-button
        >
        <el-button type="danger" @click="deleteRoomById(row.id)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :title="title" center>
      <el-form :model="form" label-width="100px">
        <el-form-item label="科室名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <!-- 绑定 @change="handleChange" -->
        <el-form-item label="功能">
          <el-input v-model="form.dep_inf" autocomplete="off" />
        </el-form-item>

        <el-form-item label="负责人">
          <el-select v-model="form.roles" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="照片">
          <el-upload
            class="avatar-uploader"
            action="http://114.55.135.87:28018/upload"
            :show-file-list="false"
            :on-success="handlePhotoSuccess"
            :before-upload="beforePhotoUpload"
          >
            <img v-if="form.fileurl" :src="form.fileurl" class="photo" />
            <el-icon v-else class="avatar-uploader-icon"><IEpPlus /></el-icon>
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
      v-show="conditionSearch === 0"
      :page-sizes="[10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listCurrentPage"
      v-model:page-size="listPageSize"
      @size-change="(pageSize) => getRoomListPage({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getRoomListPage({ pageSize: listPageSize, pageNumber: currentPage })
      "
      :total="total || 0"
    />
  </el-card>
</template>

<style lang="scss" scoped>
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 14px;
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
</style>
