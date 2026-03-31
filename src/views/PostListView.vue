<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user-store'
import { getPostsApi } from '@/api/post.js'

const router = useRouter()
const userStore = useUserStore()
const postList = ref([])

const fnSearch = async () => {
  try {
    const res = await getPostsApi()
    postList.value = res.data
  } catch (e) {
    alert(e?.message)
  }
}

const goDetail = (id) => {
  router.push(`/posts/${id}`)
}

const goWrite = () => {
  router.push('/posts/form')
}

const goMypage = () => {
  router.push(`/mypage/${userStore.userId}`)
}

const goLogin = () => {
  userStore.setLogout()
  router.push(`/login`)
}

// 날짜 양식
const formatDate = (dateStr) => {
  if (!dateStr) return ''
  return dateStr.substring(0, 10).replace('T', ' ')
}

onMounted(() => {
  fnSearch()
})
</script>

<template>
  <div style="max-width: 1200px; margin: 0 auto; padding: 16px">
    <!-- 상단 헤더 -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px">
      <h2>mini 게시판</h2>
      <div class="author" @click="goMypage">{{ userStore.nickname }} 님</div>
    </div>

    <!-- 게시글 작성 버튼 -->
    <div style="display: flex; justify-content: flex-end; padding: 0 0 20px">
      <VBtn @click="goLogin">로그아웃</VBtn>
      <VBtn @click="goWrite">글쓰기</VBtn>
    </div>

    <!-- 게시글 목록 -->
    <VTable>
      <thead>
        <tr>
          <th style="width: 80px">번호</th>
          <th style="width: 250px">제목</th>
          <th style="width: 120px">작성자</th>
          <th style="width: 80px">조회수</th>
          <th style="width: 80px">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(post, index) in postList"
          :key="post.id"
          @click="goDetail(post.id)"
          style="cursor: pointer"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.nickname }}</td>
          <td>{{ post.viewCount }}</td>
          <td>{{ formatDate(post.regDt) }}</td>
        </tr>
      </tbody>
    </VTable>
  </div>
</template>
<style scoped>
table th,
td {
  text-align: center;
}
table,
th,
td {
  border: 1px solid #ddd;
  border-collapse: collapse;
}
.author {
  cursor: pointer;
}
.author:hover {
  font-weight: bolder;
  text-decoration: underline;
}
</style>
