import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home.jsx";
import Login from "./components/Login";
import Signup from "./components/Signup";
import store from "./helpers/store.js";
import GetUser from "./components/GetUser.jsx";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <GetUser />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
