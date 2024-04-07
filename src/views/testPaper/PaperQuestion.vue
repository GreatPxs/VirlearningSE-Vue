<script setup lang="ts">
import { getPaperQuestionList } from '@/api/paperManage/getPaperQuestionList'
import { getNoPaperQuestionList } from '@/api/paperManage/getNoPaperQuestionList'
import { deletePaperQuestion } from '@/api/paperManage/deletePaperQuestion'
import { addPaperQuestion } from '@/api/paperManage/addPaperQuestion'
import { useRoute } from 'vue-router'

onMounted(() => {
  getPaperQuestionListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })

  getNoPaperQuestionListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

//切换事件
const handleClick = () => {
  getPaperQuestionListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })

  getNoPaperQuestionListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
}

const route = useRoute()
//试卷ID
const paperId = ref(0)
onBeforeMount(() => {
  paperId.value = parseInt(route.params.id.toString())
  console.log(paperId.value)
})
const activeIndex = ref('1')

//已选题目信息
const selectedRecords = ref([])
//已选题目页查询
const listSelectedCurrentPage = ref(1)
const listSelectedPageSize = ref(10)
const selectedTotal = ref(0)
const getPaperQuestionListPage = async (queryCondition) => {
  const data = await getPaperQuestionList(
    paperId.value,
    queryCondition.pageNumber,
    queryCondition.pageSize
  ).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取已选题目列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取已选题目列表失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  selectedRecords.value = data.data.list
  total.value = data.data.totalCount
  listSelectedCurrentPage.value = data.data.currPage
  listSelectedPageSize.value = data.data.pageSize
}
//删除已选题目
const deleteQuestionById = async (id) => {
  const data = await deletePaperQuestion(paperId.value, id).then((res) => {
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
  getPaperQuestionListPage({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}

const records = ref([]) //可选题目信息
const dialogQuesVisible = ref(false)
//可选题目页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getNoPaperQuestionListPage = async (queryCondition) => {
  const data = await getNoPaperQuestionList(
    paperId.value,
    queryCondition.pageNumber,
    queryCondition.pageSize
  ).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取可选题目列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取可选题目列表失败')
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

const form = ref({
  id: null,
  pqscore: 1
})
const toAdd = (id) => {
  form.value.id = id
  form.value.pqscore = 1
  dialogQuesVisible.value = true
}
//添加题目
const addPaperQuestionById = async () => {
  console.log(paperId.value, form.value.id, form.value.pqscore)
  const data = await addPaperQuestion(paperId.value, form.value.id, form.value.pqscore).then(
    (res) => {
      //添加失败
      if (res.data.state !== 200) {
        ElMessage.error('添加失败')
        //打印数据
        console.log(res.data)
        throw new Error('添加失败')
      }
      return res.data
    }
  )

  //添加成功
  console.log(data)
  ElMessage.success('添加成功')
  form.value.id = null
  form.value.pqscore = 0
  dialogQuesVisible.value = false

  //添加成功后,需要重新获取题目列表
  getNoPaperQuestionListPage({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}
//条件搜索
</script>

<template>
  <el-page-header @back="$router.go(-1)">
    <template #content>
      <el-tabs v-model="activeIndex" class="demo-tabs" type="card" @tab-click="handleClick">
        <el-tab-pane label="已选题目" name="1"></el-tab-pane>
        <el-tab-pane label="添加题目" name="2"></el-tab-pane>
      </el-tabs>
    </template>
  </el-page-header>

  <el-card class="box-card" v-show="activeIndex === '1'">
    <!--table需要绑定查询结果 :data="queriedResult.records" -->
    <el-table border style="width: 100%" :data="selectedRecords">
      <el-table-column prop="id" label="ID" align="center" />
      <el-table-column prop="description" label="题目" align="center" />
      <el-table-column prop="type" label="分类" align="center" />
      <el-table-column prop="option_a" label="A" align="center" />
      <el-table-column prop="option_b" label="B" align="center" />
      <el-table-column prop="option_c" label="C" align="center" />
      <el-table-column prop="option_d" label="D" align="center" />
      <el-table-column prop="answer" label="答案" align="center" />
      <el-table-column label="操作" align="center" v-slot="{ row }" width="180px">
        <el-button type="danger" @click="deleteQuestionById(row.id)">删除</el-button>
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listSelectedCurrentPage"
      v-model:page-size="listSelectedPageSize"
      :total="selectedTotal || 0"
      @size-change="(pageSize) => getPaperQuestionListPage({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getPaperQuestionListPage({ pageSize: listPageSize, pageNumber: currentPage })
      "
    />
  </el-card>

  <el-card class="box-card" v-show="activeIndex === '2'">
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
        <el-button type="primary" @click="toAdd(row.id)">添加</el-button>
      </el-table-column>
    </el-table>

    <el-dialog v-model="dialogQuesVisible" title="添加试题" center style="width: 70%">
      <el-form :model="form" label-width="60px">
        <el-form-item label="分数">
          <el-input-number v-model="form.pqscore" :min="1" :max="100" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="addPaperQuestionById"> 提交 </el-button>
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
      @size-change="(pageSize) => getNoPaperQuestionListPage({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getNoPaperQuestionListPage({ pageSize: listPageSize, pageNumber: currentPage })
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
  margin-top: 25px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}
</style>
