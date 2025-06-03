const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

io.on('connection', (socket) => {
  socket.on('user-joined', (username) => {
    socket.broadcast.emit('user-joined', username);
  });

  socket.on('chat-message', (data) => {
    socket.broadcast.emit('chat-message', data);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});