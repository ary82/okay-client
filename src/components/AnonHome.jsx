import React from "react";
import { Link } from "react-router-dom";
import ok from "../assets/ok.png";
import ai from "../assets/ai.png";

export default function AnonHome() {
  return (
    <>
      <div className="flex justify-end bg-slate-900 gap-2 items-center p-2 font-urbanist text-xl">
        <Link to={"../signup"}>
          <button className="bg-slate-800 text-white p-1 rounded-lg px-3 py-1 hover:scale-110 hover:transition-transform">
            signup
          </button>
        </Link>
        <Link to={"../login"}>
          <button className="bg-slate-800 text-white p-1 rounded-lg px-3 py-1 hover:scale-110 hover:transition-transform">
            login
          </button>
        </Link>
      </div>
      <div className="bg-slate-900">
        <h1 className="text-7xl text-center pt-8 font-urbanist w-auto m-auto">
          chat.okay
        </h1>
      </div>
      <div className="bg-slate-900">
        <p className="bg-slate-900 text-white text-center p-6 max-w-prose m-auto">
          A Real-time public Direct Messaging webapp that lets you generate
          messages with the help of Google's Gemini API
        </p>
      </div>
      <h2 className="font-urbanist text-5xl text-center p-4">features</h2>
      <div className="p-4 flex flex-col gap-8  max-w-5xl mx-auto">
        <div className="flex flex-col gap-4 md:flex-row">
          <img
            className="m-auto grad-bg p-0.5 rounded-xl shadow-2x w-full max-w-xl"
            src={ok}
            alt="Ok on empty message send"
          />
          <div className="p-1 max-w-prose m-auto flex-1 min-w-24">
            Effortlessly acknowledge messages with a single keystroke.{" "}
            <h1 className="inline font-urbanist text-lg">Pressing Enter</h1>
            {" "}
            with an empty message will automatically send the text "Ok"!
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <img
            className="m-auto grad-bg p-0.5 rounded-xl shadow-2x w-full max-w-xl"
            src={ai}
            alt="Ok on empty message send"
          />
          <div className="p-1 max-w-prose m-auto flex-1 min-w-24">
            Harness the capabilities of Google's Gemini AI. By clicking{" "}
            <h1 className="inline font-urbanist text-lg">Generate with AI</h1>,
            you trigger this LLM to generate a message based on the last five
            messages of your conversation.
          </div>
        </div>
      </div>
    </>
  );
}
