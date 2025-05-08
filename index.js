const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors");

const app = express();
app.use(cors())

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173', 
      methods: ['GET', 'POST'],
    },
  });

//Making connection
io.on("connection",(socket) =>{
   console.log("A new user connected: ", socket.id);
   //accepting connections
   socket.on("send-message",(message) =>{
    console.log('Received message:', message);
     //emitting the message to client
     io.emit("receive-message", message);
   });

   socket.on("disconnect",() =>{
     console.log("User disconnected: ", socket.id);
   })
});

server.listen(9000, () => console.log("Server running on PORT 9000..."));