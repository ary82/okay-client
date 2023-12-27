import React from "react";
import { Link } from "react-router-dom";

export default function AnonHome() {
  return (
    <>
      <p>Welcome to okayChat</p>
      <Link to={"../login"}>Login</Link>
    </>
  );
}
