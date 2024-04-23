<script setup lang="ts">
import { ElTable } from 'element-plus'
import { User, DocumentAdd } from '@element-plus/icons-vue'
import { getPaperList } from '@/api/paperManage/getPaperList'
import { getTestByName } from '@/api/testManage/getTestByName.js'
import { addTest } from '@/api/testManage/addTest'
import { editTest } from '@/api/testManage/editTest'
import { deleteTest } from '@/api/testManage/deleteTest.js'
import { getTestList } from '@/api/testManage/getTestList'

onMounted(() => {
  getTestListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })

  // 等待一小段时间，然后重新渲染el-table
})

const date = ref(null)

const dialogPaperVisible = ref(false)

//新建or编辑考试
const form = ref({
  paperId: 0,
  name: '',
  startTime: '',
  endTime: '',
  limitTime: 10
})
//0为添加, 1为修改
const addOrEdit = ref(0)
//dialog标题
const title = computed(() => {
  return addOrEdit.value === 0 ? '添加考试' : '修改考试'
})
//控制dialog选择考试 表单是否可见
const dialogFormVisible = ref(false)
// 处理开始日期时间选择器的变化
const handleStartDateTimeChange = (value) => {
  // 将日期对象转换为字符串格式
  form.value.startTime = value ? value.format('yyyy-MM-dd HH:mm:ss') : ''
}
// 处理开始日期时间选择器的变化
const handleEndDateTimeChange = (value) => {
  // 将日期对象转换为字符串格式
  form.value.endTime = value ? value.format('yyyy-MM-dd HH:mm:ss') : ''
}
//待编辑考试id
const editId = ref(0)
//点击编辑,获取编辑考试信息
const toModify = async (examId, name, startTime, endTime, limitTime) => {
  addOrEdit.value = 1
  editId.value = examId
  form.value.name = name
  form.value.startTime = startTime
  form.value.endTime = endTime
  form.value.limitTime = limitTime / 60
  dialogFormVisible.value = true
}
//点击新增,初始化
const toAdd = async () => {
  addOrEdit.value = 0
  form.value.name = ''
  form.value.startTime = date.value ? date.value.format('yyyy-MM-dd HH:mm:ss') : ''
  form.value.endTime = date.value ? date.value.format('yyyy-MM-dd HH:mm:ss') : ''
  form.value.limitTime = 10
  dialogFormVisible.value = true
}
//添加or编辑提交
const onSubmit = async () => {
  if (addOrEdit.value === 0) {
    const data = await addTest(form.value).then((res) => {
      //添加失败
      if (res.data.state !== 200) {
        ElMessage.error('添加考试失败')

        //打印数据
        console.log(res.data)

        throw new Error('添加考试失败')
      }
      //添加成功
      return res.data
    })

    ElMessage.success('添加考试成功')
    dialogFormVisible.value = false
  } else {
    const data = await editTest(editId.value, form.value).then((res) => {
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

  //修改后,重新获取列表(待写)
  getTestListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
}
//删除
const deleteTestById = async (examId) => {
  const data = await deleteTest(examId).then((res) => {
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
  getTestListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
}

//测试考试所需试卷数据
const testPapers = ref([])
//页查询
const listPaperCurrentPage = ref(1)
const listPaperPageSize = ref(10)
const paperTotal = ref(0)
const getPaperListPage = async (queryCondition) => {
  const data = await getPaperList(queryCondition).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取试卷列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取试卷列表失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  testPapers.value = data.data.list
  paperTotal.value = data.data.totalCount
  listPaperCurrentPage.value = data.data.currPage
  listPaperPageSize.value = data.data.pageSize
}
//考卷单选
const addPaper = () => {
  getPaperListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
  dialogFormVisible.value = false
  dialogPaperVisible.value = true
}
const afterAddingPaper = () => {
  form.value.paperId = currentRow.value.paperId
  console.log(form.value.paperId)
  dialogPaperVisible.value = false
  dialogFormVisible.value = true
}
const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()
const setCurrent = (row?) => {
  singleTableRef.value!.setCurrentRow(row)
}
const handleCurrentChange = (val) => {
  currentRow.value = val
}

//考试列表数据
const records = ref([])
//是否为搜索查询
const conditionSearch = ref(0)
//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getTestListPage = async (queryCondition) => {
  const data = await getTestList(queryCondition).then((res) => {
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取考试列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取考试列表失败')
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

const queryCondition = ref({
  name: ''
})
//搜索查询
const getTestInfoByName = async () => {
  const data = await getTestByName(queryCondition.value.name).then((res) => {
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
  conditionSearch.value = 1
  console.log(data)
  ElMessage.success('搜索成功')
  records.value = data.data
  listCurrentPage.value = 1
  total.value = data.data.length

  queryCondition.value.name = ''

  console.log(records.value)
}

//刷新页面
const handleRefresh = () => {
  getTestListPage({
    pageNumber: 1,
    pageSize: listPageSize.value
  })
  conditionSearch.value = 0
  listCurrentPage.value = 1
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-icon :size="40" class="refresh" @click="handleRefresh"><IEpRefresh /></el-icon>
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="考试" class="searchInput">
            <el-input v-model="queryCondition.name" placeholder="请输入考试关键字" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getTestInfoByName">查询</el-button>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="toAdd" class="addButton"> 新增考试 </el-button>
      </div>
    </template>
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="examId" label="考试ID" align="center" />
      <el-table-column prop="paperId" label="试卷ID" align="center" />
      <el-table-column prop="name" label="考试名称" align="center" />
      <el-table-column label="考试时长" align="center" v-slot="{ row }" width="180px">
        <p>{{ row.limitTime / 60 }}分钟</p>
      </el-table-column>
      <el-table-column prop="startTime" label="开始日期" width="180" align="center" />
      <el-table-column prop="endTime" label="结束日期" width="180" align="center" />
      <el-table-column label="考生" align="center" v-slot="{ row }" width="180px">
        <el-button
          type="info"
          :icon="User"
          @click="$router.push({ name: 'testExaminee', params: { id: row.examId } })"
        >
          选择考生
        </el-button>
      </el-table-column>
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <el-button
          type="primary"
          @click="toModify(row.examId, row.name, row.startTime, row.endTime, row.limitTime)"
          >编辑</el-button
        >
        <el-button type="danger" @click="deleteTestById(row.examId)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :title="title" center>
      <el-form :model="form" label-width="120px">
        <el-form-item label="考试名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="考试时长(分钟)">
          <el-input-number v-model="form.limitTime" :min="10" :max="120" />
        </el-form-item>

        <!-- 绑定 @change="handleChange" -->
        <el-form-item label="开始时间">
          <div class="block">
            <el-date-picker
              v-model="form.startTime"
              type="datetime"
              placeholder="选择考试开始时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              @change="handleStartDateTimeChange"
            />
          </div>
        </el-form-item>

        <el-form-item label="结束时间">
          <div class="block">
            <el-date-picker
              v-model="form.endTime"
              type="datetime"
              placeholder="选择考试结束时间"
              format="YYYY-MM-DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              @change="handleEndDateTimeChange"
            />
          </div>
        </el-form-item>

        <el-form-item label="考卷" v-show="addOrEdit === 0">
          <el-button type="info" :icon="DocumentAdd" @click="addPaper"> 选择考卷 </el-button>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogPaperVisible" title="选择试卷" center style="width: 70%">
      <el-table
        ref="singleTableRef"
        border
        style="width: 100%"
        :data="testPapers"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="paperId" label="试卷ID" align="center" width="80px" />
        <el-table-column prop="name" label="试卷名称" align="center" />
        <el-table-column prop="totalNum" label="题目数" align="center" />
        <el-table-column prop="totalScore" label="总分" align="center" />
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="afterAddingPaper"> 提交 </el-button>
        </div>
      </template>

      <el-pagination
        :page-sizes="[5, 10, 20, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        v-model:current-page="listPaperCurrentPage"
        v-model:page-size="listPaperPageSize"
        :total="paperTotal || 0"
        @size-change="(pageSize) => getPaperListPage({ pageSize: pageSize, pageNumber: 1 })"
        @current-change="
          (currentPage: number) =>
            getPaperListPage({ pageSize: listPageSize, pageNumber: currentPage })
        "
      />
    </el-dialog>

    <el-pagination
      v-show="conditionSearch === 0"
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listCurrentPage"
      v-model:page-size="listPageSize"
      :total="total || 0"
      @size-change="(pageSize) => getTestListPage({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getTestListPage({ pageSize: listPageSize, pageNumber: currentPage })
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
    margin-right: 25px;
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
