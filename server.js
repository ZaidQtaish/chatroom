const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

io.on('connection', socket => {
    console.log('A user connected with ID:', socket.id);

    // Notify all clients that a user joined
    socket.on('leave', username => {
        console.log(`User ${username} has left the chat`);
        io.emit('system', `User ${socket.id.substring(0, 6)} has left the chat`);
    });

    // Handle username submission
    socket.on('username', username => {
        console.log(`Username set for ${socket.id}: ${username}`);
        io.emit('system', `User ${username} has joined the chat`);
    });

    // Handle incoming messages
    socket.on('message', data => {
        console.log(`Message from ${socket.id}: ${data}`);
        io.emit('message', data);
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});