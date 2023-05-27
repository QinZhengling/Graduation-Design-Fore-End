import {
    createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/font/font.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
axios.defaults.baseURL = 'http://localhost:8088';
import * as echarts from "echarts";
createApp(App).config.globalProperties.$echarts = echarts;
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    createApp(App).component(key, component)
}
createApp(App).use(store).use(router).use(ElementPlus).mount('#app')