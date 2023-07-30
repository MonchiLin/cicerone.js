import {createApp} from 'vue'
import "./style.css"
import App from './app.vue'
import {createRouter, createWebHistory} from 'vue-router/auto'
import {CiceroneGlobal} from "cicerone.js";
import {BSPopover} from "cicerone.js/bs-popover";
import "cicerone.js/dist/style.css";

CiceroneGlobal.popoverFactory = () => new BSPopover({
  title: "Hello",
  content: "World",
})

const router = createRouter({
  history: createWebHistory(),
})

createApp(App)
  .use(router)
  .mount('#app')
