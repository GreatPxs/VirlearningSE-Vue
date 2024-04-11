<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { getRoomByRole } from '@/api/rolePage/getRoomByRole'

const route = useRoute()
const router = useRouter()

//角色名称
const roleInfo = ref({
  roleName: '',
  roleIcon: '',
  flowChart: ''
})
onBeforeMount(() => {
  roleInfo.value.roleName = route.params.role.toString()
  console.log(roleInfo.value.roleName)

  if (roleInfo.value.roleName === '前台') {
    roleInfo.value.roleIcon = getImg('reception.svg')
    roleInfo.value.flowChart = getImg('qiantai_role.png')
  } else if (roleInfo.value.roleName === '医助') {
    roleInfo.value.roleIcon = getImg('assistance.svg')
    roleInfo.value.flowChart = getImg('yizhu_role.png')
  } else if (roleInfo.value.roleName === '兽医') {
    roleInfo.value.roleIcon = getImg('veterinary.svg')
    roleInfo.value.flowChart = getImg('shouyi_role.png')
  } else {
    router.push({ name: 'chooseRole' })
  }
})
onMounted(() => {
  getRoomInfoByRole()
})

const getImg = (name) => {
  return `/src/assets/${name}`
}

const deptInfo = ref([
  {
    roomName: '诊室',
    usage:
      '包括诊室的布局介绍；对宠物进行临床基本检查（视、听、触、嗅等）、疾病诊断；与宠物主人交流并根据情况开具处方。',
    roomImg: getImg('overview.png')
  },
  {
    roomName: '免疫室',
    usage: '包括为健康宠物接种疫苗的流程，对常见并发症的处理流程，对常见免疫相关问题的解答等。',
    roomImg: getImg('overview.png')
  },
  {
    roomName: '化验室',
    usage:
      '包括对送检样本的预处理，对相应样本进行血常规、血液生化、电解质、血气、血凝指标、激素指标、尿常规、微生物学检查、药敏、皮肤刮片、粪便检查、传染病检查等检查操作流程。',
    roomImg: getImg('overview.png')
  },
  {
    roomName: '影像室',
    usage:
      '包括X线检查、B超检查以及CT、MRI检查。如X线检查：X光机的结构功能介绍、全身各部位的摆位、拍摄条件的选择、拍摄流程、洗片的操作流程。B超检查：扫查探头的选择、全身各个部位扫查的摆位、腹部扫查流程。',
    roomImg: getImg('overview.png')
  },
  {
    roomName: '专科检查室',
    usage:
      '包括对眼科、骨科、神经科、心脏科等专科疾病的检查，如眼科（检眼镜检查、眼压检查、裂隙灯检查、眼底检查、泪液分泌量检查等）、心脏科检查（心脏听诊、心电图检查等）、神经学检查（步态检查、各种反射检查等）等。',
    roomImg: getImg('overview.png')
  }
])

const getRoomInfoByRole = async () => {
  const data = await getRoomByRole(roleInfo.value.roleName).then((res) => {
    console.log(res)
    //获取失败
    if (res.data.resultCode !== 200) {
      ElMessage.error('获取角色所在科室信息失败')

      //打印数据
      console.log(res.data)

      throw new Error('获取角色所在科室信息失败')
    }
    //获取成功

    console.log(res.data)
    return res.data
  })

  deptInfo.value = data.data
}

const currentSection = ref(1)
</script>

<template>
  <div>
    <div class="header">
      <img src="@/assets/return.svg" class="return" @click="router.push({ name: 'chooseRole' })" />
      <img :src="roleInfo.roleIcon" />
      <div class="title">
        <div>职能扮演角色选择</div>
        <div class="icon">|</div>
        <div>{{ roleInfo.roleName }}</div>
      </div>
    </div>

    <div class="content">
      <div class="top">
        <el-button color="#626aef" size="large" @click="currentSection = 1">工作流程</el-button>
        <el-button color="#626aef" size="large" @click="currentSection = 2">岗位职责</el-button>
        <el-button color="#626aef" size="large" @click="currentSection = 3">模拟操作</el-button>
      </div>
      <div class="down">
        <div class="workflow" v-show="currentSection === 1">
          <el-scrollbar>
            <img :src="roleInfo.flowChart" />
          </el-scrollbar>
        </div>

        <div class="responsibility" v-show="currentSection === 2">
          <el-scrollbar>
            <el-table :data="deptInfo" border style="width: 100%">
              <el-table-column prop="name" label="科室" width="130" />
              <el-table-column prop="dep_inf" label="岗位职责" />
              <el-table-column prop="fileurl" label="科室照片" width="180">
                <template #default="scope">
                  <el-image style="width: 155px" :src="scope.row.fileurl" fit="fill"> </el-image>
                </template>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>

        <div class="operation" v-show="currentSection === 3">
          <el-scrollbar>
            <el-table :data="deptInfo" border style="width: 100%">
              <el-table-column prop="name" label="科室" width="130" />
              <el-table-column prop="dep_inf" label="岗位职责" />
              <el-table-column label="操作" align="center" v-slot="{}" width="150">
                <el-button type="primary">进入科室</el-button>
              </el-table-column>
            </el-table>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 5px;

  img {
    width: 50px;
    height: 50px;
    margin-right: 30px;
  }

  .return {
    margin-right: 80px;
  }

  .title {
    display: flex;
    font-size: 20px;
    font-weight: bold;

    color: #2c2c2c;

    .icon {
      margin-left: 20px;
      margin-right: 20px;
    }
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: bold;
}

.content {
  width: 80%;
  height: 600px;
  margin: auto;

  background-color: #96a9c0;

  border-radius: 20px;
  border: 5px solid #fff;

  .top {
    height: 10%;
    border-bottom: 2px solid #fff;

    display: flex;
    align-items: center;
    justify-content: space-around;

    .el-button {
      font-weight: bold;
    }
  }

  .down {
    width: 100%;
    height: 85%;
    background-color: #fff;

    .workflow {
      width: 100%;
      height: 100%;
      overflow: auto;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .responsibility {
      width: 100%;
      height: 100%;
      overflow: auto;

      .el-table {
        height: auto;
        display: block;
      }
    }

    .operation {
      width: 100%;
      height: 100%;
      overflow: auto;

      .el-table {
        height: auto;
        display: block;
      }
    }
  }
}
</style>
