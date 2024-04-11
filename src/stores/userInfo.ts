import { defineStore } from 'pinia'

export const useUserInfoStore = defineStore('userInfo', () => {
  //初始值
  const userIdJson = ref(0)
  const avatarJson = ref('')
  const passwordMd5Json = ref('')
  const nickNameJson = ref('')

  //计算属性
  const userId = computed(() => {
    return window.localStorage.getItem('userId') || userIdJson.value
  })
  //保存userId的方法
  function saveUserId(userIdInfo) {
    window.localStorage.setItem('userId', userIdInfo)
    userIdJson.value = userIdInfo
  }

  //计算属性
  const avatar = computed(() => {
    return window.localStorage.getItem('avatar') || avatarJson.value
  })
  //保存userId的方法
  function saveAvatar(avatarInfo) {
    window.localStorage.setItem('avatar', avatarInfo)
    avatarJson.value = avatarInfo
  }

  //计算属性
  const passwordMd5 = computed(() => {
    return window.localStorage.getItem('passwordMd5') || passwordMd5Json.value
  })
  //保存userId的方法
  function savepasswordMd5(passwordMd5Info) {
    window.localStorage.setItem('passwordMd5', passwordMd5Info)
    passwordMd5Json.value = passwordMd5Info
  }

  //计算属性
  const nickName = computed(() => {
    return window.localStorage.getItem('nickName') || nickNameJson.value
  })
  //保存nickName的方法
  function saveNickName(nickNameInfo) {
    window.localStorage.setItem('nickName', nickNameInfo)
    nickNameJson.value = nickNameInfo
  }

  return {
    userId,
    saveUserId,
    avatar,
    saveAvatar,
    passwordMd5,
    savepasswordMd5,
    nickName,
    saveNickName
  }
})
