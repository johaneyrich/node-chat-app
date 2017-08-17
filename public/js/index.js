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

  //eget påfund
  gotoBottom('chat');

});

function sendNewMessage(message) {
  socket.on('newMessage', function(message) {
    console.log('Theres a new message : \n', message);
    chat.innerHTML += "<br/>from: "+ message.from + "<br/><hr/><br/>" + message.text+ "<br/><hr/><hr/><br/>";
  });
};


function myFunction() {
    // var x = document.getElementById("myForm").elements[0].value;
    // chat.innerHTML = document.getElementById("myForm").elements[1].value;
    var x;
    x.name = document.getElementById("myForm").elements[0].value;
    x.text = document.getElementById("myForm").elements[1].value;
    console.log(x);
    // var x = document.getElementById("myForm");
    // console.log(x);
    //document.getElementById("demo").innerHTML = x;
    // sendNewMessage(x);
    socket.emit('createMessage',{
      from: x.name,
      text: x.text
    });
};
