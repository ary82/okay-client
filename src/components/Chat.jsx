import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../helpers/socket";
import Message from "./Message";

export default function Chat({ to }) {
  const user = useSelector((state) => state.user);
  const refElement = useRef(null);
  const [conversation, setconversation] = useState([]);
  const [message, setmessage] = useState("");
  const [currentRoom, setcurrentRoom] = useState("");
  const [socketMessages, setsocketMessages] = useState([]);
  const [bool, setbool] = useState(false);
  const getConversation = () => {
    axios({
      method: "get",
      url: `http://ec2-13-127-44-116.ap-south-1.compute.amazonaws.com:3000/conversation/${user.username}/${to}`,
    })
      .then((res) => {
        setconversation(res.data);
      }).catch((err) => console.log(err));
  };

  const getRoom = () => {
    axios({
      method: "get",
      url: `http://ec2-13-127-44-116.ap-south-1.compute.amazonaws.com:3000/room/${user.username}/${to}`,
    }).then((res) => {
      setcurrentRoom(res.data.users);
      socket.emit("join-room", res.data.users);
    }).catch((err) => console.log(err));
  };

  const postAImessage = () => {
    setbool(true);
    axios({
      method: "post",
      url: "http://ec2-13-127-44-116.ap-south-1.compute.amazonaws.com:3000/ai",
      data: { from: user.username, to: to },
      withCredentials: true,
    })
      .then((res) => {
        setmessage(res.data);
        setbool(false);
      })
      .catch((err) => {
        setbool(false);
        console.log(err);
      });
  };

  const postMessage = (e) => {
    e.preventDefault();
    setmessage("");
    setbool(true);
    axios({
      method: "post",
      url: "http://ec2-13-127-44-116.ap-south-1.compute.amazonaws.com:3000/message",
      data: { from: user.username, to: to, message: message || "Ok" },
      withCredentials: true,
    })
      .then((res) => {
        socket.emit("message", message || "Ok", currentRoom, user.username);
        setsocketMessages([...socketMessages, {
          from: res.data.from,
          message: res.data.message,
          createdAt: res.data.createdAt,
          id: crypto.randomUUID(),
        }]);
        setbool(false);
      })
      .catch((err) => {
        setbool(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (to != "") {
      socket.disconnect();
      socket.connect();
      getConversation();
      getRoom();
      socket.on("receive-message", (m, id, from) => {
        setsocketMessages((oldsocketMessages) => [...oldsocketMessages, {
          from,
          message: m,
          createdAt: (new Date()).toJSON(),
          id,
        }]);
      });
    }
    return () => socket.off("receive-message");
  }, [to]);
  useEffect(() => {
    setsocketMessages([]);
  }, [currentRoom]);
  useEffect(() => {
    refElement.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, socketMessages]);
  return (
    <>
      {to
        ? (
          <div className="grow basis-3/4 bg-slate-900 overflow-y-auto ">
            <ul className="flex flex-col gap-4 p-4 pb-24">
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
            <div ref={refElement}></div>
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
                className="font-urbanist font-xl p-1 disabled:bg-gray-900 disabled:text-gray-600"
                onClick={postAImessage}
                disabled={bool}
              >
                Generate with AI
              </button>
            </div>
          </div>
        )
        : (
          <div className="flex flex-col items-center grow basis-3/4 bg-slate-900 overflow-y-auto ">
            <h2 className="font-urbanist text-2xl p-4 max-w-prose text-center gap-4">
              Click a contact to start chatting!
            </h2>
            <div className="p-4 max-w-prose">
              Harness the capabilities of Google's Gemini API. By clicking{" "}
              <h1 className="inline font-urbanist text-lg">Generate with AI</h1>
              , you trigger this advanced language model to generate a tailored
              message based on your conversation's last five messages.
            </div>
            <div className="p-4 max-w-prose">
              Pressing Enter with an empty message will automatically send the
              text "Ok" instead of requiring you to type it manually!
            </div>
          </div>
        )}
    </>
  );
}
