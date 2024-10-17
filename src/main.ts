import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

const app = createApp(App)

const i18n = createI18n({
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world',
      },
    },
    ru: {
      message: {
        hello: 'Привет мир',
      },
    },
  },
})

app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
