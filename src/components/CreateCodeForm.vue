<template>
  <div v-if="formState === 'create'" class="form-transition-wrapper">
    <div class="form-container__header">
      <div class="form-container__header__logo"></div>
      <h2 class="form-container__header__caption">
        {{ $t('createCodeForm.title') }}
      </h2>
      <p class="form-container__header__description text-grey">
        {{ $t('createCodeForm.description') }}
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
        :label="$t('createCodeForm.country.label')"
        prop="country"
      >
        <el-select
          filterable
          :placeholder="$t('createCodeForm.country.placeholder')"
          v-model="ruleForm.country"
          value-key="name"
          size="large"
          :no-match-text="$t('createCodeForm.country.noMatchText')"
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
          :placeholder="$t('createCodeForm.phone.placeholder')"
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
          {{ $t('createCodeForm.submit.label') }}
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
import isCustomError from '@/helpers/isCustomError'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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

const validatePhoneNumber = async (rule: any, value: string, callback: any) => {
  if (!value) {
    callback(new Error(t('createCodeForm.phone.emptyInputError')))
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
      callback(new Error(t('createCodeForm.phone.wrongPhoneNumber')))
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
