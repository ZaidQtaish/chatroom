// Connect to the server
const socket = io();

let yourUsername = '';

// Log when connected
socket.on('system', (sysMsg) => {
    const messages = document.getElementById('messages');
    const li = document.createElement('li');
    li.className = 'system-message';
    li.textContent = sysMsg;
    messages.appendChild(li);
});

// Log when receiving a message
socket.on('message', data => {
    console.log(`Message from server: ${data.msg}`);
    const messages = document.getElementById('messages');

    // Create wrapper div
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper';

    // Username above
    const userTag = document.createElement('small');
    userTag.className = 'username';
    userTag.textContent = data.username;

    // Message bubble
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.textContent = data.msg;

    // Align your messages to the right
    if (data.username === yourUsername)
        wrapper.classList.add('client-message');
    // Append username and bubble
    wrapper.appendChild(userTag);
    wrapper.appendChild(li);

    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight; // Scroll to the bottom
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
document.addEventListener('DOMContentLoaded', function () {
    var usernameModal = new bootstrap.Modal(document.getElementById('usernameModal'));
    usernameModal.show();
});

document.getElementById('usernameForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const usernameInput = document.getElementById('usernameInput');
    const username = usernameInput.value.trim();

    if (username) {
        // Emit the username to the server
        yourUsername = username; // Store the username
        socket.emit('username', username);
        // Hide the modal
        var usernameModal = bootstrap.Modal.getInstance(document.getElementById('usernameModal'));
        usernameModal.hide();

        // Focus onthe input field
        document.getElementById('input').focus();
    }
});