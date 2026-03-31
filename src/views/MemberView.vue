<script setup>
import { memberApi, checkUserIdApi, checkNicknameApi, checkUserEmailApi } from '@/api/user.js'
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

// 중복체크 여부
const isUserIdChecked = ref(false)
const isNicknameChecked = ref(false)
const isEmailChecked = ref(false)

const conditions = reactive({
  userId: '',
  userPw: '',
  userNm: '',
  nickname: '',
  gender: '',
  birth: '',
  userEmail: '',
})

const goMain = () => {
  router.push('/login')
}

const fnSave = async () => {
  if (!conditions.userId) {
    alert('아이디를 입력해주세요.')
    return
  }
  if (!conditions.userPw) {
    alert('비밀번호를 입력해주세요.')
    return
  }
  if (!conditions.userNm) {
    alert('이름을 입력해주세요.')
    return
  }
  if (!conditions.nickname) {
    alert('닉네임을 입력해주세요.')
    return
  }
  if (!conditions.gender) {
    alert('성별을 선택해주세요.')
    return
  }
  if (!conditions.birth) {
    alert('생일을 입력해주세요.')
    return
  }
  if (!conditions.userEmail) {
    alert('이메일을 입력해주세요.')
    return
  }
  if (!isUserIdChecked.value) {
    alert('아이디 중복확인을 해주세요.')
    return
  }
  if (!isNicknameChecked.value) {
    alert('닉네임 중복확인을 해주세요.')
    return
  }
  if (!isEmailChecked.value) {
    alert('이메일 중복확인을 해주세요.')
    return
  }
  if (conditions.userPw.length < 8) {
    alert('비밀번호는 8자리 이상 입력해주세요.')
    return
  }

  await memberApi({
    userId: conditions.userId,
    userPw: conditions.userPw,
    userNm: conditions.userNm,
    nickname: conditions.nickname,
    gender: conditions.gender,
    birth: conditions.birth,
    userEmail: conditions.userEmail,
  })

  alert('가입이 완료되었습니다.')
  goMain()
}

// 아이디 중복 확인
const checkUserId = async () => {
  const res = await checkUserIdApi(conditions.userId)
  if (res.data) {
    alert('이미 사용중인 아이디입니다.')
  } else {
    alert('사용 가능한 아이디입니다.')
    isUserIdChecked.value = true
  }
}

// 닉네임 중복 확인
const checkNickname = async () => {
  console.log('닉네임', conditions.nickname)
  const res = await checkNicknameApi(conditions.nickname)
  if (res.data) {
    alert('이미 사용중인 닉네임입니다.')
  } else {
    alert('사용 가능한 닉네임입니다.')
    isNicknameChecked.value = true
  }
}

// 이메일 중복 확인
const checkUserEmail = async () => {
  console.log('닉네임', conditions.userEmail)
  const res = await checkUserEmailApi(conditions.userEmail)
  if (res.data) {
    alert('이미 사용중인 이메일입니다.')
  } else {
    alert('사용 가능한 이메일입니다.')
    isEmailChecked.value = true
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
    <VCard class="mb-4 pa-4">
      <VCardTitle>회원가입</VCardTitle>
      <VCardText>
        <VForm @submit.prevent>
          <VRow>
            <VTextField
              label="아이디"
              v-model="conditions.userId"
              placeholder="영어로 입력해주세요"
              @input="conditions.userId = conditions.userId.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')"
            />
            <VBtn @click="checkUserId">중복확인</VBtn>
            <VTextField
              label="비밀번호"
              v-model="conditions.userPw"
              placeholder="8자리 이상 입력하세요"
              @input="conditions.userPw = conditions.userPw.replace(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g, '')"
            />
          </VRow>
          <VRow>
            <VTextField label="이름" v-model="conditions.userNm" userPw />
            <VTextField label="닉네임" v-model="conditions.nickname" />
            <VBtn @click="checkNickname">중복확인</VBtn>
          </VRow>
          <VRow>
            <VRadioGroup v-model="conditions.gender" label="성별" inline>
              <VRadio label="남" value="M"> </VRadio>
              <VRadio label="여" value="F"> </VRadio>
            </VRadioGroup>
            <VTextField label="생일" v-model="conditions.birth" type="date" />
          </VRow>
          <VRow>
            <VTextField label="이메일" v-model="conditions.userEmail" :rules="[rules.userEmail]" />
            <VBtn @click="checkUserEmail">중복확인</VBtn>
          </VRow>
          <div style="margin-bottom: 16px">
            <VBtn @click="fnSave" variant="text">저장</VBtn>
            <VBtn @click="goMain" variant="text" color="red">취소</VBtn>
          </div>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>
