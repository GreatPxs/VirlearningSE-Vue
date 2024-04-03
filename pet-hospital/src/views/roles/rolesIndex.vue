<script setup lang="ts">
import { addRole } from '@/api/roleManage/addRole.js'
import { editRole } from '@/api/roleManage/editRole.js'

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
const record = reactive([
  {
    id: 1,
    name: '主任',
    dep_name: '',
    role: '',
    sex: '',
    age: 18
  }
])

//新增员工的测试数据
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
      if (res.data.resultCode !== 200) {
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
      if (res.data.resultCode !== 200) {
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
}
</script>

<template>
  <div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <!-- 下面的el-form :model还需要绑定queryCondition，是查询条件 -->
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="姓名">
              <!-- 下述 需要v-model="queryCondition.courseName" 绑定条件-->
              <el-input clearable placeholder="姓名" />
            </el-form-item>

            <el-form-item>
              <!-- 绑定点击查询函数 @click="() => queryCourses({ currentPage: 1 }) -->
              <el-button type="primary">查询 </el-button>
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

        <el-table-column label="操作" align="center" v-slot="{}">
          <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogFormVisible" title="新增员工" center>
        <el-form :model="form" label-width="100px">
          <el-form-item label="姓名">
            <el-input v-model="form.name" autocomplete="off" />
          </el-form-item>

          <el-form-item label="科室">
            <el-input v-model="form.dep_name" autocomplete="off" />
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
            <el-button type="primary" @click="dialogFormVisible = false"> 新增 </el-button>
          </div>
        </template>
      </el-dialog>

      <!-- 
        分页还需要以下属性
        v-model:current-page="queriedResult.current"
        v-model:page-size="queriedResult.size"
        :total="queriedResult.total || 0"
        @size-change="(pageSize: number) => queryCourses({ pageSize, currentPage: 1 })"
        @current-change="(currentPage: number) => queryCourses({ currentPage })"
       -->
      <el-pagination
        :page-sizes="[1, 5, 10, 20, 50]"
        :background="true"
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
