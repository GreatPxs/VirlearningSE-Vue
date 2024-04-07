<script setup lang="ts">
import { addDrug } from '@/api/drugManage/addDrug.js'
import { editDrug } from '@/api/drugManage/editDrug.js'
import { getDrugList } from '@/api/drugManage/getDrugList.js'
import { getDrugByName } from '@/api/drugManage/getDrugByName.js'
import { deleteDrug } from '@/api/drugManage/deleteDrug.js'

onMounted(() => {
  getDrugListPage({
    pageNumber: listCurrentPage.value,
    pageSize: listPageSize.value
  })
})

//搜索条件
const searchCondition = reactive({
  name: ''
})
//搜索查询
const getDrugInfoByName = async () => {
  const data = await getDrugByName(searchCondition.name).then((res) => {
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
  record.value = data.data.dataList
  listCurrentPage.value = 1
  total.value = data.data.dataList.length

  searchCondition.name = ''

  console.log(record.value)
}

//药品类别数据
const options = [
  {
    value: '抗微生物药',
    label: '抗微生物药',
    children: [
      {
        value: '抗生素类',
        label: '抗生素类',
        children: [
          { value: 'β-内酰胺类', label: 'β-内酰胺类' },
          { value: '头孢菌素类', label: '头孢菌素类' },
          { value: '氨基糖苷类', label: '氨基糖苷类' },
          { value: '四环素类', label: '四环素类' },
          { value: '大环内酯类', label: '大环内酯类' },
          { value: '酰胺醇类', label: '酰胺醇类' },
          { value: '林可胺类', label: '林可胺类' },
          { value: '其他抗生素类', label: '其他抗生素类' }
        ]
      },
      {
        value: '合成抗菌药',
        label: '合成抗菌药',
        children: [
          { value: '磺胺类药', label: '磺胺类药' },
          { value: '喹诺酮类药', label: '喹诺酮类药' },
          { value: '其他合成抗菌药', label: '其他合成抗菌药' }
        ]
      }
    ]
  },
  {
    value: '抗寄生虫药',
    label: '抗寄生虫药',
    children: [
      {
        value: '抗蠕虫药',
        label: '抗蠕虫药'
      },
      {
        value: '抗原虫药',
        label: '抗原虫药'
      },
      {
        value: '杀虫药',
        label: '杀虫药'
      }
    ]
  },
  {
    value: '中枢神经系统药物',
    label: '中枢神经系统药物',
    children: [
      {
        value: '中枢兴奋药',
        label: '中枢兴奋药'
      },
      {
        value: '镇静药与抗惊厥药',
        label: '镇静药与抗惊厥药'
      },
      {
        value: '麻醉性镇痛药',
        label: '麻醉性镇痛药'
      },
      {
        value: '全身麻醉药与化学保定药',
        label: '全身麻醉药与化学保定药'
      }
    ]
  },
  {
    value: '外周神经系统药物',
    label: '外周神经系统药物',
    children: [
      {
        value: '拟胆碱药',
        label: '拟胆碱药'
      },
      {
        value: '抗胆碱药',
        label: '抗胆碱药'
      },
      {
        value: '拟肾上腺素药',
        label: '拟肾上腺素药'
      },
      {
        value: '局部麻醉药',
        label: '局部麻醉药'
      }
    ]
  },
  {
    value: '抗炎药',
    label: '抗炎药'
  },
  {
    value: '泌尿生殖系统药物',
    label: '泌尿生殖系统药物'
  },
  {
    value: '抗过敏药',
    label: '抗过敏药'
  },
  {
    value: '局部用药物',
    label: '局部用药物'
  },
  {
    value: '解毒药',
    label: '解毒药',
    children: [
      { value: '金属络合剂', label: '金属络合剂' },
      { value: '胆碱酯酶复活剂', label: '胆碱酯酶复活剂' },
      { value: '高铁血红蛋白还原剂', label: '高铁血红蛋白还原剂' },
      { value: '氰化物解毒剂', label: '氰化物解毒剂' },
      { value: '其他解毒剂', label: '其他解毒剂' }
    ]
  }
]

//测试数据 drugName:药名  specification:类别 unit:主治症状 drugNote:使用说明
const record = ref([])

//页查询
const listCurrentPage = ref(1)
const listPageSize = ref(10)
const total = ref(0)
const getDrugListPage = async (queryCondition) => {
  const data = await getDrugList(queryCondition).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取药物列表失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取药物列表失败')
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

//新增药物的测试数据
const form = reactive({
  drugName: '',
  specifications: '',
  unit: '',
  drugNote: ''
})
//0为添加, 1为修改
const addOrEdit = ref(0)
//dialog标题
const title = computed(() => {
  return addOrEdit.value === 0 ? '添加药物' : '修改药物'
})
//控制新增/编辑的dialog
const dialogFormVisible = ref(false)

//待编辑药物id
const editId = ref(0)
//点击编辑,获取编辑药物信息
const toModify = async (id, drugName, specifications, unit, drugNote) => {
  addOrEdit.value = 1
  editId.value = id
  form.drugName = drugName
  form.specifications = specifications
  form.unit = unit
  form.drugNote = drugNote
  dialogFormVisible.value = true
}

//点击新增,初始化
const toAdd = async () => {
  addOrEdit.value = 0
  form.drugName = ''
  form.specifications = ''
  form.unit = ''
  form.drugNote = ''

  dialogFormVisible.value = true
}

//添加or编辑提交
const onSubmit = async () => {
  if (addOrEdit.value === 0) {
    const data = await addDrug(form).then((res) => {
      //添加失败
      if (res.data.state !== 200) {
        ElMessage.error('添加药物失败')

        //打印数据
        console.log(res.data)

        throw new Error('添加药物失败')
      }
      //添加成功
      return res.data
    })

    ElMessage.success('添加药物成功')
    dialogFormVisible.value = false
  } else {
    const data = await editDrug(
      editId.value,
      form.drugName,
      form.specifications,
      form.unit,
      form.drugNote
    ).then((res) => {
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

  getDrugListPage({ pageNumber: listCurrentPage.value, pageSize: listPageSize.value })
}

//删除
const deleteDrugById = async (id) => {
  const data = await deleteDrug(id).then((res) => {
    //删除失败
    if (res.data.resultCode !== 200) {
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
  getDrugListPage({
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
          <el-form :inline="true" :model="searchCondition" class="demo-form-inline">
            <el-form-item label="药物">
              <el-input v-model="searchCondition.name" clearable placeholder="药物名称" />
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="getDrugInfoByName">查询 </el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" @click="toAdd"> 新增药物 </el-button>
        </div>
      </template>

      <el-table :data="record" border style="width: 100%">
        <!-- prop绑定属性，如第一行 -->
        <el-table-column prop="id" label="药物编号" width="180" align="center" />
        <el-table-column prop="drugName" label="药物名称" width="180" align="center" />
        <el-table-column prop="specifications" label="类别" align="center" />
        <el-table-column prop="unit" label="主治症状" align="center" />
        <el-table-column prop="drugNote" label="使用说明" align="center" />
        <el-table-column label="操作" align="center" v-slot="{ row }">
          <!-- 绑定点击跳转函数 @click="$router.push({ name: 'course-edit', params: { courseId: row.id } })" -->
          <el-button
            type="primary"
            @click="toModify(row.id, row.drugName, row.specifications, row.unit, row.drugNote)"
            >编辑</el-button
          >
          <el-button type="danger" @click="deleteDrugById(row.id)">删除</el-button>
        </el-table-column>
      </el-table>

      <el-dialog v-model="dialogFormVisible" :title="title" center>
        <el-form :model="form" label-width="100px">
          <el-form-item label="药名">
            <el-input v-model="form.drugName" autocomplete="off" />
          </el-form-item>

          <el-form-item label="类别">
            <el-cascader :options="options" v-model="form.specifications" size="large" />
          </el-form-item>

          <el-form-item label="主治症状">
            <el-input v-model="form.unit" autocomplete="off" />
          </el-form-item>

          <el-form-item label="使用说明">
            <el-input v-model="form.drugNote" autocomplete="off" />
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
        @size-change="(pageSize) => getDrugListPage({ pageSize: pageSize, pageNumber: 1 })"
        @current-change="
          (currentPage: number) =>
            getDrugListPage({ pageSize: listPageSize, pageNumber: currentPage })
        "
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
  margin-bottom: 20px;
}

.el-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}
</style>
