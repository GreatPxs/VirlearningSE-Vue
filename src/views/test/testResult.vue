<script setup lang="ts">
import { useRoute } from 'vue-router'
import { getPaperInfo } from '@/api/paperManage/getPaperInfo'
import { getExamScore } from '@/api/test/getExamScore'
import { getExamAnswer } from '@/api/test/getExamAnswer'
import { getPaperQuestionScoreList } from '@/api/paperManage/getPaperQuestionScoreList'
import { getPaperTotalNum } from '@/api/paperManage/getPaperTotalNum'
import { getPaperTotalScore } from '@/api/paperManage/getPaperTotalScore'

const route = useRoute()
//用户ID
const userId = ref(0)
//考试ID
const examId = ref(0)
//试卷ID
const paperId = ref(0)
//题目分数数组
const questionScoreList = ref([])
//标题头消息
const headerInfo = ref([
  {
    name: '',
    startTime: '',
    endTime: '',
    score: 0,
    totalNum: 0,
    totalScore: 0
  }
])

//获取题目分数数组
const getPaperQuestionScore = async () => {
  const data = await getPaperQuestionScoreList(paperId.value).then((res) => {
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('获取试卷题目分数失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取试卷题目分数失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  questionScoreList.value = data.data
  console.log(questionScoreList.value)
}

//获取考试总分
const getTotalScore = async () => {
  const data = await getPaperTotalScore(paperId.value).then((res) => {
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('获取试卷总分失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取试卷总分失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  headerInfo.value[0].totalScore = data.data
  console.log(headerInfo.value[0].totalScore)
}

//获取考试总分
const getTotalNum = async () => {
  const data = await getPaperTotalNum(paperId.value).then((res) => {
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('获取试卷题目总数失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取试卷题目总数失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  headerInfo.value[0].totalNum = data.data
  console.log(headerInfo.value[0].totalNum)
}

onBeforeMount(() => {
  userId.value = parseInt(window.localStorage.getItem('userId'))
  examId.value = parseInt(route.params.examId.toString())
  paperId.value = parseInt(route.params.paperId.toString())
  headerInfo.value[0].name = window.localStorage.getItem('name')
  headerInfo.value[0].startTime = window.localStorage.getItem('startTime')
  headerInfo.value[0].endTime = window.localStorage.getItem('endTime')
  console.log(`userId:${userId.value}`, `examId:${examId.value}`, `paperId:${paperId.value}`)

  getPaperInfoList()
  getUserExamScore()
  getUserExamAnswer()
  getPaperQuestionScore()
  getTotalScore()
  getTotalNum()

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

//获取用户考试分数
const getUserExamScore = async () => {
  const data = await getExamScore(examId.value, userId.value).then((res) => {
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('获取用户分数失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取用户分数失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  headerInfo.value[0].score = data.data
  console.log('用户成绩-' + headerInfo.value[0].score)
}

//获取用户答案
const getUserExamAnswer = async () => {
  const data = await getExamAnswer(examId.value, userId.value).then((res) => {
    //获取失败
    if (res.data.state !== 200) {
      ElMessage.error('获取用户答案失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取用户答案失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  checkList.value = data.data.split('')
  console.log('用户答案-' + checkList.value)
}
</script>

<template>
  <div>
    <img src="@/assets/testResultReturn.svg" @click="$router.push({ name: 'testInfo' })" />
    <el-table :data="headerInfo" border style="width: 100%" class="header">
      <el-table-column prop="name" label="测试名" align="center" />
      <el-table-column prop="score" label="得分" align="center" />
      <el-table-column prop="totalScore" label="总分" align="center" />
      <el-table-column prop="totalNum" label="题目数" align="center" />
      <el-table-column prop="startTime" label="开始时间" align="center" />
      <el-table-column prop="endTime" label="结束时间" align="center" />
    </el-table>

    <div class="question" v-for="(question, index) in questions" :key="index">
      <div class="questionTitle">
        <div class="number">{{ index + 1 }}</div>
        <div class="questionName">{{ `${question.description}` }}</div>
        <div>{{ `(${questionScoreList[index]}分 类型:${question.type})` }}</div>
      </div>

      <div class="options">
        <div class="option_a option">{{ `A. ${question.option_a}` }}</div>
        <div class="option_b option">{{ `B. ${question.option_b}` }}</div>
        <div class="option_c option">{{ `C. ${question.option_c}` }}</div>
        <div class="option_d option">{{ `D. ${question.option_d}` }}</div>
      </div>

      <div class="answer">
        <div class="userAnswer">
          {{ `用户答案: ${checkList[index] !== 'E' ? checkList[index] : '未选择'}` }}
        </div>
        <div class="rightAnswer">{{ `正确答案: ${question.answer}` }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
img {
  width: 30px;
  height: s30px;
}

img:hover {
  transform: scale(1.2);
}

.header {
  margin-top: 20px;
  margin-bottom: 50px;
}

.questionList {
  display: flex;
  flex-wrap: wrap;
}
.options {
  color: #707070;
  margin-left: 60px;

  .option {
    margin-bottom: 10px;
  }
}

.answer {
  margin-top: 20px;
  margin-left: 60px;
  .userAnswer {
    color: #2c2c2c;
    font-size: 17px;
    font-weight: bold;
  }

  .rightAnswer {
    margin-top: 10px;
    color: #4f68b0;
    font-size: 17px;
    font-weight: bold;
  }
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
</style>
