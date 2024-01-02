import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../helpers/socket";
import Message from "./Message";

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
        console.log(res.data);
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

  const postAImessage = () => {
    axios({
      method: "post",
      url: "http://localhost:3000/ai",
      data: { from: user.username, to: to },
      withCredentials: true,
    })
      .then((res) => {
        setmessage(res.data);
      })
      .catch((err) => console.log(err));
  };

  const postMessage = (e) => {
    e.preventDefault();
    setmessage("");
    setbool(true);
    setTimeout(() => {
      setbool(false);
    }, 1500);
    axios({
      method: "post",
      url: "http://localhost:3000/message",
      data: { from: user.username, to: to, message: message },
      withCredentials: true,
    })
      .then((res) => {
        socket.emit("message", message, currentRoom);
        console.log(res.data);
        setsocketMessages([...socketMessages, {
          from: res.data.from,
          message: res.data.message,
          createdAt: res.data.createdAt,
          id: crypto.randomUUID(),
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
      socket.on("receive-message", (m, id) => {
        console.log(m);
        setsocketMessages((oldsocketMessages) => [...oldsocketMessages, {
          from: to,
          message: m,
          createdAt: (new Date()).toJSON(),
          id,
        }]);
        console.log(socketMessages);
      });
    }
    return () => socket.off("receive-message");
  }, [to]);
  useEffect(() => {
    setsocketMessages([]);
  }, [currentRoom]);
  return (
    <>
      {to
        ? (
          <div className="grow basis-3/4 bg-slate-900 overflow-y-auto ">
            <ul className="flex flex-col gap-4 p-4 pb-20">
              {conversation.toReversed().map((chat, index, convo) => (
                <li
                  className="relative flex flex-col"
                  key={chat._id}
                >
                  <Message
                    chat={chat}
                    index={index}
                    convo={convo}
                    isSocket={false}
                  />
                </li>
              ))}
              {socketMessages.map((m, index, convo) => (
                <li
                  className="relative flex flex-col"
                  key={crypto.randomUUID()}
                >
                  <Message
                    chat={m}
                    index={index}
                    convo={convo}
                    isSocket={true}
                  />
                </li>
              ))}
            </ul>
            <div className="fixed bottom-0 flex flex-col bg-gray-950 w-3/4 border-y border-slate-700">
              <form
                className="flex items-center bg-slate-900 divide-x"
                onSubmit={postMessage}
              >
                <input
                  type="text"
                  rows="2"
                  name="message"
                  id="message"
                  value={message}
                  className={`bg-slate-800 flex-1 resize-none py-1 px-2 m-1 mr-0 rounded-s text-sm focus:outline-none ${
                    bool && "bg-gray-900 text-gray-600"
                  }`}
                  onChange={(e) => setmessage(e.target.value)}
                />
                <button
                  className="text-lg font-urbanist px-2 bg-slate-800 disabled:bg-gray-900 disabled:text-gray-600"
                  disabled={bool}
                  type="submit"
                >
                  {">"}
                </button>
              </form>
              <button
                className="font-urbanist font-xl p-1"
                onClick={postAImessage}
              >
                Generate with AI
              </button>
            </div>
          </div>
        )
        : <h1 className="grow basis-3/4">Select contact</h1>}
    </>
  );
}
