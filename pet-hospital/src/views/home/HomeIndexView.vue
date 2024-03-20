<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="main">
    <div class="row firstLine">
      <div>
        <img src="@/assets/room.png" alt="" />
        <p>医院导览</p>
      </div>

      <div>
        <img src="@/assets/overview.png" alt="" />
        <p>职能扮演</p>
      </div>
    </div>

    <div class="row">
      <div>
        <img src="@/assets/casestudy.png" alt="" />
        <p>病例学习</p>
      </div>

      <div @click="router.push({ name: 'testInfo' })">
        <img src="@/assets/test.png" alt="" />
        <p>试题测试</p>
      </div>
    </div>
  </div>

  <div class="robot">
    <img src="@/assets/robot.svg" alt="" />
  </div>
</template>

<style lang="scss" scoped>
.main {
  height: 100vh;
}

.row {
  display: flex;
  justify-content: space-evenly;

  div {
    position: relative;
    & img {
      width: 300px;
      height: 200px;
      border-radius: 20px;
      border: 2px solid black;

      //添加过渡效果
      transition: transform 0.3s ease;
    }

    & p {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 170px;
    }
  }

  div:hover img {
    transform: scale(1.2);
  }
}

.firstLine {
  margin-top: 100px;

  margin-bottom: 40px;
}

.robot {
  width: 100px;
  height: 100px;
  position: fixed;
  right: 40px;
  bottom: 40px;
  background-color: #dbdbdb;
  border-radius: 50%;
  border: 2px solid #8a8a8a;

  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 70px;
    height: 70px;
  }
}
</style>
