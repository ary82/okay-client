import React from "react";
import { Link } from "react-router-dom";

export default function AnonHome() {
  return (
    <>
      <p className="text-red-500 text-6xl bg-black">Welcome to okayChat</p>
      <Link to={"../login"}>Login</Link>
    </>
  );
}
