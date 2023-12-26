import axios from "axios";
import React, { useState } from "react";
export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
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

  const loginCheck = (e) => {
    e.preventDefault();
    axios({
      method: "get",
      url: "http://localhost:3000/checkuser",
      withCredentials: true,
    }).then((res) => console.log(res.data))
      .catch((err) => console.log(err));
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
    </div>
  );
}
