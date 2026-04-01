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

const rules = {
  userEmail: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'E-mail 형식이 맞지 않습니다.'
  },
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
            <VCol cols="6">
              <VTextField
                label="아이디"
                v-model="conditions.userId"
                placeholder="영어로 입력해주세요"
                @input="conditions.userId = conditions.userId.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')"
              />
            </VCol>
          </VRow>
          <VRow>
            <VCol cols="6">
              <VTextField
                label="이메일"
                v-model="conditions.userEmail"
                :rules="[rules.userEmail]"
              />
            </VCol>
            <VBtn @click="password">찾기</VBtn>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
