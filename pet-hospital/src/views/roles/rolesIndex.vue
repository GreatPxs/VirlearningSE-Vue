<script setup lang="ts">
import { addRole } from '@/api/roleManage/addRole.js'
import { editRole } from '@/api/roleManage/editRole.js'
import { getRoleByName } from '@/api/roleManage/getRoleByName.js'
import { getRoomByName } from '@/api/roomManage/getRoomByName.js'
import { deleteRole } from '@/api/roleManage/deleteRole.js'
import { getRoleList } from '@/api/roleManage/getRoleList.js'

onMounted(() => {
  getRoleListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

//职能类别数据
const options = [
  {
    value: '兽医',
    label: '兽医'
  },
  {
    value: '医助',
    label: '医助'
  },
  {
    value: '前台',
    label: '前台'
  }
]

//性别选项
const sexOption = [
  { value: '男', label: '男' },
  { value: '女', label: '女' }
]

//测试数据
const record = ref([])

//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getRoleListPage = async (queryCondition) => {
  const data = await getRoleList(queryCondition).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取员工列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取员工列表失败')
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

const searchCondition = reactive({
  name: ''
})

//搜索查询
const getRoleInfoByName = async () => {
  const data = await getRoleByName(searchCondition.name).then((res) => {
    //搜索失败
    if (res.data.state !== 200) {
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
  record.value = data.data
  listCurrentPage.value = 1
  total.value = data.data.length

  searchCondition.name = ''

  console.log(record.value)
}

//科室类别数据
const dept_options = ref([])
//获取所有科室
const getAllRooms = async () => {
  const data = await getRoomByName('').then((res) => {
    //获取科室失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取科室失败')
      //打印数据
      console.log(res.data)
      throw new Error('获取科室失败')
    }
    return res.data
  })

  //获取成功
  console.log(data)
  //放入科室类别options里
  dept_options.value = []
  for (let i = 0; i < data.data.length; i++) {
    dept_options.value[i] = {
      label: data.data[i].name,
      value: data.data[i].name
    }
  }
  console.log(dept_options.value)
}

//新增or编辑员工
const form = reactive({
  name: '',
  dep_name: '',
  role: '',
  sex: '',
  age: null
})

//0为添加, 1为修改
const addOrEdit = ref(0)
//dialog标题
const title = computed(() => {
  return addOrEdit.value === 0 ? '添加员工' : '修改员工'
})
//控制新增/编辑的dialog
const dialogFormVisible = ref(false)

//待编辑药物id
const editId = ref(0)
//点击编辑,获取编辑药物信息
const toModify = async (id, name, dep_name, role, sex, age) => {
  getAllRooms()
  addOrEdit.value = 1
  editId.value = id
  form.name = name
  form.dep_name = dep_name
  form.role = role
  form.sex = sex
  form.age = age
  dialogFormVisible.value = true
}

//点击新增,初始化
const toAdd = async () => {
  getAllRooms()
  addOrEdit.value = 0
  form.name = ''
  form.dep_name = ''
  form.role = ''
  form.sex = ''
  form.age = 1

  dialogFormVisible.value = true
}

//添加or编辑提交
const onSubmit = async () => {
  if (addOrEdit.value === 0) {
    const data = await addRole(form).then((res) => {
      //添加失败
      if (res.data.state !== 200) {
        ElMessage.error('添加员工失败')

        //打印数据
        console.log(res.data)

        throw new Error('添加员工失败')
      }
      //添加成功
      return res.data
    })

    ElMessage.success('添加员工成功')
    dialogFormVisible.value = false

    //添加后,重新获取列表(待写)
  } else {
    const data = await editRole(editId.value, form).then((res) => {
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

    //修改后,重新获取列表(待写)
  }

  getRoleListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
}

//删除
const deleteRoleById = async (id) => {
  const data = await deleteRole(id).then((res) => {
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

  //删除成功后,需要重新获取员工列表
  getRoleListPage({
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
          <el-form :inline="true" :form="searchCondition" class="demo-form-inline">
            <el-form-item label="姓名">
              <el-input v-model="searchCondition.name" clearable placeholder="姓名" />
            </el-form-item>

            <el-form-item>
              <!-- 绑定点击查询函数 @click="() => queryCourses({ currentPage: 1 }) -->
              <el-button type="primary" @click="getRoleInfoByName">查询</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="toAdd"> 新增员工 </el-button>
        </div>
      </template>
      <!-- tabel需要绑定数据 :data="queriedResult.records",以下records为测试数据 -->
      <el-table :data="record" border style="width: 100%">
        <!-- prop绑定属性，如第一行 -->
        <el-table-column prop="id" label="员工编号" align="center" />
        <el-table-column prop="name" label="姓名" width="180" align="center" />
        <el-table-column prop="dep_name" label="科室" width="180" align="center" />
        <el-table-column prop="role" label="职能" width="180" align="center" />
        <el-table-column prop="sex" label="性别" width="180" align="center" />
        <el-table-column prop="age" label="年龄" width="180" align="center" />

        <el-table-column label="操作" align="center" v-slot="{ row }">
          <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
          <el-button
            type="primary"
            @click="toModify(row.id, row.name, row.dep_name, row.role, row.sex, row.age)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteRoleById(row.id)">删除</el-button>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogFormVisible" :title="title" center>
        <el-form :model="form" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>

          <el-form-item label="科室">
            <el-cascader :options="dept_options" v-model="form.dep_name" size="large" />
          </el-form-item>

          <el-form-item label="职能">
            <el-cascader :options="options" v-model="form.role" size="large" />
          </el-form-item>

          <el-form-item label="性别">
            <el-cascader :options="sexOption" v-model="form.sex" size="large" />
          </el-form-item>

          <el-form-item label="年龄">
            <el-input-number v-model="form.age" :min="1" :max="100" />
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
        :page-sizes="[1, 5, 10, 20, 50]"
        :background="true"
        v-model:current-page="listCurrentPage"
        v-model:page-size="listPageSize"
        :total="total || 0"
        @size-change="(pageSize) => getRoleListPage({ pageSize: pageSize, pageNumber: 1 })"
        @current-change="
          (currentPage: number) =>
            getRoleListPage({ pageSize: listPageSize, pageNumber: currentPage })
        "
        layout="total, sizes, prev, pager, next, jumper"
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
</style>
