<template>
  <div v-if="formState === 'create'" class="form-transition-wrapper">
    <div class="form-container__header">
      <div class="form-container__header__logo"></div>
      <h2 class="form-container__header__caption">Введите номер телефона</h2>
      <p class="form-container__header__description text-grey">
        Чтобы войти или зарегистрироваться
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
        label="Страна"
        prop="country"
      >
        <el-select
          filterable
          placeholder="Выберите страну"
          v-model="ruleForm.country"
          value-key="name"
          size="large"
          no-match-text="Ничего не найдено"
        >
          <el-option
            v-for="country in rawCountries"
            :key="country.code"
            :label="country.name"
            :value="country"
          >
            <span style="float: left"
              >{{ country.name }} ({{ country.code }})</span
            >
            <span style="float: right">{{ country.dial_code }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="mb-40px" prop="phoneNumber">
        <el-input
          placeholder="Номер телефона"
          type="text"
          v-model="ruleForm.phoneNumber"
          size="large"
        >
          <template #prepend>{{ ruleForm.country.dial_code }}</template>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          class="w-100 text-black"
          size="large"
          type="primary"
          @click="submitForm(ruleFormRef)"
        >
          Продолжить
        </el-button>
      </el-form-item>
    </el-form>
    <form-footer />
  </div>
</template>
<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { ref, computed, reactive } from 'vue'
import rawCountries from '../content/intelNumbers'
import FormFooter from './FormFooter.vue'

const emit = defineEmits(['changeToCheck'])

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  country: {
    name: 'Russia',
    flag: '🇷🇺',
    code: 'RU',
    dial_code: '+7',
  },
  phoneNumber: '',
})

const formState = ref('create')

function isCustomError(error: unknown): error is { status?: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

const validatePhoneNumber = async (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error('Введите номер телефона'))
  }

  try {
    const { data } = await axios.get(
      `https://api.kod.mobi/api/v1/message/create?phone=${computedPhoneNumber.value}`,
      { headers: { 'x-api-key': import.meta.env.VITE_API_KEY } },
    )
    localStorage.setItem('session_id', data.data.session_id)
    localStorage.setItem('phone_number', computedPhoneNumber.value)
    callback()
  } catch (error: unknown) {
    if (isCustomError(error) && error.status === 400) {
      callback(new Error('Введите корректный номер телефона'))
    }
  }
}

const rules = reactive<FormRules<typeof ruleForm>>({
  phoneNumber: [{ asyncValidator: validatePhoneNumber, trigger: 'blur' }],
})

const computedPhoneNumber = computed(
  () => ruleForm.country.dial_code + ruleForm.phoneNumber,
)

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(valid => {
    if (!valid) {
      return
    }
    emit('changeToCheck')
  })
}
</script>
<style scoped>
.window {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  width: 500px;
  height: 594px;
  padding: 24px;
  border: 1px rgba(223, 223, 223, 1) solid;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
}

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
