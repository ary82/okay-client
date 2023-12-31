import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginState, setUser } from "../helpers/userSlice.js";
import Logout from "./Logout.jsx";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [bool, setbool] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    setbool(true);
    setTimeout(() => {
      setbool(false);
    }, 1000);
    axios({
      method: "post",
      url: "http://localhost:3000/login",
      data: { email: email, password: password },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          dispatch(loginState());
          dispatch(setUser({ username: res.data.username }));
        }
      })
      .catch((err) => console.log(err.response));
  };

  // REMOVE AT PROD
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
  // REMOVE OVER
  return (
    user.value ? <Navigate to={"/"} /> : (
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
            <button type="submit" disabled={bool}>Login</button>
            <button onClick={loginCheck}>Check</button>
            <Logout />
          </form>
        }
        <p>
          Already have an account? <Link to="../signup">Signup</Link>
        </p>
      </div>
    )
  );
}
