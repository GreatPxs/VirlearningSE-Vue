<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <div class="robot">
    <img src="@/assets/robot.svg" alt="" />
  </div>
</template>

<style lang="scss" scoped>
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
