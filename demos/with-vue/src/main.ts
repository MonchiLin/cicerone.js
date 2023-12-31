import { createApp } from 'vue'
import "./style.css"
import App from './app.vue'
import { createRouter, createWebHistory } from 'vue-router/auto'

const router = createRouter({
  history: createWebHistory(),
})

createApp(App)
  .use(router)
  .mount('#app')
