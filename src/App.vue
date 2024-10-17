<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import axios from 'axios'
import { ref, computed, reactive } from 'vue'
import CheckCodeForm from './components/CheckCodeForm.vue'
import CreateCodeForm from './components/CreateCodeForm.vue'

const formState = ref('create')
</script>

<template>
  <main class="window">
    <div class="form-container">
      <Transition name="slide-x">
        <create-code-form
          v-if="formState === 'create'"
          @change-to-check="formState = 'check'"
        ></create-code-form>
        <check-code-form
          @change-state="formState = 'create'"
          v-else-if="formState === 'check'"
        />
      </Transition>
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
