<template>
  <div class="form-container__footer text-grey">
    <el-select
      v-model="currentLanguage"
      value-key="value"
      style="width: 120px"
      size="small"
      @change="changeLocale"
    >
      <el-option value="ru" :label="$t('formFooter.langs.ru')"></el-option>
      <el-option value="en" :label="$t('formFooter.langs.en')"></el-option>
    </el-select>
    <div>
      <span class="mr-24px cursor-pointer">{{ t('formFooter.terms') }}</span>
      <span class="cursor-pointer">{{ t('formFooter.privacy') }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale, t } = useI18n()

const currentLanguage = ref('ru')

const changeLocale = () => {
  locale.value = currentLanguage.value
}
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
