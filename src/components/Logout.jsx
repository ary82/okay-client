import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutState } from "../helpers/userSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
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
  return (
    <div className="flex bg-slate-800 rounded-lg items-center divide-x">
      <h2 className="font-urbanist px-3">{user.username}</h2>
      <button
        className="font-urbanist p-1 px-3 py-1"
        onClick={logout}
      >
        logout
      </button>
    </div>
  );
}
