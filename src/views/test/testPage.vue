<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { getPaperInfo } from '@/api/paperManage/getPaperInfo'
import { calculateScore } from '@/api/test/calculateScore'

const isLoading = ref(false)

//获取当前时间字符串
function getCurrentDateTime() {
  let date = new Date() // 获取当前日期和时间

  let year = date.getFullYear() // 获取年份（四位数）
  let month = (date.getMonth() + 1).toString().padStart(2, '0') // 获取月份并确保是两位数
  let day = date.getDate().toString().padStart(2, '0') // 获取日并确保是两位数
  let hours = date.getHours().toString().padStart(2, '0') // 获取小时并确保是两位数
  let minutes = date.getMinutes().toString().padStart(2, '0') // 获取分钟并确保是两位数
  let seconds = date.getSeconds().toString().padStart(2, '0') // 获取秒并确保是两位数

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

const route = useRoute()
const router = useRouter()
//用户ID
const userId = ref(0)
//考试ID
const examId = ref(0)
//试卷ID
const paperId = ref(0)
//标题头消息
const headerInfo = ref([
  {
    name: '测试一',
    startTime: '2024-3-15 15:30',
    endTime: '2024-3-15 16:30'
  }
])
onBeforeMount(() => {
  userId.value = parseInt(window.localStorage.getItem('userId'))
  examId.value = parseInt(route.params.examId.toString())
  paperId.value = parseInt(route.params.paperId.toString())
  headerInfo.value[0].name = window.localStorage.getItem('name')
  headerInfo.value[0].startTime = window.localStorage.getItem('startTime')
  headerInfo.value[0].endTime = window.localStorage.getItem('endTime')
  targetTime = parseInt(window.localStorage.getItem('end'))
  console.log(`userId:${userId.value}`, `examId:${examId.value}`, `paperId:${paperId.value}`)
  console.log(`endTime ${headerInfo.value[0].endTime}`)

  getPaperInfoList()

  //初始化答案数组
  checkList.value = new Array(questions.value.length).fill('E')
})

//答案数组
const checkList = ref([])
//题目列表
const questions = ref([])
//获取考试题目信息
const getPaperInfoList = async () => {
  const data = await getPaperInfo(paperId.value).then((res) => {
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('获取试卷信息失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取试卷信息失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  questions.value = data.data
  console.log(questions.value)
}

//点击退出按钮
const clickOut = () => {
  ElMessageBox.confirm('确认退出考试吗？', '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      //跳转至考试列表页面
      router.push({ name: 'testInfo' })
    })
    .catch(() => {})
}

//点击提交按钮
const clickSubmit = () => {
  ElMessageBox.confirm('确认提交试卷吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      confirmButtonSubmit()
    })
    .catch(() => {})
}

//试卷上传
const onSubmit = async () => {
  isLoading.value = true
  const userAnswer = checkList.value.join('')

  const data = await calculateScore(examId.value, userAnswer, getCurrentDateTime()).then((res) => {
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('试卷上传失败')

      //打印数据
      console.log(res.data)

      throw new Error('试卷上传失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })
}

//确认提交
const confirmButtonSubmit = () => {
  onSubmit()

  //告知用户考卷已提交
  ElMessage.success('试卷提交成功')
  clearInterval(intervalId)

  //跳转至考试列表页面
  router.push({ name: 'testInfo' })
}

//倒计时制作
const timer = ref('')
// 设置目标时间戳（结束时间）
let targetTime
// 每秒更新一次倒计时
const intervalId = setInterval(updateCountdown, 1000)
// 更新倒计时的函数
function updateCountdown() {
  const now = new Date().valueOf()
  const distance = (targetTime - now) / 1000 // 目标时间和现在的差距(s为单位)
  console.log(`now-${now}`)
  console.log(`target-${targetTime}`)
  console.log(headerInfo.value[0].endTime)

  // 如果差距大于0，则计时器还在运行
  if (distance >= 0) {
    // 计算时分秒
    // const hours = Math.floor((distance % (3600 * 1000 * 24)) / (3600 * 1000))
    // const minutes = Math.floor((distance % (3600 * 1000)) / (60 * 1000))
    // const seconds = Math.floor((distance % (60 * 1000)) / 1000)
    const days = Math.floor(distance / (60 * 60 * 24))
    const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60))
    const minutes = Math.floor((distance % (60 * 60)) / 60)
    const seconds = Math.floor(distance % 60)
    // 输出或显示倒计时
    console.log(`倒计时: ${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`)
    timer.value = `倒计时: ${days}天 ${hours}小时 ${minutes}分 ${seconds}秒`
  } else {
    // 倒计时结束，清除定时器
    timer.value = '考试结束'
    onSubmit() //提交试卷

    //告知用户
    ElMessage.success('考试结束,系统自动提交考卷')

    clearInterval(intervalId)
    //跳转至考试列表页面
    router.push({ name: 'testInfo' })
  }
}

//radio获取值,修改右侧栏对应题目状态
const handleRadioChange = (selectedValue, event, id) => {
  // 获取所有具有my-class类的元素
  var elements = document.querySelectorAll('.questionShow')

  // 获取第三个元素（索引从0开始）
  var targetElement = elements[id] as HTMLElement

  targetElement.style.color = 'white'
  targetElement.style.backgroundColor = '#03479f'
  targetElement.style.borderColor = 'white'
}
</script>

<template>
  <div>
    <el-table :data="headerInfo" border style="width: 100%" class="header">
      <el-table-column prop="name" label="测试名" align="center" />
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column prop="endTime" label="结束时间" align="center" />
    </el-table>

    <el-card style="width: 300px" class="timer">
      <template #header>
        <div class="card-header">
          <span>{{ timer }}</span>
        </div>
      </template>
      <div class="questionList">
        <div class="questionShow" v-for="(question, index) in questions" :key="index">
          <p>{{ index + 1 }}</p>
        </div>
      </div>
    </el-card>

    <div class="question" v-for="(question, index) in questions" :key="index">
      <div class="questionTitle">
        <div class="number">{{ index + 1 }}</div>
        <div class="questionName">{{ `${question.description}` }}</div>
        <div>{{ `(${question.type})` }}</div>
      </div>

      <el-radio-group
        v-model="checkList[index]"
        class="options"
        @change="handleRadioChange(checkList[index], $event, index)"
      >
        <el-radio :label="`A.  ${question.option_a}`" value="A" />
        <el-radio :label="`B.  ${question.option_b}`" value="B" />
        <el-radio :label="`C.  ${question.option_c}`" value="C" />
        <el-radio :label="`D.  ${question.option_d}`" value="D" class="lastD" />
      </el-radio-group>
    </div>

    <div class="button">
      <el-button type="primary" size="large" :loading="isLoading" @click="clickSubmit"
        >提交</el-button
      >
      <el-button type="danger" size="large" @click="clickOut">退出</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  margin-top: 20px;
  margin-bottom: 50px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #515151;
}

.timer {
  position: fixed;
  right: 50px;
  top: 300px;
}

.questionList {
  display: flex;
  flex-wrap: wrap;
}

.questionShow {
  width: 20px;
  height: 20px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 20px;
  margin-bottom: 10px;
}

.questionShow:nth-child(5n) {
  margin-right: 0px;
}

.questionShow:nth-child(5n + 1) {
  margin-left: 10px;
}

.message {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
  color: #515151;
}

.number {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid white;
  background-color: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 20px;
}

.question {
  margin-bottom: 20px;
}

.questionTitle {
  display: flex;
  align-items: center;
}

.questionName {
  margin-right: 10px;
}

.options {
  margin-left: 50px;
}

:deep(.el-radio-group) {
  display: block;
}

:deep(.el-radio) {
  display: block;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 100px;
}
</style>
