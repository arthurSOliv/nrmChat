const request = require("request");
const io = require("socket.io-client");

const app = require('./app');

const server = app.listen(3334, ()=>{
    console.log("Server started on port 3334");
  });

const socket = io("http://localhost:3333");

socket.on("disconnect", () => {
    console.log('Bot Disconnected');
});

socket.on("connected", (socket) => {
    console.log('Bot Connected' + socket);
})

socket.emit("bot add");