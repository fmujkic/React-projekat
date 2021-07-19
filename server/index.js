const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const { addUser, removeUser, getUser, getUsersInRoom,getRooms } = require("./users");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();

const server = http.createServer(app);
const io = socketio(server);

io.on("connect", (socket) => {
  console.log("Uspostavljena konekcija");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);


    socket.join(user.room);



    socket.emit("message", {
      user: "admin",
      text: `${user.name}, dobrodošao u sobu ${user.room}.`
    });


    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} se pridruzio `
    });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room),rooms: getRooms()});

    callback();
  });



  socket.on("sendMessage", (message,callback) => {

    const user = getUser(socket.id);
    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
    });
    callback();
  });



  socket.on("izlaz", () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room),rooms: getRooms()});
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server je zapoceo na portu ${PORT}`));
