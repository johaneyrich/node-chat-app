var socket = io();
// var moment = require('moment');

socket.on('connect', function() {
  console.log('connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
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
