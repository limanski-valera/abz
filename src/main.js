import './assets/css/main.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { tooltip } from '@ionited/tooltip-vue'

const app = createApp(App)

app.use(createPinia())
app.directive('tooltip', tooltip)

app.mount('#app')
