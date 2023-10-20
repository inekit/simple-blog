import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'

import axios from 'axios'
const myApi = axios.create({
  withCredentials: true,
})

store.state.myApi = myApi

import eventBus from './eventBus'

eventBus.$on('noresponse', (error) => {
  if (error.response) {
    console.log(error.response.data)
    console.log(error.response.status)
    if (error.response?.data?.isAutenticated === false)
      return router.push('/login')

    alert(
      'Сервер не отвечает. Код ошибки: ' +
        (error.response.status != 0 ? error.response.status : 404),
    )
  } else alert('Сервер не отвечает')
})

eventBus.$on('wrongInputData', () => {
  alert('Некорректно введенные данные')
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.provide('icons', icons)
app.component('CIcon', CIcon)

app.mount('#app')
