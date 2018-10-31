//https://socket.io/docs/#Using-with-Express

const express = require('express');
const path = require('path');
const port = 4000;
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
    res.sendFile('index.html', { root: path.join(__dirname, 'views') });
});

io.on('connection', function(socket) {
    console.log('User connected');
    socket.username = "Unknown";
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    socket.on('typing', (data) => {
      socket.broadcast.emit('typing', { username: socket.username });
    })
    socket.on('done typing', () => {
      socket.broadcast.emit('done typing');
    })
    socket.on('change username', (data) => {
      socket.username = data.user;
      console.log(socket.username);
    })
    socket.on('chat message', function(data) {
        io.sockets.emit('chat message', { msg: data.msg, user: socket.username });
    })
});

http.listen(4000, '0.0.0.0', function() {
    console.log('Creative Project 4 listening on port 4000!');
})
//10.37.134.204:4000 (BYU Wi-Fi) => Use your own IP address when running locally
//On Windows type 'ipconfig' into the command prompt or use your AWS IP
