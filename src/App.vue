<script setup>
    import {socketService} from '@/services/socketService'

    socketService.connect()
    socketService.on('message', (data) => {
        console.log("got")
    })
    socketService.emit('message', 'Hi')
</script>

<template>
  <div>
    <!-- Your chatroom UI here -->
  </div>
</template>

<style scoped>
</style>
