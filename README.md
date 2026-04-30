# Chat Room

A real-time chat application built with Vue, Node.js, Express, and Socket.IO.

**🔗 Live:** https://chatroom-35uw.onrender.com/

## Features

- ✨ Real-time messaging with Socket.IO
- 👥 Live member count
- 📢 System notifications for join/leave events
- 📝 Username modal dialog on entry
- 🎨 Responsive Tailwind CSS UI

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
| `username` | Client → Server | User sets their username on join |
| `message` | Client ↔ Server | Send/receive chat messages |
| `system` | Server → All | Broadcast join/leave notifications |
| `userCount` | Server → All | Update live member count |

## How It Works

### Connection Flow
1. Frontend opens, shows **UsernameModal** asking for username
2. User enters name and submits modal
3. Frontend emits `username` event to backend
4. Backend increments `userCount` and broadcasts it to all clients
5. Backend broadcasts `system` event announcing user joined
6. All clients update display with new member count and system message

### Message Flow
1. User types message and presses Enter or clicks Send
2. Frontend emits `message` event with text
3. Backend broadcasts `message` to all connected clients
4. All clients receive and display the message
5. Auto-scroll brings new messages into view

### Disconnect Flow
1. User closes tab/browser
2. Backend detects disconnect
3. If username was set, broadcasts `system` message about user leaving
4. Backend decrements `userCount` and broadcasts it
5. All clients update member count

## Key Implementation Details

- **userCount** is a server-side counter that increments on connection and decrements on disconnect
- **System messages** have `type: "system"` and render centered/italicized, separate from regular messages
- **UsernameModal** blocks chat until username is submitted
- **Auto-scroll** uses `nextTick()` to wait for DOM updates before scrolling
- **Conditional disconnect messages** only broadcast if user set a username

## Key Functions

### Frontend (App.vue)
- `scrollToBottom()` - Auto-scrolls chat to latest message using `nextTick()`
- `sendMessage()` - Emits message event with text content
- `handleUsernameSubmit()` - Processes username from modal and emits to server
- `handleKeydown()` - Detects Enter key to send messages
- Socket listeners for `userCount`, `system`, `message` events

### Backend (server.js)
- Connection handler - Increments userCount, broadcasts update
- Username handler - Stores username on socket, announces in chat
- Message handler - Broadcasts messages to all clients
- Disconnect handler - Decrements userCount, announces if username was set
