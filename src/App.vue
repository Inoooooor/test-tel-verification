<script setup lang="ts">
import { ref, computed } from 'vue'
import rawCountries from '../src/content/intelNumbers'

const currentCountry = ref({
  name: 'Russia',
  flag: '🇷🇺',
  code: 'RU',
  dial_code: '+7',
})
const countries = ref(rawCountries)
const phoneNumber = ref('')

const computedPhoneNumber = computed(
  () => currentCountry.value.dial_code + phoneNumber.value,
)
</script>

<template>
  <main class="window">
    <div class="form-container">
      <div class="form-container__header">
        <div class="form-container__header__logo"></div>
        <h2 class="form-container__header__caption">Введите номер телефона</h2>
        <p class="form-container__header__description">
          Чтобы войти или зарегистрироваться
        </p>
      </div>
      <el-form>
        <el-form-item label-position="top" label="Страна">
          <el-select
            filterable
            placeholder="Выберите страну"
            v-model="currentCountry"
            value-key="name"
            size="large"
            no-match-text="Ничего не найдено"
          >
            <el-option
              v-for="country in countries"
              :key="country.code"
              :label="country.name"
              :value="country"
            >
              <span style="float: left">{{ country.name }}</span>
              <span style="float: right">{{ country.dial_code }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input type="text" v-model="phoneNumber" size="large">
            <template #prepend>{{ currentCountry.dial_code }}</template>
          </el-input>
        </el-form-item>
        <p>{{ currentCountry }}</p>
        <p>{{ computedPhoneNumber }}</p>
      </el-form>
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
  background-color: antiquewhite;
  padding: 24px;
}

.form-container__header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
}

.form-container__header__logo {
  width: 300px;
  height: 40px;
  background-color: gray;
}

.form-item-heigth {
  height: 54px;
}
</style>
