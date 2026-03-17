// 로그인 하면 토큰이랑 유저 정보를 저장하고, 로그아웃하면 지우는 역할

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref(null)
  const userId = ref(null)
  const userNm = ref(null)

  function setLogin(loginData) {
    token.value = loginData.token
    userId.value = loginData.userId
    userNm.value = loginData.userNm
    localStorage.setItem('token', loginData.token)
  }

  function setLogout() {
    token.value = null
    userId.value = null
    userNm.value = null
    localStorage.removeItem('token')
  }

  const isLoggedIn = () => !!token.value

  return { token, userId, userNm, setLogin, setLogout, isLoggedIn }
})
