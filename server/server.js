const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'/../public');
const port = process.env.PORT || 3000
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));

io.on('connection', (socket) =>{
  console.log("A new user just connected");

/*  socket.emit('newMessage',{
    from: "Rohan",
    text: "Nothing much dude"
  })
*/
socket.emit('newMessage',{
   from: "Admin",
   text: "Welcome to the chat app!",
   createdAt: new Date().getTime()
 });

 socket.broadcast.emit('newMessage',{
    from: "Admin",
    text: "New User joined",
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log("createMessage", message);
    // for broadcasting messages
    io.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })
// so that sender shouldn't receive the newMessage what he is sending
// broadcasting in a single socket
//broadcasting to everyone except the person who is creating the event
  /*  socket.broadcast.emit('newMessage',{
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    })*/
  })
  socket.on('disconnect', () =>{
    console.log('User was disconnect');
  });
});

server.listen(port, ()=>{
  console.log('server is up on port ${port}');
})
