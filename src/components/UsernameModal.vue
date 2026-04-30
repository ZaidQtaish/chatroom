<script setup>
import { ref } from 'vue'

const username = ref('')

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  if (username.value.trim()) {
    emit('submit', username.value)
    username.value = ''
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-gray-800 p-6 rounded-lg shadow-xl">
      <h2 class="text-white text-xl font-bold mb-4">Enter Username</h2>
      <input 
        v-model="username"
        type="text" 
        placeholder="Your name..."
        class="w-full bg-gray-700 text-white px-3 py-2 rounded mb-4"
        @keydown.enter="handleSubmit"
      />
      <button 
        @click="handleSubmit"
        class="w-full bg-yellow-600 hover:bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Join Chat
      </button>
    </div>
  </div>
</template>