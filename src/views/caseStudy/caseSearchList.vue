<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { selectCaseOnlyCname } from '@/api/caseManage/selectCaseOnlyCname'

const router = useRouter()
const route = useRoute()

//病例名
const cname = ref('')
onBeforeMount(() => {
  cname.value = route.params.cname.toString()
  console.log(cname.value)
})

onMounted(() => {
  getCaseList()
})

//查询
const records = ref([])
const getCaseList = async () => {
  const data = await selectCaseOnlyCname(cname.value).then((res) => {
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
}
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-page-header @back="$router.go(-1)">
        <template #content>{{ cname }} 病例搜索结果</template></el-page-header
      >
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
  </el-card>
</template>

<style lang="scss" scoped>
.box-card {
  width: auto;
}
</style>
