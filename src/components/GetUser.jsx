import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginState, logoutState, setUser } from "../helpers/userSlice";

export default function GetUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios({
      method: "get",
      url: "https://okaychat.adaptable.app/checkuser",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.loggedIn) {
          dispatch(loginState());
          dispatch(setUser({ username: res.data.username }));
        } else {
          dispatch(logoutState());
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return <></>;
}
