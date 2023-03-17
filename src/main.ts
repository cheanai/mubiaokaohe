import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import mitt from 'mitt'
//routes
import router from "./routes/index"; 
//pinia
import { createPinia } from 'pinia' 
const pinia = createPinia()

const app= createApp(App)

app.config.globalProperties.emitter = mitt() 
//pinia
app.use(pinia)
//routes 
app.use(router)  
app.use(ElementPlus)
app.mount('#app')