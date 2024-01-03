import React from "react";
import { useSelector } from "react-redux";

export default function Message({ chat, index, convo, isSocket }) {
  const user = useSelector((state) => state.user);
  return (
    <>
      {index == 0 && !isSocket
        ? (
          <p className="text-center -mt-4 p-2">
            {(new Date(chat.createdAt)).toLocaleDateString()}
          </p>
        )
        : index >= 1 &&
          ((new Date(chat.createdAt)).toLocaleDateString()) !=
            ((new Date(convo[index - 1]?.createdAt)).toLocaleDateString()) &&
          (
            <p className="text-center -mt-4 p-2">
              {(new Date(convo[index].createdAt))
                .toLocaleDateString()}
            </p>
          )}
      <div
        className={`break-words w-8/12 bg-slate-800 rounded-lg p-2 pb-6 relative ${
          user.username == chat.from ? "sent self-end" : "received self-start"
        }`}
      >
        {chat.message}
        <p className="text-sm text-gray-400 text-right p-1 absolute bottom-0 right-2">
          {(new Date(chat.createdAt)).toLocaleTimeString([], {
            timeStyle: "short",
          })}
        </p>
      </div>
    </>
  );
}
