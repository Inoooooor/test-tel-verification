import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

const app = createApp(App)

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world',
      },
      createCodeForm: {
        title: 'Enter your phone number',
        description: 'To sign in or register',
        country: {
          label: 'Country',
          noMatchText: 'No match found',
          placeholder: 'Select a country',
        },
        phone: {
          label: 'Phone number',
          placeholder: 'Phone number',
          emptyInputError: 'Enter your phone number',
          wrongPhoneNumber: 'Enter a valid phone number',
        },
        submit: {
          label: 'Continue',
        },
      },
    },
    ru: {
      message: {
        hello: 'Привет мир',
      },
      createCodeForm: {
        title: 'Введите номер телефона',
        description: 'Чтобы войти или зарегистрироваться',
        country: {
          label: 'Страна',
          noMatchText: 'Ничего не найдено',
          placeholder: 'Выберите страну',
        },
        phone: {
          label: 'Номер телефона',
          placeholder: 'Номер телефона',
          emptyInputError: 'Введите номер телефона',
          wrongPhoneNumber: 'Введите корректный номер телефона',
        },
        submit: {
          label: 'Продолжить',
        },
      },
    },
  },
})

app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
