import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { logoutState } from "../helpers/userSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const logout = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/logout",
      withCredentials: true,
    }).then((res) => {
      if (res.data.wasLoggedIn) {
        dispatch(logoutState());
      }
      console.log(res.data);
    })
      .catch((err) => console.log(err));
  };
  return <button onClick={logout}>Logout</button>;
}
