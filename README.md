# Chat Room

A real-time chat application built with Vue, Node.js, Express, and Socket.IO.

**🔗 Live:** https://chatroom-35uw.onrender.com/

## Features

- Real-time messaging with Socket.IO
- User join/leave notifications
- Responsive Tailwind UI
- Username setting on join

## Quick Start

```bash
# Install dependencies
npm install

# Start backend server
node server.js

# Start frontend dev server
npm run dev

# Open http://localhost:5174
```

## Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: Vue 3, Vite
- **UI**: Tailwind CSS
- **State Management**: Vue Composition API (ref, onMounted)

## Project Structure

```
src/
  components/
    UsernameModal.vue    # Username input modal
  services/
    socketService.js     # Socket.IO wrapper
  App.vue               # Main chat component
  main.js              # Vue app entry
server.js              # Express + Socket.IO backend
```

## Deployment

Deployed on [Render](https://render.com/) with automatic scaling. Start command: `node server.js`

## Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `username` | Client → Server | User sets their username |
| `message` | Client ↔ Server | Send/receive chat messages |
| `system` | Server → All | Join/leave notifications |

## How It Works

1. **Frontend** emits `username` event when user joins
2. **Backend** broadcasts `system` event to all clients
3. **Frontend** sends `message` event when user types
4. **Backend** broadcasts message to all connected clients
5. **Frontend** receives and displays messages with auto-scroll

## Key Functions

- `socketService.emit()` - Send events to server
- `socketService.on()` - Listen for events from server
- `scrollToBottom()` - Auto-scroll chat on new messages
- `handleUsernameSubmit()` - Process username from modal
