import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mitt from 'mitt'
//pinia
import { createPinia } from 'pinia' 
import piniaPluginPersist from 'pinia-plugin-persist'
import axios from '@/api/axiosInstance.js'
//routes
import router from "./routes/index"; 
const pinia = createPinia()
pinia.use(piniaPluginPersist)
const app= createApp(App)

// 全局注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.config.globalProperties.emitter = mitt() 
//pinia
app.use(pinia)
//routes 
app.use(router)  
app.use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$axios=axios;  