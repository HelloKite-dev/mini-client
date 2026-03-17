아이디 입력 비밀번호 입력 로그인 버튼 로그인 성공하면 /posts 로 이동
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
  console.log('로그인 시도', form.value)
  if (!form.value.userId || !form.value.userPw) return

  try {
    const response = await loginApi({
      userId: form.value.userId,
      userPw: form.value.userPw,
    })
    userStore.setLogin(response.data)
    router.push('/posts')
  } catch (error) {
    alert('아이디와 비밀번호를 확인해주세요.')
  }
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
