import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Home from "./Home.jsx";

export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const formHandler = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/signup",
      data: { username: username, email: email, password: password },
    })
      .then((res) => {
        if (res.status === 201) {
          navigate("/login");
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    user.value ? <Home /> : (
      <div>
        <form
          onSubmit={formHandler}
        >
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setusername(e.target.value)}
              required
            />
          </div>
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
          <div>
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmpass}
              onChange={(e) => setconfirmpass(e.target.value)}
              required
            />
          </div>
          <button type="submit">Signup</button>
          <p>
            Already have an account? <Link to="../login">Login</Link>
          </p>
        </form>
      </div>
    )
  );
}
