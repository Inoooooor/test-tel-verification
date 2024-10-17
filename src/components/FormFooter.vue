<template>
  <div class="form-container__footer text-grey">
    <el-select
      v-model="currentLanguage"
      value-key="value"
      style="width: 120px"
      size="small"
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
</template>
<script setup lang="ts">
import { ref } from 'vue'

const currentLanguage = ref('ru')

const languages = [
  { value: 'ru', label: 'Русский' },
  { value: 'en', label: 'Английский' },
]
</script>
<style scoped>
.form-container__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 12px;
}
</style>
