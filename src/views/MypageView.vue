<script setup>
import { getUserApi, updateUserPwApi } from '@/api/user.js'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user-store'

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const pwForm = ref({
  currentPw: '',
  newPw: '',
  confirmPw: '',
})

const user = ref({})

const fetchUser = async () => {
  const res = await getUserApi(route.params.userId)
  user.value = res.data
}

// 목록으로 이동
const goList = () => {
  router.push('/posts')
}

onMounted(() => {
  fetchUser()
})

const changePw = async () => {
  if (pwForm.value.newPw.length < 8) {
    alert('비밀번호는 8자리 이상 입력해주세요.')
    return
  }
  if (!pwForm.value.newPw === pwForm.value.confirmPw) {
    alert('새 비밀번호가 일치하지 않습니다.')
  }
  await updateUserPwApi({
    userId: userStore.userId,
    currentPw: pwForm.value.currentPw,
    newPw: pwForm.value.newPw,
  })

  alert('변경이 완료 되었습니다. 변경된 비밀번호로 다시 로그인 해주세요.')

  userStore.setLogout()
  router.push('/login')
}
</script>

<template>
  <div style="max-width: 900px; margin: 0 auto; padding: 16px">
    <div style="margin-bottom: 16px">
      <VBtn @click="goList" variant="text">← 홈으로</VBtn>
    </div>
    <VCard class="mb-4 pa-4">
      <VCardTitle>회원정보</VCardTitle>
      <VCardText>
        <VForm>
          <VRow>
            <VCol cols="2">이름</VCol>
            <VCol cols="3">{{ user.userNm }}</VCol>
          </VRow>
          <VRow>
            <VCol cols="2">닉네임</VCol>
            <VCol cols="3">{{ user.nickname }}</VCol>
          </VRow>
          <VRow>
            <VCol cols="2">아이디</VCol>
            <VCol cols="3">{{ user.userId }}</VCol>
          </VRow>
          <VRow v-if="userStore.userId === route.params.userId">
            <VCol cols="2">비밀번호</VCol>
            <VCol cols="3">
              <VTextField v-model="pwForm.currentPw" placeholder="기존 비밀번호"></VTextField>
              <VTextField v-model="pwForm.newPw" placeholder="새 비밀번호"></VTextField>
              <VTextField v-model="pwForm.confirmPw" placeholder="새 비밀번호 확인"></VTextField>
              <VBtn @click="changePw">저장</VBtn>
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="2">성별</VCol>
            <VCol cols="3">{{ user.gender }}</VCol>
          </VRow>
          <VRow>
            <VCol cols="2">생일</VCol>
            <VCol cols="3">{{ user.birth }}</VCol>
          </VRow>
          <VRow>
            <VCol cols="2">이메일</VCol>
            <VCol cols="3">{{ user.userEmail }}</VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
