import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../helpers/socket";

export default function Chat({ to }) {
  const user = useSelector((state) => state.user);
  const [conversation, setconversation] = useState([]);
  const [message, setmessage] = useState("");
  const [currentRoom, setcurrentRoom] = useState("");
  const [socketMessages, setsocketMessages] = useState([]);
  const getConversation = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/conversation",
      data: { from: user.username, to: to },
      withCredentials: true,
    })
      .then((res) => {
        setconversation(res.data);
      }).catch((err) => console.log(err));
  };

  const getRoom = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/room",
      data: { users: [user.username, to] },
      withCredentials: true,
    }).then((res) => {
      setcurrentRoom(res.data.users);
      socket.emit("join-room", res.data.users);
    }).catch((err) => console.log(err));
  };

  const postMessage = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/message/send",
      data: { from: user.username, to: to, message: message },
      withCredentials: true,
    })
      .then((res) => {
        socket.emit("message", message, currentRoom);
        setsocketMessages([...socketMessages, {
          from: res.data.from,
          message: res.data.message,
        }]);
        console.log(socketMessages);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (to != "") {
      getConversation();
      getRoom();
      socket.on("receive-message", (m) => {
        console.log(m);
        setsocketMessages((oldsocketMessages) => [...oldsocketMessages, {
          from: to,
          message: m,
        }]);
        console.log(socketMessages);
      });
    }
  }, [to]);
  useEffect(() => {
    setsocketMessages([]);
  }, [currentRoom]);
  return (
    <>
      {to
        ? (
          <div>
            <h2>{`username: ${user.username}`}</h2>
            <h2>{`to: ${to}`}</h2>
            {conversation.toReversed().map((chat) => (
              <li key={chat._id}>{chat.from}: {chat.message}</li>
            ))}
            {socketMessages.map((m) => (
              <li key={crypto.randomUUID()}>{m.from}: {m.message}</li>
            ))}
            <form onSubmit={postMessage}>
              <input
                type="string"
                name="message"
                id="message"
                value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        )
        : <h1>Select contact</h1>}
    </>
  );
}
