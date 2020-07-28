const app = require('./app');

const server = app.listen(3334, ()=>{
    console.log("Server started on port 3334");
  });

const io = require('socket.io-client');

const botSocket = io.connect("ws://localhost:3333/", {
    reconnection: true
});


botSocket.on('connect', function () {
  console.log('connected to localhost:3333');
});

console.log(botSocket);

botSocket.emit("bot add");
