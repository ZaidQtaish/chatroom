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

    // Handle username submission
    socket.on('username', username => {
        socket.username = username;
        console.log(`Username set for ${socket.id}: ${username}`);
        io.emit('system', `User ${username} has joined the chat`);
    });

    // Notify all clients that a user joined
    socket.on('disconnect', () => {
        console.log(`User ${socket.username} has left the chat`);
        io.emit('system', `User ${socket.username} has left the chat`);
    });

    // Handle incoming messages
    socket.on('message', msg => {
        console.log(`Message from ${socket.username}: ${msg}`);
        io.emit('message', { msg, username: socket.username });
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});