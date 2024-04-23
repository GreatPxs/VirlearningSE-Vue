<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { getCaseByName } from '@/api/caseStudy/getCaseByName'
import { selectCaseWithCname } from '@/api/caseManage/selectCaseWithCname'

const router = useRouter()
const route = useRoute()

//病种名称
const name = ref('')
onBeforeMount(() => {
  name.value = route.params.name.toString()
  queryCondition.value.name = name.value
  console.log(name.value)
})

onMounted(() => {
  getCaseListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})
//页查询
const records = ref([])
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getCaseListPage = async (queryCondition) => {
  const data = await getCaseByName(name.value, queryCondition).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('获取病例失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取病例失败')
    }
    //获取成功
    console.log(res.data)
    return res.data
  })

  listCurrentPage.value = queryCondition.pageNumber
  listPageSize.value = queryCondition.pageSize
  records.value = data.data.dataList
  total.value = data.data.dataList.length
}

//是否为搜索查询
const conditionSearch = ref(0)
//搜索条件
const queryCondition = ref({
  name: '',
  cname: ''
})
//搜索查询
const getCaseInfoByName = async (pageCondition) => {
  const data = await selectCaseWithCname(queryCondition.value, pageCondition).then((res) => {
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
  records.value = data.data.dataList
  listCurrentPage.value = pageCondition.pageNumber
  listPageSize.value = pageCondition.pageSize
  total.value = data.data.count

  console.log(records.value)
}

//处理页数大小改变
const handlePageSizeChange = (pageSize) => {
  if (conditionSearch.value === 0) {
    getCaseListPage({ pageSize: pageSize, pageNumber: 1 })
  } else {
    getCaseInfoByName({ pageSize: pageSize, pageNumber: 1 })
  }
}
//处理页码改变
const handlePageNumberChange = (currentPage) => {
  if (conditionSearch.value === 0) {
    getCaseListPage({ pageSize: listPageSize.value, pageNumber: currentPage })
  } else {
    getCaseInfoByName({ pageSize: listPageSize.value, pageNumber: currentPage })
  }
}

//刷新页面
const handleRefresh = () => {
  getCaseListPage({
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
      <el-page-header @back="$router.go(-1)" />
      <div class="card-header">
        <el-form :inline="true" :model="queryCondition" class="demo-form-inline">
          <el-form-item label="病例名" class="searchInput">
            <el-input v-model="queryCondition.cname" placeholder="请输入病例名关键字" clearable />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="getCaseInfoByName({ pageNumber: 1, pageSize: listPageSize })"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
        <el-icon :size="40" class="refresh" @click="handleRefresh"><IEpRefresh /></el-icon>
      </div>
    </template>
    <el-table :data="records" border style="width: 100%">
      <el-table-column prop="case_id" label="病例编号" width="180" align="center" />
      <el-table-column prop="cname" label="病例名称" align="center" v-slot="{ row }">
        {{
          row.cname === null
            ? ''
            : row.cname.length > 30
              ? row.cname.substring(0, 28) + `...`
              : row.cname
        }}
      </el-table-column>
      <el-table-column prop="name" label="疾病名称" align="center" />
      <el-table-column prop="jzword" label="接诊" align="center" v-slot="{ row }">
        {{
          row.jzword === null
            ? ''
            : row.jzword.length > 30
              ? row.jzword.substring(0, 28) + `...`
              : row.jzword
        }}
      </el-table-column>
      <el-table-column prop="jcword" label="检查" align="center" v-slot="{ row }">
        {{
          row.jcword === null
            ? ''
            : row.jcword.length > 30
              ? row.jcword.substring(0, 28) + `...`
              : row.jcword
        }}
      </el-table-column>
      <el-table-column prop="zdword" label="诊断" align="center" v-slot="{ row }">
        {{
          row.zdword === null
            ? ''
            : row.zdword.length > 30
              ? row.zdword.substring(0, 28) + `...`
              : row.zdword
        }}
      </el-table-column>
      <el-table-column prop="zlword" label="治疗" align="center" v-slot="{ row }">
        {{
          row.zlword === null
            ? ''
            : row.zlword.length > 30
              ? row.zlword.substring(0, 28) + `...`
              : row.zlword
        }}
      </el-table-column>
      <el-table-column label="操作" align="center" v-slot="{ row }">
        <el-button
          type="default"
          @click="router.push({ name: 'casePage', params: { id: row.case_id } })"
          >查看病例</el-button
        >
      </el-table-column>
    </el-table>

    <el-pagination
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
      v-model:current-page="listCurrentPage"
      v-model:page-size="listPageSize"
      :total="total || 0"
      @size-change="(pageSize) => handlePageSizeChange(pageSize)"
      @current-change="(currentPage: number) => handlePageNumberChange(currentPage)"
    />
  </el-card>
</template>

<style lang="scss" scoped>
.box-card {
  width: auto;
}

.card-header {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}

.refresh:hover {
  color: #409eff;
}
</style>
