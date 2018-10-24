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

http.listen(4000, function() {
    console.log('Creative Project 4 listening on port 4000!');
})
//app.listen(port, () => console.log('Creative Project 4 listening on port 4000!'));