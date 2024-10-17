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
      <h2 class="form-container__header__caption">Введите код</h2>
      <p class="form-container__header__description text-grey">
        Отправлен по номеру {{ phoneNumber }}
      </p>
    </div>
    <el-form ref="ruleFormRef" class="form-container__form">
      <el-form-item
        class="mb-40px"
        label-position="top"
        label="Способ получения кода"
        prop="country"
      >
        <el-select
          placeholder="Выберите мессенджер"
          v-model="currentMessanger"
          size="large"
        >
          <el-option
            v-for="messanger in messangers"
            :key="messanger"
            :label="messanger"
            :value="messanger"
          >
            {{ messanger }}
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="mb-40px" prop="phoneNumber">
        <el-input
          placeholder="Введите код"
          type="text"
          v-model="checkCode"
          size="large"
        >
          <template #append>
            <span v-if="isSend">0:{{ padStartTimer }}</span>
            <el-button v-else @click="startTimer">Отправить</el-button>
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
            Назад
          </el-button>
          <el-button class="w-50" size="large" type="primary">
            Продолжить
          </el-button>
        </el-button-group>
      </el-form-item>
    </el-form>
    <!-- <button @click="formState = 'create'">Вернуться</button> -->
    <form-footer />
  </div>
</template>
<script setup lang="ts">
import type { FormInstance } from 'element-plus'
import axios from 'axios'
import { ref, computed, reactive } from 'vue'
import FormFooter from './FormFooter.vue'
import { ArrowLeft } from '@element-plus/icons-vue'

const phoneNumber = ref(localStorage.getItem('phone_number'))

const isSend = ref(false)
const timerCount = ref(30)

const padStartTimer = computed(() => {
  return String(timerCount.value).padStart(2, '0')
})

const checkCode = ref('')

const messangers = ['Telegram', 'WhatsApp']
const currentMessanger = ref('WhatsApp')

const startTimer = () => {
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

const submitForm = async (formEl: FormInstance | undefined) => {
  // formState.value = 'check'
  if (!formEl) return
  formEl.validate(valid => {
    if (!valid) {
      return
    }
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
