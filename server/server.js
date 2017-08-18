// require('./config/config.js');

const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message.js');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');

  //socket.emit emitter til én forbindelse
  //socket.broadcast emitter til alle på nær den ene der kommer noget fra
  //io.emit sender til alle

  socket.emit('newMessage', generateMessage('Admin','Wellcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin','A new user joined'));

  // socket.on('createMessage', (messageNew, callback) => {
  //   console.log('createMessage', messageNew);
  //   // io.emit sender til alle åbne forbindelser
  //   io.emit('newMessage', generateMessage(messageNew.from, messageNew.text));
  //   callback('This is from the server');
  //   //socket.broadcast.emit sender til alle på nær afsender
  //   // socket.broadcast.emit('newMessage', {
  //   //   from: messageNew.from,
  //   //   text: messageNew.text,
  //   //   createdAt: new Date().getTime()
  //   // });
  // });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback('This is from the server.');
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log('the client disconnected');
  });

});

server.listen(port , () => {
  console.log('Started on port ' + port);
});

module.exports = {app};
