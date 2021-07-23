const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const path= require('path');
const io = require("socket.io")(server,{cors:{origin: "*"}});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use( express.static( "public" ) );

app.get('/home',(req,res)=>{
    res.render("login_page");
})

app.get('/chatpage',(req,res)=>{        
    res.render("chat_page");
})
const hostname = "192.168.1.105";
const port = "80";
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/home`);
});
  
const users = {};

io.on("connection",(socket)=>{
    console.log("user connected: "+ socket.id );

    socket.on('new_user_connected',username =>{
        console.log("new user",username);
        users[socket.id]=username;
        console.log(users);
        socket.broadcast.emit("user_connected",username);
    });
  
    socket.on("send",(message)=>{
        socket.broadcast.emit('recieve',{message: message, username: users[socket.id]})
    });
});