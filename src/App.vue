<script setup>
import { ref, onMounted, nextTick } from 'vue'
import socketService from "./services/socketService"
import UsernameModal from './components/UsernameModal.vue'

// Refs
const messageInput = ref('');
const messages = ref([]);
const messagesContainer = ref(null);
const showUsernameModal = ref(true);
const userCount = ref(0);

// Methods
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const sendMessage = () => {
  if (messageInput.value.trim()) {
    socketService.emit('message', messageInput.value)
    messageInput.value = ''
  }
}

const handleUsernameSubmit = (name) => {
  socketService.emit('username', name)
  showUsernameModal.value = false
}

const handleKeydown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

// Lifecycle
onMounted(() => {
  socketService.connect()

  socketService.on('userCount', (count) => {
    userCount.value = count
  })

  socketService.on('system', (msg) => {
    messages.value.push({
      type: "system",
      id: messages.value.length + 1,
      text: msg,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    })
    scrollToBottom()
  })

  socketService.on('message', (data) => {
    messages.value.push({
      id: messages.value.length + 1,
      user: data.username,
      text: data.msg,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    })
    scrollToBottom()
  })
})
</script>

<template>
  <div class="w-full h-screen flex items-center justify-center bg-gray-900">
    <div
      class="w-full h-full max-w-3xl max-h-screen md:max-h-[90vh] md:rounded-lg bg-gray-800 flex flex-col shadow-2xl">
      <!-- Header -->
      <div class="bg-gradient-to-r from-yellow-600 to-yellow-700 p-4 shadow-md">
        <h1 class="text-white text-2xl font-bold">Chat Room</h1>
        <p class="text-blue-100 text-sm">{{ userCount }} members online</p>
      </div>

      <!-- Messages Container -->
      <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-4 messages-container">
        <div v-for="msg in messages" :key="msg.id">
          
          <!-- System Messages (centered, gray, italic) -->
          <div v-if="msg.type === 'system'" class="flex justify-center py-1">
            <span class="text-gray-400 text-sm">{{ msg.text }}</span>
          </div>

          <!-- Regular Messages (with avatar and user info) -->
          <div v-else class="flex gap-3">
            <div class="flex-shrink-0">
              <div class="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
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
      </div>

      <!-- Input Area -->
      <div class="border-t border-gray-700 bg-gray-750 p-4">
        <div class="flex gap-2">
          <input v-model="messageInput" @keydown="handleKeydown" type="text" placeholder="Type a message..."
            class="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400" />
          <button @click="sendMessage"
            class="bg-yellow-600 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded-lg transition-colors">
            Send
          </button>
        </div>
      </div>
      <UsernameModal v-if="showUsernameModal" @submit="handleUsernameSubmit" />
    </div>
  </div>
</template>

<style>

.messages-container {
  scroll-behavior: smooth;
}

.flex-col-reverse {
  display: flex;
  flex-direction: column-reverse;
}
</style>