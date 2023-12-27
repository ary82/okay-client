import React from "react";
import { useSelector } from "react-redux";
import AnonHome from "./AnonHome"
import UserHome from "./UserHome"

export default function Home() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user.value ? <UserHome/> : <AnonHome/>}
    </>
  );
}
