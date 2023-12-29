import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Chat({ to }) {
  const user = useSelector((state) => state.user);
  const [conversation, setconversation] = useState([]);
  const [message, setmessage] = useState("");
  const getConversation = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/conversation",
      data: { from: user.username, to: to },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        setconversation(res.data);
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
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    console.log(user.username, to);
    getConversation();
  }, [to]);
  return (
    <>
      <h1>{to}</h1>
      {`username: ${user.username}`}
      {`to: ${to}`}
      {conversation.map((chat) => <li key={chat._id}>{chat.message}</li>)}
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
    </>
  );
}
