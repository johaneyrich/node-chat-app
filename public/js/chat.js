var socket = io();
// var moment = require('moment');

function scrollToBottom() {
  //Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  //Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight(); //den næstsidste message højde

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
};

socket.on('connect', function() {
  console.log('connected to server');
  var params = jQuery.deparam(window.location.search);

  socket.emit('join',params, function(err) {
    if(err){
      alert(err);
      window.location.href = "/";
    } else {
      console.log('no error');
    }
  });
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users) {
  // console.log('User list', user);
  var ol = jQuery('<ol></ol>');

  users.forEach(function(user) {
    ol.append(jQuery('<li></li>').text(user));
  });
  jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('H:mm');
  var template = jQuery("#message-template").html();
  var html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

  //console.log('Theres a new message : \n', message);

  // var li = jQuery('<li></li>');
  // li.html(`${message.from} <i>${formattedTime}</i>: ${message.text}`);
  //
  // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('H:mm');
  var template = jQuery("#location-message-template").html();
  var html = Mustache.render(template,{
    url: message.url,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();

  // var li = jQuery('<li></li>');
  // var a = jQuery(`<a target="_blank">My current location</a>`);
  //
  //
  // li.text(`${message.from}: `);
  // a.attr('href',message.url);
  // li.append(a);
  // li.append('<i> @' + formattedTime + '</i>');
  // jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert('Geolocation not supportet by your browser');
  };

  locationButton.prop("disabled",true).text('Sending location...');

  navigator.geolocation.getCurrentPosition(function (position,) {
    locationButton.prop("disabled",false).text('Send Location');
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.prop("disabled",false).text('Send location');
    alert ('Unable to fetch location');
  });


});
