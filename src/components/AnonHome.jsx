import React from "react";
import { Link } from "react-router-dom";

export default function AnonHome() {
  return (
    <>
      <div className="flex justify-end bg-slate-900 gap-2 items-center p-2">
        <Link to={"../signup"}>
          <button className="bg-slate-800 text-white p-1 rounded-lg px-3 py-1 text-lg">Signup</button>
        </Link>
        <Link to={"../login"}>
          <button className="bg-slate-800 text-white p-1 rounded-lg px-3 py-1 text-lg">Login</button>
        </Link>
      </div>
      <div className="bg-slate-900 flex">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-500 to-blue-300 text-7xl text-center pt-10 font-urbanist w-auto m-auto">
          chat.okay
        </h1>
      </div>
      <p className="bg-slate-900 text-white text-center p-6">
        A Real-time public Direct Messaging webapp that lets you send an OK just by
        hitting Enter!
      </p>
    </>
  );
}
