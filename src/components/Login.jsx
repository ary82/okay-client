import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginState,
  logoutState,
  setUser,
} from "../features/user/userSlice.js";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/login",
      data: { email: email, password: password },
      withCredentials: true,
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  function reducerTest() {
    dispatch(loginState());
    dispatch(setUser({ username: "ewfwen" }));
    console.log(user);
  }
  const loginCheck = (e) => {
    e.preventDefault();
    axios({
      method: "get",
      url: "http://localhost:3000/checkuser",
      withCredentials: true,
    }).then((res) => {
      console.log(res.data);
      return res.data;
    })
      .catch((err) => err);
  };
  const logout = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/logout",
      withCredentials: true,
    }).then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      {
        <form onSubmit={login}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          <button onClick={loginCheck}>Check</button>
          <button onClick={logout}>logout</button>
        </form>
      }

      <button onClick={reducerTest}>Reducer test</button>
    </div>
  );
}
