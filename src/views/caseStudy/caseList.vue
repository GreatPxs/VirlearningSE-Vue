<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

//测试：病例列表数据
const records = [
  {
    id: 1,
    caseName: '犬瘟热',
    reception: '犬瘟热经典症状',
    check: '犬瘟热校验',
    diagnosis: '犬瘟热诊断',
    treatment: '犬瘟热治疗'
  }
]
</script>

<template>
  <el-card class="box-card">
    <template #header>
      <el-page-header @back="$router.go(-1)" />
    </template>
    <!-- tabel需要绑定数据 :data="queriedResult.records",以下records为测试数据 -->
    <el-table :data="records" border style="width: 100%">
      <!-- prop绑定属性，如第一行 -->
      <el-table-column prop="id" label="病例编号" width="180" align="center" />
      <el-table-column prop="caseName" label="疾病名称" align="center" />
      <el-table-column prop="reception" label="接诊" align="center" />
      <el-table-column prop="check" label="校验" align="center" />
      <el-table-column prop="diagnosis" label="诊断" align="center" />
      <el-table-column prop="treatment" label="治疗" align="center" />
      <el-table-column label="操作" align="center" v-slot="{}">
        <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
        <el-button type="default" @click="router.push({ name: 'casePage' })">查看病例</el-button>
      </el-table-column>
    </el-table>

    <!-- 
        分页还需要以下属性
        v-model:current-page="queriedResult.current"
        v-model:page-size="queriedResult.size"
        :total="queriedResult.total || 0"
        @size-change="(pageSize: number) => queryCourses({ pageSize, currentPage: 1 })"
        @current-change="(currentPage: number) => queryCourses({ currentPage })"
       -->
    <el-pagination
      :page-sizes="[5, 10, 20, 50]"
      :background="true"
      layout="total, sizes, prev, pager, next, jumper"
    />
  </el-card>
</template>

<style lang="scss" scoped></style>
