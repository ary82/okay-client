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
  const [bool, setbool] = useState(false);
  const getConversation = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/conversation/${user.username}/${to}`,
    })
      .then((res) => {
        setconversation(res.data);
      }).catch((err) => console.log(err));
  };

  const getRoom = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/room/${user.username}/${to}`,
    }).then((res) => {
      setcurrentRoom(res.data.users);
      socket.emit("join-room", res.data.users);
    }).catch((err) => console.log(err));
  };

  const postMessage = (e) => {
    e.preventDefault();
    setmessage("");
    setbool(true);
    setTimeout(() => {
      setbool(false);
    }, 1000);
    axios({
      method: "post",
      url: "http://localhost:3000/message",
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
      socket.disconnect();
      socket.connect();
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
              <button disabled={bool} type="submit">Send</button>
            </form>
          </div>
        )
        : <h1>Select contact</h1>}
    </>
  );
}
