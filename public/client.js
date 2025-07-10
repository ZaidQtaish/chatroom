// Connect to the server
const socket = io();

// Log when connected
socket.on('system', (data) => {
    console.log('Connected to the server, ID:', socket.id);
    const messages = document.getElementById('messages');
    const li = document.createElement('li');
    li.className = 'system-message';
    li.textContent = data;
    messages.appendChild(li);
});

socket.on('disconnect', () => {
    socket.emit('leave', socket.id, username);
    const messages = document.getElementById('messages');
    const li = document.createElement('li');
    li.className = 'system-message';
    li.textContent = 'You have been disconnected from the server';
    messages.appendChild(li);
});

// Log when receiving a message
socket.on('message', (data) => {
    console.log(`Message from server: ${data}`);
    // Add the message to the chat
    const messages = document.getElementById('messages');
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = data;
    messages.appendChild(li);
});

// Handle form submission
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('input');
    const message = input.value.trim();

    if (message) {
        // Emit the message to the server
        socket.emit('message', message);
        input.value = ''; // Clear the input field
    }
});

// Show the username modal when the page loads
document.addEventListener('DOMContentLoaded', function() {
    var usernameModal = new bootstrap.Modal(document.getElementById('usernameModal'));
    usernameModal.show();
});

document.getElementById('usernameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();

    if (username) {
        // Emit the username to the server
        socket.emit('username', username);
        // Hide the modal
        var usernameModal = bootstrap.Modal.getInstance(document.getElementById('usernameModal'));
        usernameModal.hide();
    }
});