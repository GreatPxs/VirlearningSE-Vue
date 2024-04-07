<script setup lang="ts">
import { addQuestion } from '@/api/questionManage/addQuestion.js'
import { editQuestion } from '@/api/questionManage/editQuestion.js'
import { deleteQuestion } from '@/api/questionManage/deleteQuestion.js'
import { getQuestionByName } from '@/api/questionManage/getQuestionByName.js'
import { getQuestionList } from '@/api/questionManage/getQuestionList'

onMounted(() => {
  getQuestionListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

//答案选项菜单
const options = [
  {
    value: 'A',
    label: 'A'
  },
  {
    value: 'B',
    label: 'B'
  },
  {
    value: 'C',
    label: 'C'
  },
  {
    value: 'D',
    label: 'D'
  }
]

//类型选项菜单
const typeOptions = [
  {
    value: '接诊',
    label: '接诊'
  },
  {
    value: '检查',
    label: '检查'
  },
  {
    value: '诊断',
    label: '诊断'
  },
  {
    value: '治疗',
    label: '治疗'
  }
]

//列表数据
const records = ref([])

const queryCondition = ref({
  description: '',
  type: ''
})
//搜索查询
const getQuestionInfoByName = async () => {
  const data = await getQuestionByName(queryCondition.value).then((res) => {
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
  records.value = data.data
  listCurrentPage.value = 1
  total.value = data.data.length

  queryCondition.value.description = ''
  queryCondition.value.type = ''

  console.log(records.value)
}

//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getQuestionListPage = async (queryCondition) => {
  const data = await getQuestionList(queryCondition).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取题目列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取题目列表失败')
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

//新建题目
const form = ref({
  id: 0,
  description: '',
  option_a: '',
  option_b: '',
  option_c: '',
  option_d: '',
  answer: '',
  type: ''
})
//0为添加, 1为修改
const addOrEdit = ref(0)
//dialog标题
const title = computed(() => {
  return addOrEdit.value === 0 ? '添加题目' : '修改题目'
})
//控制新增/编辑的dialog
const dialogFormVisible = ref(false)

//待编辑药物id
const editId = ref(0)
//点击编辑,获取编辑药物信息
const toModify = async (id, description, option_a, option_b, option_c, option_d, answer, type) => {
  addOrEdit.value = 1
  editId.value = id
  form.value.description = description
  form.value.option_a = option_a
  form.value.option_b = option_b
  form.value.option_c = option_c
  form.value.option_d = option_d
  form.value.answer = answer
  form.value.type = type
  dialogFormVisible.value = true
}

//点击新增,初始化
const toAdd = async () => {
  addOrEdit.value = 0
  form.value.description = ''
  form.value.option_a = ''
  form.value.option_b = ''
  form.value.option_c = ''
  form.value.option_d = ''
  form.value.answer = ''
  form.value.type = ''

  dialogFormVisible.value = true
}

//添加or编辑提交
const onSubmit = async () => {
  if (addOrEdit.value === 0) {
    const data = await addQuestion(form.value).then((res) => {
      //添加失败
      if (res.data.state !== 200) {
        ElMessage.error('添加题目失败')

        //打印数据
        console.log(res.data)

        throw new Error('添加题目失败')
      }
      //添加成功
      return res.data
    })

    ElMessage.success('添加药物成功')
    dialogFormVisible.value = false

    //添加后,重新获取列表(待写)
  } else {
    form.value.id = editId.value
    const data = await editQuestion(form.value).then((res) => {
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

  //修改后,重新获取列表
  getQuestionListPage({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}

//删除
const deleteQuestionById = async (id) => {
  const data = await deleteQuestion(id).then((res) => {
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

  //删除成功后,需要重新获取题目列表
  getQuestionListPage({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="题目">
            <el-input
              v-model="queryCondition.description"
              placeholder="请输入要查询的题目内容"
              clearable
            />
          </el-form-item>

          <el-form-item label="类别">
            <el-cascader
              :options="typeOptions"
              v-model="queryCondition.type"
              size="large"
              placeholder="请输入题目类别"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getQuestionInfoByName">查询</el-button>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="toAdd"> 新增题目 </el-button>
      </div>
    </template>
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="description" label="题目" align="center" />
      <el-table-column prop="type" label="分类" align="center" />
      <el-table-column prop="option_a" label="A" align="center" />
      <el-table-column prop="option_b" label="B" align="center" />
      <el-table-column prop="option_c" label="C" align="center" />
      <el-table-column prop="option_d" label="D" align="center" />
      <el-table-column prop="answer" label="答案" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <el-button
          type="primary"
          @click="
            toModify(
              row.id,
              row.description,
              row.option_a,
              row.option_b,
              row.option_c,
              row.option_d,
              row.answer,
              row.type
            )
          "
          >编辑</el-button
        >
        <el-button type="danger" @click="deleteQuestionById(row.id)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :title="title" center>
      <el-form :model="form" label-width="60px">
        <el-form-item label="题目">
          <el-input v-model="form.description" autocomplete="off" />
        </el-form-item>

        <el-form-item label="分类">
          <el-cascader :options="typeOptions" v-model="form.type" size="large" />
        </el-form-item>

        <el-form-item label="选项A">
          <el-input
            v-model="form.option_a"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
        </el-form-item>

        <el-form-item label="选项B">
          <el-input
            v-model="form.option_b"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
        </el-form-item>

        <el-form-item label="选项C">
          <el-input
            v-model="form.option_c"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
        </el-form-item>

        <el-form-item label="选项D">
          <el-input
            v-model="form.option_d"
            autocomplete="off"
            style="width: 540px; margin-right: 40px"
          />
        </el-form-item>

        <el-form-item label="答案">
          <el-cascader :options="options" v-model="form.answer" size="large" />
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
      @size-change="(pageSize) => getQuestionListPage({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getQuestionListPage({ pageSize: listPageSize, pageNumber: currentPage })
      "
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
