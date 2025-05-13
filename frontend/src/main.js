
import { createApp } from 'vue'
import App from './App.vue'

// 1. 引入路由配置
import router from './router'

// 2. 引入Element Plus及其图标
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 3. 引入状态管理（可选）
// import { createPinia } from 'pinia'

const app = createApp(App)

// 4. 注册路由
app.use(router)

// 5. 注册Element Plus
app.use(ElementPlus)

// 6. 注册所有图标（必须）
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.mount('#app')