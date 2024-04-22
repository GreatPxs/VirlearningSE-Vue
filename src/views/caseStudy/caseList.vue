<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { getCaseByName } from '@/api/caseStudy/getCaseByName'

const router = useRouter()
const route = useRoute()

//病种名称
const name = ref('')
onBeforeMount(() => {
  name.value = route.params.name.toString()
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

  records.value = data.data.dataList
  total.value = data.data.dataList.length
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-page-header @back="$router.go(-1)" />
    </template>
    <el-table :data="records" border style="width: 100%">
      <el-table-column prop="case_id" label="病例编号" width="180" align="center" />
      <el-table-column prop="name" label="疾病名称" align="center" />
      <el-table-column prop="jzword" label="接诊" align="center" v-slot="{ row }">
        {{ row.jzword.length > 30 ? row.jzword.substring(0, 28) + `...` : row.jzword }}
      </el-table-column>
      <el-table-column prop="jcword" label="检查" align="center" v-slot="{ row }">
        {{ row.jcword.length > 30 ? row.jcword.substring(0, 28) + `...` : row.jcword }}
      </el-table-column>
      <el-table-column prop="zdword" label="诊断" align="center" v-slot="{ row }">
        {{ row.zdword.length > 30 ? row.zdword.substring(0, 28) + `...` : row.zdword }}
      </el-table-column>
      <el-table-column prop="zlword" label="治疗" align="center" v-slot="{ row }">
        {{ row.zlword.length > 30 ? row.zlword.substring(0, 28) + `...` : row.zlword }}
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
      @size-change="(pageSize) => getCaseListPage({ pageSize: pageSize, pageNumber: 1 })"
      @current-change="
        (currentPage: number) =>
          getCaseListPage({ pageSize: listPageSize, pageNumber: currentPage })
      "
    />
  </el-card>
</template>

<style lang="scss" scoped>
.box-card {
  width: auto;
}

.el-pagination {
  display: flex;
  justify-content: center;
  margin-top: 17px;
}
</style>
