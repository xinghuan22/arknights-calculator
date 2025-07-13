import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'element-plus/theme-chalk/dark/css-vars.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'animate.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'vant/lib/index.css'
import { Popover, Button, FloatingBubble  } from 'vant'

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(router)
app.use(Popover)
app.use(Button)
app.use(FloatingBubble)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
