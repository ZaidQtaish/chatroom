<script setup>
import { ref } from 'vue'

const messages = ref([
  { id: 1, user: 'Alice', text: 'Hey, how are you?', timestamp: '10:30' },
  { id: 2, user: 'You', text: 'I\'m doing great!', timestamp: '10:31' },
  { id: 3, user: 'Alice', text: 'That\'s awesome!', timestamp: '10:32' }
])
const messageInput = ref('')

const sendMessage = () => {
  if (messageInput.value.trim()) {
    messages.value.push({
      id: messages.value.length + 1,
      user: 'You',
      text: messageInput.value,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    })
    messageInput.value = ''
  }
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center bg-gray-900">
    <div class="w-full h-full max-w-2xl max-h-screen md:max-h-[90vh] md:rounded-lg bg-gray-800 flex flex-col shadow-2xl">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-4 shadow-md">
        <h1 class="text-white text-2xl font-bold">Chat Room</h1>
        <p class="text-blue-100 text-sm">3 members online</p>
      </div>

      <!-- Messages Container -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="msg in messages" :key="msg.id" class="flex gap-3">
          <div class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span class="text-white text-xs font-bold">{{ msg.user[0] }}</span>
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-baseline gap-2">
              <span class="text-white font-semibold">{{ msg.user }}</span>
              <span class="text-gray-400 text-xs">{{ msg.timestamp }}</span>
            </div>
            <p class="text-gray-300 mt-1">{{ msg.text }}</p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="border-t border-gray-700 bg-gray-750 p-4">
        <div class="flex gap-2">
          <input
            v-model="messageInput"
            @keydown="handleKeydown"
            type="text"
            placeholder="Type a message..."
            class="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          />
          <button
            @click="sendMessage"
            class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: rgb(31, 41, 55);
}

::-webkit-scrollbar-thumb {
  background: rgb(75, 85, 99);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgb(107, 114, 128);
}
</style>