let socket = io();
socket.on('connect', function () {
  console.log('Connected to server.');
/*  socket.emit('createMessage',{
    from: "Jaan",
    text: "Whats going on!"
  })*/
});

socket.on('disconnect', function () {
  console.log('Disconnected to server.');
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
});
