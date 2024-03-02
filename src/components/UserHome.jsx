import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import axios from "axios";
import { useSelector } from "react-redux";
import { socket } from "../helpers/socket";
import Chat from "./Chat";

export default function UserHome() {
  const [users, setusers] = useState([]);
  const [currentChat, setcurrentChat] = useState("");
  const user = useSelector((state) => state.user);
  const getUsernames = () => {
    axios({
      method: "get",
      url: "https://okayapi.ary82.dev/users",
    }).then((res) => {
      setusers(res.data);
    })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getUsernames();
    socket.connect();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-2 bg-gray-950 ">
        <h2 className="font-urbanist bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-300 text-xl">
          chat.okay
        </h2>
        <Logout className="bg-black" />
      </div>
      <div className="flex grow overflow-y-auto">
        <ul className="flex flex-col bg-slate-800 basis-1/4">
          {users.filter((i) => i.username != user.username).map((user) => (
            <li
              className={`break-words p-3 text-white border-b-2 border-slate-900 cursor-pointer ${
                currentChat == user.username && "bg-slate-700"
              }`}
              onClick={() => setcurrentChat(user.username)}
              key={user._id}
            >
              {user.username}
            </li>
          ))}
        </ul>
        <Chat
          to={currentChat}
        />
      </div>
    </>
  );
}
