require('./config/config.js');

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const path = require('path');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  // socket.emit('newEmail', {
  //   from: 'test@test.dk',
  //   text: 'hep alt vel',
  //   createdAt: 123
  // });

  // //sokcet.emit emitter til en forbindelse
  // socket.emit('newMessage', {
  //   from: 'hero@one.com',
  //   text: 'dette er en text',
  //   createdAt: 123
  // });

  // socket.on('createEmail', (newEmail) => {
  //   console.log('createEmail', newEmail);
  // });

  socket.on('createMessage', (messageNew) => {
    console.log('createMessage', messageNew);
    //io.emit sender til alle åbne forbindelser
    io.emit('newMessage', {
      from: messageNew.from,
      text: messageNew.text,
      createdAt: new Date().getTime()
    });
  });


  socket.on('disconnect', () => {
    console.log('the client disconnected');
  });
});

server.listen(port , () => {
  console.log('Started on port ' + port);
});

module.exports = {app};
