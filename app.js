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
    socket.on('disconnect', function() {
        console.log('User disconnected');
    });
    socket.on('chat message', function(msg) {
        console.log("message: " + msg);
        io.emit('chat message', msg);
    })
});

http.listen(4000, '0.0.0.0', function() {
    console.log('Creative Project 4 listening on port 4000!');
})
//10.37.134.204:4000
//app.listen(port, () => console.log('Creative Project 4 listening on port 4000!'));
