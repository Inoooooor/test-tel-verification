<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { ref, computed, reactive } from 'vue'
import rawCountries from '../src/content/intelNumbers'

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

const languages = [
  {
    value: 'ru',
    label: 'Русский',
  },
  {
    value: 'en',
    label: 'Английский',
  },
]

const currentLanguage = ref('ru')

function isCustomError(error: unknown): error is { status?: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

const validatePhoneNumber = async (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('Введите номер телефона'))
  }

  try {
    await axios.get(
      `https://api.kod.mobi/api/v1/message/create?phone=${computedPhoneNumber.value}`,
      { headers: { 'x-api-key': import.meta.env.VITE_API_KEY } },
    )
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
  })
}
</script>

<template>
  <main class="window">
    <div class="form-container">
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
            Submit
          </el-button>
        </el-form-item>
        <!-- 
        <p>{{ ruleForm.country }}</p>
        <p>{{ computedPhoneNumber }}</p> -->
      </el-form>
      <div class="form-container__footer text-grey">
        <el-select
          v-model="currentLanguage"
          value-key="value"
          style="width: 120px"
        >
          <el-option
            v-for="language in languages"
            :key="language.value"
            :value="language.value"
            :label="language.label"
          ></el-option>
        </el-select>
        <div>
          <span class="mr-24px cursor-pointer">Условия</span>
          <span class="cursor-pointer">Конфиденциальность</span>
        </div>
      </div>
    </div>
  </main>
</template>

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

.form-item-heigth {
  height: 54px;
}

.mb-40px {
  margin-bottom: 40px;
}

.mr-24px {
  margin-right: 24px;
}

.w-100 {
  width: 100%;
}

.form-container__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.text-grey {
  color: rgba(102, 102, 102, 1);
}

.cursor-pointer {
  cursor: pointer;
}

.form-container__form {
  width: 100%;
}
</style>
