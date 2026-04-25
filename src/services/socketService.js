import { io } from 'socket.io-client'

let socket = null

export const socketService = {
  connect() {
    socket = io()
    return socket
  },

  disconnect() {
    if (socket) {
      socket.disconnect()
    }
  },

  emit(event, data) {
    if (socket) {
      socket.emit(event, data)
    }
  },

  on(event, callback) {
    if (socket) {
      socket.on(event, callback)
    }
  },

  off(event, callback) {
    if (socket) {
      socket.off(event, callback)
    }
  }
}
