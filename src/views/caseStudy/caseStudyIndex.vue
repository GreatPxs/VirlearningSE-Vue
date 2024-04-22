<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

//病种数据
//传染病
const types1 = [
  '犬瘟热',
  '犬细小病毒',
  '犬传染性肝炎',
  '犬冠状病毒',
  '猫泛白细胞减少症',
  '猫病毒性病气管炎',
  '皮肤真菌感染'
]
//寄生虫病
const types2 = ['蛔虫病', '钩虫病', '绦虫病', '球虫病', '疥螨虫病', '蚤病']

//内科
const types3 = [
  '口炎',
  '肠炎',
  '肠便秘',
  '胰腺炎',
  '肝炎',
  '腹膜炎',
  '肛门腺炎',
  '感冒',
  '鼻炎',
  '气管支气管炎',
  '肺炎',
  '心力衰竭',
  '尿道感染',
  '尿结石',
  '膀胱炎',
  '肾炎',
  '佝偻病',
  '有机磷中毒',
  '糖尿病',
  '耳血肿',
  '中耳炎',
  '眼睑内翻',
  '结膜炎',
  '角膜炎'
]

//外产科疾病
const types4 = [
  '外伤',
  '外科感染',
  '骨折',
  '关节脱位',
  '湿疹',
  '皮炎',
  '脓皮病',
  '脱毛症',
  '趾间囊肿',
  '疝',
  '阴道炎',
  '阴道脱出',
  '子宫蓄脓',
  '难产',
  '乳房炎'
]

//常用手术
const types5 = ['绝育', '剖腹产', '瞬膜腺增生物切除', '眼球摘除', '立耳术', '断尾术']

//免疫
const types6 = ['犬', '猫免疫程序']
</script>

<template>
  <el-container class="card">
    <el-main class="content">
      <!-- 传染病 -->
      <div id="section1" class="section">
        <div class="title">传染病</div>
        <hr />
        <div class="types">
          <div
            v-for="(value, index) in types1"
            :key="index"
            @click="router.push({ name: 'caseList', params: { name: value } })"
          >
            {{ value }}
          </div>
        </div>
      </div>

      <!-- 寄生虫病 -->
      <div id="section2" class="section">
        <div class="title">寄生虫病</div>
        <hr />
        <div class="types">
          <div
            v-for="(value, index) in types2"
            :key="index"
            @click="router.push({ name: 'caseList', params: { name: value } })"
          >
            {{ value }}
          </div>
        </div>
      </div>

      <!-- 内科 -->
      <div id="section3" class="section">
        <div class="title">内科</div>
        <hr />
        <div class="types">
          <div
            v-for="(value, index) in types3"
            :key="index"
            @click="router.push({ name: 'caseList', params: { name: value } })"
          >
            {{ value }}
          </div>
        </div>
      </div>

      <!-- 外产科疾病 -->
      <div id="section4" class="section">
        <div class="title">外产科疾病</div>
        <hr />
        <div class="types">
          <div
            v-for="(value, index) in types4"
            :key="index"
            @click="router.push({ name: 'caseList', params: { name: value } })"
          >
            {{ value }}
          </div>
        </div>
      </div>

      <!-- 常用手术 -->
      <div id="section5" class="section">
        <div class="title">常用手术</div>
        <hr />
        <div class="types">
          <div
            v-for="(value, index) in types5"
            :key="index"
            @click="router.push({ name: 'caseList', params: { name: value } })"
          >
            {{ value }}
          </div>
        </div>
      </div>

      <!-- 免疫 -->
      <div id="section6" class="section">
        <div class="title">免疫</div>
        <hr />
        <div class="types">
          <div
            v-for="(value, index) in types6"
            :key="index"
            @click="router.push({ name: 'caseList', params: { name: value } })"
          >
            {{ value }}
          </div>
        </div>
      </div>
    </el-main>

    <el-aside class="navigation">
      <a href="#section1" class="nav-link">传染病</a>
      <a href="#section2" class="nav-link">寄生虫病</a>
      <a href="#section3" class="nav-link">内科</a>
      <a href="#section4" class="nav-link">外产科疾病</a>
      <a href="#section5" class="nav-link">常用手术</a>
      <a href="#section6" class="nav-link">免疫</a>
    </el-aside>
  </el-container>
</template>

<style lang="scss" scoped>
hr {
  margin-top: 10px;
  margin-bottom: 5px;

  width: 1080px;
}

a {
  text-decoration: none;
  color: #fff;
}

.text {
  font-size: 14px;
}

.el-step {
  cursor: pointer;
}

.card {
  background-color: #fff;
  .navigation {
    position: fixed;
    right: 50px;

    .nav-link {
      padding: 10px;
      width: 30px;
      height: 88px;
      text-align: center;

      background-color: #6ea4ed;
      margin-top: 5px;

      display: flex;
      align-items: center;
      flex-direction: row;
    }

    .nav-link:hover {
      background-color: #03479f;
    }
  }

  .content {
    .section {
      margin-bottom: 20px;
      .title {
        font-size: 20px;
        font-weight: bold;
        color: #0698cf;
      }

      .types {
        div {
          display: inline-block;

          width: 300px;
          padding: 15px;
          margin-right: 40px;
          margin-bottom: 10px;
          background-color: #fff;
          color: #0061b2;

          text-align: center;

          box-shadow: 1px 1px 1px #e6f4fb;

          border: 2px solid #c1e3f4;
        }

        div:hover {
          background-color: #ffb400;
        }
      }
    }
  }
}
</style>
