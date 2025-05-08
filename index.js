const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "https://your-chat-app.netlify.app", // ✅ Your Netlify site URL
  methods: ["GET", "POST"],
}))

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'https://aditya-mp-chatapp.netlify.app/', 
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