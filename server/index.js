const express = require ('express');
const socketio = require ('socket.io');
const http = require('http');


const PORT = process.env.PORT || 5000

const router = require('./router');
const { Socket } = require('dgram');

const app = express();

const server = http.createServer(app);
const io = socketio(server);


io.on('connection',(socket)=>{

    console.log("Uspostavljena konekcija");


socket.on('disconnect',()=>{
    console.log("Korisnik je napustio");
})



});



app.use(router);

server.listen(PORT,()=>console.log(`Server je zapoceo na portu ${PORT}`));
