import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from './stores/user-store'

import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({ components, directives })

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)

// localStorage에서 유저 정보 복원
const userStore = useUserStore()
const token = localStorage.getItem('token')
if (token) {
  userStore.setLogin({
    token,
    userId: localStorage.getItem('userId'),
    userNm: localStorage.getItem('userNm'),
    nickname: localStorage.getItem('nickname'),
  })
}

app.mount('#app')
