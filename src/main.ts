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
      verifyCodeForm: {
        title: 'Enter code',
        description: 'Sent by number',
        codeChannel: { label: 'Code receiving method' },
        code: {
          label: 'Enter code',
          resendButton: 'Send',
          emptyInputError: 'Enter code',
          wrongCode: 'Code entered incorrectly',
          expiredSessionError: 'Session expired. Enter phone number again',
        },
        submit: { label: 'Continue' },
        navigate: { back: 'Back' },
      },
      formFooter: {
        langs: {
          ru: 'Russian',
          en: 'English',
        },
        terms: 'Terms',
        privacy: 'Privacy',
      },
    },
    ru: {
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
        submit: { label: 'Продолжить' },
      },
      verifyCodeForm: {
        title: 'Введите код',
        description: 'Отправлен по номеру',
        codeChannel: { label: 'Способ получения кода' },
        code: {
          label: 'Введите код',
          resendButton: 'Отправить',
          emptyInputError: 'Введите код',
          wrongCode: 'Код введён неверно',
          expiredSessionError: 'Сессия устарела. Укажите номер телефона заново',
        },
        submit: { label: 'Продолжить' },
        navigate: { back: 'Назад' },
      },
      formFooter: {
        langs: {
          ru: 'Русский',
          en: 'Английский',
        },
        terms: 'Условия',
        privacy: 'Конфиденциальность',
      },
    },
  },
})

app.use(ElementPlus)
app.use(i18n)
app.mount('#app')
