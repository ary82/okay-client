import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginState, setUser } from "../helpers/userSlice.js";
import { Link, Navigate } from "react-router-dom";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [bool, setbool] = useState(false);
  const [error, seterror] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const login = (e) => {
    e.preventDefault();
    setbool(true);
    axios({
      method: "post",
      url: "https://okaychat.adaptable.app/login",
      data: { email: email, password: password },
      withCredentials: true,
    })
      .then((res) => {
        setbool(false);
        if (res.data.success) {
          dispatch(loginState());
          dispatch(setUser({ username: res.data.username }));
        }
      })
      .catch((err) => {
        setbool(false);
        console.log(err.response);
        seterror("Invalid email or password");
      });
  };
  const demoLogin = (e) => {
    e.preventDefault();
    setbool(true);
    axios({
      method: "post",
      url: "https://okaychat.adaptable.app/login",
      data: { email: "demo", password: "demo" },
      withCredentials: true,
    })
      .then((res) => {
        setbool(false);
        if (res.data.success) {
          dispatch(loginState());
          dispatch(setUser({ username: res.data.username }));
        }
      })
      .catch((err) => {
        setbool(false);
        console.log(err.response);
      });
  };

  return (
    user.value
      ? <Navigate to={"/"} />
      : (
        <div className="bg-slate-900 grow flex justify-center items-center">
          <form
            className="flex flex-col grow bg-gray-950 gap-4 m-4 p-4 max-w-md shadow-2xl rounded-lg"
            onSubmit={login}
          >
            <h1 className="text-center text-3xl font-urbanist">okay.chat</h1>
            <div className="grad-bg rounded-lg flex">
              <input
                type="email"
                id="email"
                className="bg-slate-800 rounded-md px-2 py-1 grow focus:m-0.5 focus:outline-none"
                placeholder="email address"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
              />
            </div>
            <div className="grad-bg rounded-lg flex">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="bg-slate-800 rounded-md px-2 py-1 grow focus:m-0.5 focus:outline-none"
                placeholder="password"
                required
              />
            </div>
            {error && (
              <p className="text-center -m-2 text-red-400 font-bold">
                {error}
              </p>
            )}
            <button
              className="font-urbanist bg-slate-800 w-1/2 self-center rounded-lg text-lg disabled:bg-gray-900 disabled:text-gray-600 hover:scale-110 hover:transition-transform"
              type="submit"
              disabled={bool}
            >
              Login
            </button>
            <button
              className="font-urbanist bg-slate-800 w-1/2 self-center rounded-lg text-lg -mt-2 disabled:bg-gray-900 disabled:text-gray-600 hover:scale-110 hover:transition-transform"
              type="button"
              onClick={demoLogin}
              disabled={bool}
            >
              Demo Login
            </button>
            <p className="self-center">
              Don't have an account?{" "}
              <Link
                className="font-urbanist text-lg hover:underline"
                to="../signup"
              >
                Signup
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
