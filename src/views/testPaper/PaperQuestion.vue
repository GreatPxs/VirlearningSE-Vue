<script setup lang="ts">
import { getPaperInfo } from '@/api/paperManage/getPaperInfo'
import { useRoute } from 'vue-router'

const route = useRoute()
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
//试卷ID
const paperId = ref(0)
onBeforeMount(() => {
  paperId.value = parseInt(route.params.id.toString())
  console.log(paperId.value)
})
const activeIndex = ref('1')

//已选题目信息
const selectedRecords = ref([
  {
    id: 1,
    description: 'test',
    option_a: 'A',
    option_b: 'B',
    option_c: 'C',
    option_d: 'D',
    answer: 'A',
    type: '接诊'
  }
])
//已选题目页查询
const listSelectedCurrentPage = ref(1)
const listSelectedPageSize = ref(10)
const selectedTotal = ref(0)
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

const records = ref([
  {
    id: 1,
    description: 'test',
    option_a: 'A',
    option_b: 'B',
    option_c: 'C',
    option_d: 'D',
    answer: 'A',
    type: '接诊'
  }
]) //可选题目信息
//可选题目页查询
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
const queryCondition = ref({
  //添加题目搜索条件
  description: '',
  type: ''
})
//条件搜索
</script>

<template>
  <el-page-header @back="$router.go(-1)">
    <template #content>
      <el-tabs v-model="activeIndex" class="demo-tabs" type="card">
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
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <el-button type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 
      分页需要属性
      @size-change="(pageSize) => queryUsers({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryUsers({ currentPage })"
     -->
    <el-pagination
      :page-sizes="[10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listSelectedCurrentPage"
      v-model:page-size="listSelectedPageSize"
      :total="selectedTotal || 0"
    />
  </el-card>

  <el-card class="box-card" v-show="activeIndex === '2'">
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
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
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
      <el-table-column label="操作" align="center" v-slot="{}" width="180px">
        <el-button type="primary">添加</el-button>
      </el-table-column>
    </el-table>

    <!-- 
      分页需要属性
      @size-change="(pageSize) => queryUsers({ pageSize, currentPage: 1 })"
      @current-change="(currentPage: number) => queryUsers({ currentPage })"
     -->
    <el-pagination
      :page-sizes="[10, 20, 50]"
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
  margin-top: 25px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}
</style>
