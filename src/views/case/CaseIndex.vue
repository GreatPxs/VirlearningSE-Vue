<script setup lang="ts">
import { getCaseList } from '@/api/caseManage/getCaseList.js'
import { deleteCase } from '@/api/caseManage/deleteCase.js'
import { selectCase } from '@/api/caseManage/selectCase'

onMounted(() => {
  getCaseListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

//宠物分类选项菜单
const options = [
  {
    value: '猫',
    label: '猫'
  },
  {
    value: '狗',
    label: '狗'
  },
  {
    value: '鸟',
    label: '鸟'
  },
  {
    value: '兔',
    label: '兔'
  },
  {
    value: '其他',
    label: '其他'
  }
]

//测试数据
const record = ref([])
//标记是否为条件搜索 0页查询 1条件搜索
const conditionSearch = ref(0)

//搜索条件
const searchCondition = ref({
  name: '',
  animal: ''
})
//搜索查询
const selectCaseInfo = async (pageCondition) => {
  const data = await selectCase(searchCondition.value, pageCondition).then((res) => {
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
  record.value = data.data.dataList
  listCurrentPage.value = pageCondition.pageNumber
  listPageSize.value = pageCondition.pageSize
  total.value = data.data.count

  console.log(record.value)
}
//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getCaseListPage = async (queryCondition) => {
  const data = await getCaseList(queryCondition).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取病例列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取病例列表失败')
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

//处理页数大小改变
const handlePageSizeChange = (pageSize) => {
  if (conditionSearch.value === 0) {
    getCaseListPage({ pageSize: pageSize, pageNumber: 1 })
  } else {
    selectCaseInfo({ pageSize: pageSize, pageNumber: 1 })
  }
}
//处理页码改变
const handlePageNumberChange = (currentPage) => {
  if (conditionSearch.value === 0) {
    getCaseListPage({ pageSize: listPageSize.value, pageNumber: currentPage })
  } else {
    selectCaseInfo({ pageSize: listPageSize.value, pageNumber: currentPage })
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

//删除
const deleteCaseById = async (id) => {
  const data = await deleteCase(id).then((res) => {
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

  //删除成功后,需要重新获取药物列表
  getCaseListPage({
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
          <el-icon :size="40" class="refresh" @click="handleRefresh"><IEpRefresh /></el-icon>
          <el-form :inline="true" class="demo-form-inline" :model="searchCondition">
            <el-form-item label="病种">
              <el-input clearable placeholder="疾病名称" v-model="searchCondition.name" />
            </el-form-item>
            <el-form-item label="宠物种类">
              <el-select
                v-model="searchCondition.animal"
                placeholder="选择宠物"
                size="large"
                style="width: 240px"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="selectCaseInfo({ pageNumber: 1, pageSize: listPageSize })"
                >查询
              </el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="$router.push({ name: 'case-create' })">
            新增病例
          </el-button>
        </div>
      </template>
      <!-- tabel需要绑定数据 :data="queriedResult.records",以下records为测试数据 -->
      <el-table :data="record" border style="width: 100%">
        <!-- prop绑定属性，如第一行 -->
        <el-table-column prop="id" label="编号" width="180" align="center" />
        <el-table-column prop="cname" label="病例名称" align="center" />
        <el-table-column prop="name" label="疾病名称" align="center" />
        <el-table-column prop="animal" label="宠物种类" align="center" />
        <el-table-column prop="jzphoto" label="接诊照片" align="center">
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.jzphoto"
              fit="fill"
            ></el-image>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" v-slot="{ row }">
          <el-button
            type="primary"
            @click="$router.push({ name: 'case-edit', params: { id: row.id } })"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteCaseById(row.id)">删除</el-button>
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
  margin-bottom: 0px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.refresh:hover {
  color: #409eff;
}
</style>
