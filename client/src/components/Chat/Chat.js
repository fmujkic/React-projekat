import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

import './Chat.css';

import InfoBar from '../InfoBar/InfoBar.js'
import Input from '../Input/Input.js'
import Messages from '../Messages/Messages.js'
import TextContainer from '../TextContainer/TextContainer.js'
import RoomContainer from '../RoomContainer/RoomContainer.js'


let socket;
const ENDPOINT = "localhost:5000";

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);



    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("izlaz");

    socket.off();
    };
  }, [location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    socket.on("roomData", ({ users,rooms }) => {
      setUsers(users);
      setRooms(rooms);
    });

  });

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

console.log(message,messages,rooms,users);

  return (

    
    <div className="outerContainer">

      <div className="container">
        <InfoBar room = {room}/>
        <Messages messages={messages} name = {name} />
        <Input message = {message} setMessage = {setMessage} sendMessage = {sendMessage}/>
      </div>
      
      <div className="korisnici"><TextContainer users = {users}/></div>
    </div>
  );
};

export default Chat;
