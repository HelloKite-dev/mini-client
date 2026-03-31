<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { resetUserPwApi } from '@/api/user.js'

const router = useRouter()

const conditions = reactive({
  userId: '',
  userEmail: '',
})

// 목록으로 이동
const goLogin = () => {
  router.push('/login')
}

const password = async () => {
  try {
    const res = await resetUserPwApi({
      userId: conditions.userId,
      userEmail: conditions.userEmail,
    })

    if (!res.data) {
      alert('일치하는 사용자가 없습니다.')
      return
    }

    alert('변경된 비밀번호는 ' + res.data + ' 입니다. 로그인 후 비밀번호를 변경해주세요.')
    goLogin()
  } catch (e) {
    alert('일치하는 사용자가 없습니다.')
  }
}
</script>

<template>
  <div style="max-width: 900px; margin: 0 auto; padding: 16px">
    <div style="margin-bottom: 16px">
      <VBtn @click="goLogin" variant="text">← 홈으로</VBtn>
    </div>
    <VCard class="mb-4 pa-4">
      <VCardTitle>비밀번호 찾기</VCardTitle>
      <VCardText>
        <VForm>
          <VRow>
            <VCol cols="2">아이디</VCol>
            <VCol cols="3"><VTextField v-model="conditions.userId"></VTextField></VCol>
          </VRow>
          <VRow>
            <VCol cols="2">이메일</VCol>
            <VCol cols="3"><VTextField v-model="conditions.userEmail"></VTextField></VCol>
            <VBtn @click="password">찾기</VBtn>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
