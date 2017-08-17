var socket = io();

socket.on('connect', function() {
  console.log('connected to server');

  // socket.emit('createEmail', {
  //   to: "test@test.dk",
  //   text: "hey hvad sker der?"
  // });

  // socket.emit('createMessage', {
  //   form: 'theSender@sender.com',
  //   text: "Well we're playing at 5pm"
  // });

});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

// socket.on('newEmail', function(email) {
//   console.log('New email', email);
// });

socket.on('newMessage', function(message) {
  console.log('Theres a new message : \n', message);
  chat.innerHTML += "<br/>from: "+ message.from + "<br/><hr/><br/>" + message.text+ "<br/><hr/><hr/><br/>";
});
