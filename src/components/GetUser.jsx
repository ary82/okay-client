import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginState,
  logoutState,
  setUser,
} from "../features/user/userSlice.js";

export default function GetUser() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:3000/checkuser",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.loggedIn) {
          dispatch(loginState());
          dispatch(setUser({ username: res.data.username }));
        } else {
          dispatch(logoutState());
          dispatch(setUser({ username: "" }));
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return <></>;
}
