const express = require('express');
const app = express();
const restRouter = require('./routes/rest');
const path = require('path');

var http = require('http');
var socketIO = require('socket.io');
var io = socketIO();
var editorSocketService = require('./services/editorSocketService')(io);

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin123@ds217921.mlab.com:17921/problems');


// app.get('/', (req, res) => res.send('Hello World!??!??'));
app.use('/api/v1', restRouter);
app.use(express.static(path.join(__dirname, '../public')));

app.use((req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../public/')}); 
})

// app.listen(3000, () => console.log('Example app listening on port 3000!'));
const server = http.createServer(app);
io.attach(server);
server.listen(3000);

server.on('listening', onListening);

function onListening() {
    console.log('App listening on port 3000!');
}