<script setup lang="ts">
import { ref } from 'vue'
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
</style>
