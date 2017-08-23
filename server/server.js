// require('./config/config.js');

const path = require('path');
const http = require('http');
const https = require('https');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js');
const publicPath = path.join(__dirname + '/../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('new user connected');


  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)) {
        return callback('Name and Room name are required.');
    };

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    //socket.leave(navn på det man vil forlade);

    // io.emit sender til alle der er på serveren
    // socket.emit.broadcast sender til alle på serveren dog ikke den der 'sender' beskeden
    // socket.emit sender til en specifik user
    // io.to(navn).emit sender til alle i det rum
    // socket.broadcast.to(navn).emit sender til alle i rummet på nær den der sender beskeden

    socket.emit('newMessage', generateMessage('Admin','Wellcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));

    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log('the client disconnected');
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    };

  });

});


server.listen(port , () => {
  console.log('Started on port ' + port);
});

module.exports = {app};
