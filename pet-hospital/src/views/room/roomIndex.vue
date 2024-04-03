<script setup lang="ts">
import { addRoom } from '@/api/roomManage/addRoom.js'
import { getRoomByName } from '@/api/roomManage/getRoomByName.js'
import { deleteRoom } from '@/api/roomManage/deleteRoom.js'
import { editRoom } from '@/api/roomManage/editRoom.js'

//0为添加, 1为修改
const addOrEdit = ref(0)
//dialog标题
const title = computed(() => {
  return addOrEdit.value === 0 ? '添加科室' : '修改科室'
})

//搜索条件
const queryCondition = reactive({
  roomName: ''
})

// 控制dialog科室表单是否可见
const dialogFormVisible = ref(false)

//角色表
const options = [
  {
    value: '助理',
    label: '助理'
  },
  {
    value: '执业兽医师',
    label: '执业兽医师'
  },
  {
    value: '前台',
    label: '前台'
  }
]

//新建科室
const form = reactive({
  name: '',
  dep_inf: '',
  roles: []
})

//测试科室数据
const records = ref([])

//添加or编辑提交
const onSubmit = async () => {
  console.log(form.roles.join('，'))
  if (addOrEdit.value === 0) {
    const data = await addRoom(form.name, form.dep_inf, form.roles.join('，')).then((res) => {
      //添加失败
      if (res.data.state !== 200) {
        ElMessage.error('添加失败')
        throw new Error('添加失败')
      }
      //添加成功
      return res.data
    })

    console.log(data)

    //添加成功
    ElMessage.success('添加成功')

    dialogFormVisible.value = false

    //添加后,重新获取列表(待写)
  } else {
    const data = await editRoom(editId.value, form.name, form.dep_inf, form.roles.join('，')).then(
      (res) => {
        //编辑失败
        if (res.data.state !== 200) {
          ElMessage.error('编辑失败')
          throw new Error('编辑失败')
        }
        //编辑成功
        return res.data
      }
    )

    console.log(data)

    //编辑成功
    ElMessage.success('编辑成功')

    dialogFormVisible.value = false

    //修改后,重新获取列表(待写)
  }
}

//挂载后开始取出列表
// onMounted(() => {
//   getUsersListPage({
//     pageNumber: listCurrentPage.value,
//     pageSize: listPageSize.value
//   })
// })

//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
// const getUsersListPage = async (queryCondition) => {
//   const data = await getUsersList(queryCondition).then((res) => {
//     //获取失败
//     if (res.data.resultCode !== 200) {
//       ElMessage.error('获取用户列表失败')

//       //打印数据
//       console.log(res.data)

//       throw new Error('获取用户列表失败')
//     }
//     //获取成功

//     console.log(res.data)
//     listCurrentPage.value = queryCondition.currentPage
//     listPageSize.value = queryCondition.pageSize
//     return res.data
//   })

//   records.value = data.data.list
//   total.value = data.data.totalCount
//   listCurrentPage.value = data.data.currPage
//   listPageSize.value = data.data.pageSize
// }

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
  console.log(data)
  ElMessage.success('搜索成功')
  // records.value = data.data
  for (let i = 0; i < data.data.length; i++) {
    records.value[i] = {
      id: data.data[i].id,
      name: data.data[i].name,
      dep_inf: data.data[i].dep_inf,
      roles: data.data[i].role !== null ? data.data[i].role.split('，') : []
    }
  }
  listCurrentPage.value = 1
  total.value = data.data.length

  queryCondition.roomName = ''

  console.log(records.value)
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

  //删除成功后,需要重新获取科室列表(待写)
}

//待编辑科室id
const editId = ref(0)
//点击编辑,获取编辑科室信息
const toModify = async (id, name, dep_inf, roles) => {
  addOrEdit.value = 1
  editId.value = id
  form.name = name
  form.dep_inf = dep_inf
  form.roles = roles

  dialogFormVisible.value = true
}

//点击新增,初始化
const toAdd = async () => {
  addOrEdit.value = 0
  form.name = ''
  form.dep_inf = ''
  form.roles = []

  dialogFormVisible.value = true
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="科室">
            <el-input
              v-model="queryCondition.roomName"
              placeholder="请输入科室名关键字"
              clearable
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getRoomInfoByName">查询</el-button>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="toAdd"> 新增科室 </el-button>
      </div>
    </template>
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="id" label="科室编号" align="center" />
      <el-table-column prop="name" label="科室名称" align="center" />
      <el-table-column prop="dep_inf" label="功能" align="center" />
      <el-table-column prop="roles" label="主要负责人" align="center">
        <template #default="{ row }">
          <p v-for="(k, index) in row.roles" :key="index">{{ k }}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button type="primary" @click="toModify(row.id, row.name, row.dep_inf, row.roles)"
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
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 
      分页需要属性
      @size-change="(pageSize) => queryUsers({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryUsers({ currentPage })"
     -->
    <el-pagination
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listCurrentPage"
      v-model:page-size="listPageSize"
      :total="total || 0"
    />
  </el-card>
</template>

<style lang="scss" scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}
</style>
