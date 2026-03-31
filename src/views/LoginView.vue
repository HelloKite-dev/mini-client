<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user-store'
import { loginApi } from '@/api/user.js'

const router = useRouter()
const userStore = useUserStore()

const form = ref({
  userId: '',
  userPw: '',
  remember: false,
})

const login = async () => {
  if (!form.value.userId) {
    alert('아이디를 입력해주세요.')
    return
  }
  if (!form.value.userPw) {
    alert('비밀번호를 입력해주세요.')
    return
  }
  try {
    const res = await loginApi({
      userId: form.value.userId,
      userPw: form.value.userPw,
    })
    userStore.setLogin(res.data)
    router.push('/posts')
  } catch (error) {
    alert('아이디와 비밀번호를 확인해주세요.')
  }
}

const member = () => {
  router.push('/member')
}

const password = () => {
  router.push('password')
}
</script>

<template>
  <div style="display: flex; height: 100vh; align-items: center; justify-content: center">
    <VCard :max-width="500" class="w-100 pa-4">
      <VCardTitle class="text-center text-h5 mb-4">mini 게시판</VCardTitle>
      <VCardText>
        <VForm>
          <VRow>
            <VCol>
              <VTextField v-model="form.userId" required label="ID" />
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VTextField v-model="form.userPw" required label="PW" type="password" />
              <div style="display: flex; justify-content: space-between">
                <a @click="password" style="cursor: pointer; text-decoration: underline"
                  >비밀번호 찾기</a
                >
                <a @click="member" style="cursor: pointer; text-decoration: underline">회원가입</a>
              </div>
            </VCol>
          </VRow>
          <VRow>
            <VCol>
              <VBtn @click="login" block>Log in</VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
