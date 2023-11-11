const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
});
const port = 8000;
const cors = require('cors'); 
app.use(cors());


const users = {}
let  roomNo = 1 ; 

//  Make the Connection to the socket 
io.on('connection', (socket) => {
    socket.on('createroom' , (data)=>{
        users[socket.id] = {name : data.name , roomno : roomNo};
        socket.join(roomNo)
        io.to(roomNo).emit('roomCreated' , {room : roomNo })

        roomNo+=1 ;  
    })
    socket.on('joinroom' , (data)=>{
        const roomN = parseInt(data.room)
        socket.join(roomN)
        users[socket.id] = {name : data.name , roomno : roomN}
        socket.to(roomN).emit('newUserJoined', { name: data.name });

    })
    socket.on('sendmessage' , (data)=>{
        if(socket.id in users){
            const room = users[socket.id].roomno
            socket.to(room).emit('receive' , {name : users[socket.id].name , message : data.message})
        }
   
    })
    socket.on('disconnect', () => {
        if(socket.id in users){
            const room = users[socket.id].roomno
            io.to(room).emit('userdisconnected' , {name : users[socket.id].name})
            delete users[socket.id]
        }
      });
});


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
