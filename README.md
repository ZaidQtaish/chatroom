# Chat Room

A real-time chat application built with Node.js, Express, and Socket.IO.

**🔗 Live:** https://chatroom-35uw.onrender.com/

## Features

- Real-time messaging with Socket.IO
- User join/leave notifications
- Responsive Bootstrap UI
- Distinguish between your messages and others

## Quick Start

```bash
# Install dependencies
npm install

# Start server
node server.js

# Open http://localhost:3000
```

## Tech Stack

- **Backend**: Node.js, Express.js, Socket.IO
- **Frontend**: HTML5, CSS3, JavaScript
- **UI**: Bootstrap 5, Font Awesome 6

## Socket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `username` | Client → Server | User sets their username |
| `message` | Client ↔ Server | Send/receive chat messages |
| `system` | Server → All | Join/leave notifications |

## File Overview

- **server.js**: Express + Socket.IO server, manages connections and broadcasts
- **public/client.js**: Handles Socket.IO events and DOM updates
- **public/index.html**: Chat UI with Bootstrap modal for username input
- **public/style.css**: Custom styling

## Deployment

Deployed on [Render](https://render.com/) with automatic scaling. Start command: `node server.js`

## Configuration

Set custom port via environment variable:
```bash
PORT=8080 node server.js
```
