<script setup lang="ts">
import { DocumentAdd } from '@element-plus/icons-vue'
import { addPaper } from '@/api/paperManage/addPaper.js'
import { modifyPaper } from '@/api/paperManage/modifyPaper'
import { deletePaper } from '@/api/paperManage/deletePaper'
import { getPaperByName } from '@/api/paperManage/getPaperByName'

//测试试卷数据
const records = ref([])

const queryCondition = ref({
  name: ''
})
//搜索查询
const getPaperInfoByName = async () => {
  const data = await getPaperByName(queryCondition.value.name).then((res) => {
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

  queryCondition.value.name = ''

  console.log(records.value)
}

//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
// const getDrugListPage = async (queryCondition) => {
//   const data = await getDrugList(queryCondition).then((res) => {
//     console.log(res)
//     //获取失败
//     if (res.data.resultCode !== 200) {
//       ElMessage.error('获取药物列表失败')

//       //打印数据
//       console.log(res.data)

//       throw new Error('获取药物列表失败')
//     }
//     //获取成功

//     console.log(res.data)
//     return res.data
//   })

//   record.value = data.data.list
//   total.value = data.data.totalCount
//   listCurrentPage.value = data.data.currPage
//   listPageSize.value = data.data.pageSize
// }

//控制dialog新增题目表单是否可见
const dialogQuesVisible = ref(false)

//新建题目
const form = ref({
  name: ''
})
//0为添加, 1为修改
const addOrEdit = ref(0)
//dialog标题
const title = computed(() => {
  return addOrEdit.value === 0 ? '添加试卷' : '修改试卷'
})
//控制新增/编辑的dialog
const dialogFormVisible = ref(false)

//待编辑药物id
const editId = ref(0)
//点击编辑,获取编辑药物信息
const toModify = async (id, name) => {
  addOrEdit.value = 1
  editId.value = id
  form.value.name = name
  dialogFormVisible.value = true
}

//点击新增,初始化
const toAdd = async () => {
  addOrEdit.value = 0
  form.value.name = ''

  dialogFormVisible.value = true
}

//添加or编辑提交
const onSubmit = async () => {
  if (addOrEdit.value === 0) {
    const data = await addPaper(form.value).then((res) => {
      //添加失败
      if (res.data.state !== 200) {
        ElMessage.error('添加试卷失败')

        //打印数据
        console.log(res.data)

        throw new Error('添加试卷失败')
      }
      //添加成功
      return res.data
    })

    ElMessage.success('添加试卷成功')
    dialogFormVisible.value = false
  } else {
    const data = await modifyPaper(editId.value, form.value.name).then((res) => {
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
  // getDrugListPage({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}

//删除
const deletePaperById = async (id) => {
  const data = await deletePaper(id).then((res) => {
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
  // getDrugListPage({
  //   pageNumber: listCurrentPage.value,
  //   pageSize: listPageSize.value
  // })
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="试卷">
            <el-input v-model="queryCondition.name" placeholder="请输入试卷关键字" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getPaperInfoByName">查询</el-button>
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="toAdd"> 新增试卷 </el-button>
      </div>
    </template>
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="records">
      <el-table-column prop="paperId" label="试卷ID" align="center" />
      <el-table-column prop="name" label="试卷名称" align="center" />
      <el-table-column prop="totalScore" label="总分" align="center" />
      <el-table-column prop="totalNum" label="题目数" align="center" />
      <el-table-column label="试题" align="center" v-slot="{ row }" width="180px">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button
          type="info"
          :icon="DocumentAdd"
          @click="this.$router.push({ name: 'paperQuestion', params: { id: row.paperId } })"
        >
          选择试题
        </el-button>
      </el-table-column>
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button type="primary" @click="toModify(row.paperId, row.name)">编辑</el-button>
        <el-button type="danger" @click="deletePaperById(row.paperId)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogFormVisible" :title="title" center>
      <el-form :model="form" label-width="100px">
        <el-form-item label="试卷名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="onSubmit"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- <el-dialog v-model="dialogQuesVisible" title="添加试题" center style="width: 70%">
      <el-table border style="width: 100%" :data="testQuestions">
        <el-table-column prop="isChosen" label="勾选" align="center" width="60px">
          <template #default="scope">
            <el-checkbox v-model="scope.row.isChosen" size="large" />
          </template>
        </el-table-column>
        <el-table-column prop="id" label="题目ID" align="center" width="80px" />
        <el-table-column prop="type" label="题目类型" align="center" width="90px" />
        <el-table-column prop="questionName" label="题目" align="center" />
        <el-table-column prop="questionScore" label="给分" align="center" width="180px">
          <template #default="scope">
            <el-input-number v-model="scope.row.questionScore" :min="1" :max="200" />
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="afterAddingQuestion"> 提交 </el-button>
        </div>
      </template>

      <el-pagination
        :page-sizes="[5, 10, 20, 50]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
      />
    </el-dialog> -->

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
