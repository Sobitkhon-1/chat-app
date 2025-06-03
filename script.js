const socket = io();
let username = '';

function joinChat() {
  const input = document.getElementById('username');
  username = input.value.trim();
  if (!username) {
    alert('Please enter a name!');
    return;
  }

  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('chat-screen').classList.remove('hidden');

  addNotification('You joined the chat');
  socket.emit('user-joined', username);
}

function sendMessage() {
  const input = document.getElementById('message-input');
  const text = input.value.trim();
  if (text === '') return;

  addMessage(`${username}: ${text}`, 'you');
  socket.emit('chat-message', { username, text });
  input.value = '';
}

function addMessage(text, className = '') {
  const chatBox = document.getElementById('chat-box');
  const div = document.createElement('div');
  div.className = `message ${className}`;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addNotification(text) {
  const chatBox = document.getElementById('chat-box');
  const div = document.createElement('div');
  div.className = 'notification';
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

socket.on('user-joined', name => {
  addNotification(`${name} joined the chat`);
});

socket.on('chat-message', data => {
  addMessage(`${data.username}: ${data.text}`);
});