import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Home from "./Home.jsx";

export default function Signup() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [bool, setbool] = useState(false);
  const [error, seterror] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const formHandler = (e) => {
    e.preventDefault();
    setbool(true);
    axios({
      method: "post",
      url: "http://localhost:3000/signup",
      data: { username: username, email: email, password: password },
      withCredentials: true,
    })
      .then((res) => {
        setbool(false);
        if (res.status === 201) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setbool(false);
        console.log(err.response);
        seterror(err.response?.data?.messge);
      });
  };
  return (
    user.value
      ? <Home />
      : (
        <div className="bg-slate-900 grow flex justify-center items-center">
          <form
            className="flex flex-col grow bg-gray-950 gap-4 m-4 p-4 max-w-md shadow-2xl rounded-lg"
            onSubmit={formHandler}
          >
            <h1 className="text-center text-3xl font-urbanist">okay.chat</h1>
            <div className="grad-bg rounded-lg flex">
              <input
                type="text"
                className="bg-slate-800 rounded-md px-2 py-1 grow focus:m-0.5 focus:outline-none"
                minLength="4"
                placeholder="display name"
                id="username"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                required
              />
            </div>
            <div className="grad-bg rounded-lg flex">
              <input
                type="email"
                className="bg-slate-800 rounded-md px-2 py-1 grow focus:m-0.5 focus:outline-none"
                placeholder="email address"
                id="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="grad-bg rounded-lg flex">
              <input
                type="password"
                className="bg-slate-800 rounded-md px-2 py-1 grow focus:m-0.5 focus:outline-none"
                placeholder="password"
                minLength="4"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-center -m-2 text-red-400 font-bold">
                {error}
              </p>
            )}
            <button
              className="font-urbanist bg-slate-800 w-1/3 self-center rounded-lg text-lg disabled:bg-gray-900 disabled:text-gray-600 hover:scale-110 hover:transition-transform"
              type="submit"
              disabled={bool}
            >
              Signup
            </button>
            <p className="self-center">
              Already have an account?{" "}
              <Link
                className="font-urbanist text-lg hover:underline"
                to="../login"
              >
                Login
              </Link>
            </p>
            <p className="self-center -mt-4">
              Back to{" "}
              <Link
                className="font-urbanist text-lg hover:underline"
                to="../"
              >
                Home
              </Link>
            </p>
          </form>
        </div>
      )
  );
}
