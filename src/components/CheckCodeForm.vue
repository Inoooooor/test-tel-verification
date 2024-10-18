<template>
  <div
    style="
      position: absolute;
      width: 90%;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    "
  >
    <div class="form-container__header">
      <div class="form-container__header__logo"></div>
      <h2 class="form-container__header__caption">
        {{ $t('verifyCodeForm.title') }}
      </h2>
      <p class="form-container__header__description text-grey">
        {{ $t('verifyCodeForm.description') }} {{ phoneNumber }}
      </p>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      class="form-container__form"
    >
      <el-form-item
        class="mb-40px"
        label-position="top"
        :label="$t('verifyCodeForm.codeChannel.label')"
        prop="currentMessanger"
      >
        <el-select v-model="ruleForm.currentMessanger" size="large">
          <el-option
            v-for="messanger in messangers"
            :key="messanger.label"
            :label="messanger.label"
            :value="messanger.value"
            style="display: flex; align-items: center"
          >
            <img
              style="width: 24px; margin-right: 10px"
              :src="messanger.imgSrc"
            />
            {{ messanger.label }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="mb-40px" prop="checkCode">
        <el-input
          :placeholder="$t('verifyCodeForm.code.label')"
          type="text"
          v-model="ruleForm.checkCode"
          size="large"
        >
          <template #append>
            <span v-if="isSend">0:{{ padStartTimer }}</span>
            <el-button v-else @click="resendCode">{{
              $t('verifyCodeForm.code.resendButton')
            }}</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button-group class="w-100">
          <el-button
            @click="$emit('changeState')"
            class="w-50"
            size="large"
            type=""
            :icon="ArrowLeft"
          >
            {{ $t('verifyCodeForm.navigate.back') }}
          </el-button>
          <el-button
            @click="submitForm(ruleFormRef)"
            class="w-50"
            size="large"
            type="primary"
          >
            {{ $t('verifyCodeForm.submit.label') }}
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <form-footer />
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { ref, computed, reactive } from 'vue'
import FormFooter from './FormFooter.vue'
import { ArrowLeft } from '@element-plus/icons-vue'
import isCustomError from '@/helpers/isCustomError'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  checkCode: '',
  currentMessanger: 'whatsapp',
})

const validateCheckCode = async (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error(t('verifyCodeForm.code.emptyInputError')))
    return
  }

  try {
    const sessionId = localStorage.getItem('session_id')
    const { data } = await axios.get(
      `https://api.kod.mobi/api/v1/message/check?session_id=${sessionId}&code=${ruleForm.checkCode}`,
      { headers: { 'x-api-key': import.meta.env.VITE_API_KEY } },
    )
    console.log(data.data.verify_token)
    callback()
  } catch (error: unknown) {
    console.log('error', error)
    if (
      isCustomError(error) &&
      error.response.data.sys_message === 'ERROR_MESSAGE_WRONG_CODE'
    ) {
      callback(new Error(t('verifyCodeForm.code.wrongCode')))
    }
    if (
      isCustomError(error) &&
      error.response.data.sys_message === 'ERROR_SESSION_EXPIRED'
    ) {
      callback(new Error(t('verifyCodeForm.code.expiredSessionError')))
    }
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  checkCode: [{ asyncValidator: validateCheckCode, trigger: 'blur' }],
})

const phoneNumber = ref(localStorage.getItem('phone_number'))

const isSend = ref(false)
const timerCount = ref(30)

const padStartTimer = computed(() => String(timerCount.value).padStart(2, '0'))

const messangers = [
  {
    label: 'WhatsApp',
    value: 'whatsapp',
    imgSrc: '/whatsapp.png',
  },
  {
    label: 'Telegram',
    value: 'telegram',
    imgSrc: '/telegram.png',
  },
  {
    label: 'SMS',
    value: 'sms',
    imgSrc: '/sms.png',
  },
]

const handleTimer = () => {
  isSend.value = true
  const timer = setInterval(() => {
    if (timerCount.value === 1) {
      clearInterval(timer)
      timerCount.value = 30
      isSend.value = false
    }

    timerCount.value--
  }, 1000)
}

const resendCode = async () => {
  handleTimer()

  const sessionId = localStorage.getItem('session_id')
  await axios.get(
    `https://api.kod.mobi/api/v1/message/send?session_id=${sessionId}&type=${ruleForm.currentMessanger}`,
    { headers: { 'x-api-key': import.meta.env.VITE_API_KEY } },
  )
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  formEl.validate(valid => {
    if (!valid) {
      return
    }
  })
}
</script>
<style scoped>
.form-container__header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-container__header__caption {
  font-size: 32px;
  margin: 0 0 14px 0;
}

.form-container__header__logo {
  width: 300px;
  height: 40px;
  background-color: rgba(248, 248, 248, 1);
  margin-bottom: 30px;
}

.form-container__form {
  width: 100%;
}

.slide-x-enter-active,
.slide-x-leave-active {
  transition: all 0.5s ease-out;
}

.slide-x-enter-from {
  opacity: 0;
  transform: translateX(500px);
}

.slide-x-leave-to {
  opacity: 0;
  transform: translateX(-500px);
}

.form-transition-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>
