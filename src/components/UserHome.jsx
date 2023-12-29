import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import axios from "axios";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import Chat from "./Chat";

export default function UserHome() {
  const [users, setusers] = useState([]);
  const [currentChat, setcurrentChat] = useState("");
  const user = useSelector((state) => state.user);
  const getUsernames = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/users",
    }).then((res) => {
      setusers(res.data);
    })
      .catch((err) => console.log(err));
  };

  const socket = io("http://localhost:3000", {
    autoConnect: false,
  });

  useEffect(() => {
    getUsernames();
    socket.connect();
  }, []);

  return (
    <>
      <div>UserHome</div>
      <Logout />
      <ul>
        {users.filter((i) => i.username != user.username).map((user) => (
          <li onClick={() => setcurrentChat(user.username)} key={user._id}>
            {user.username}
          </li>
        ))}
      </ul>
      <div>{currentChat}</div>
      <Chat to={currentChat} />
    </>
  );
}
