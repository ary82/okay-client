import React, { useEffect, useState } from "react";
import Logout from "./Logout";
import axios from "axios";

export default function UserHome() {
  const [users, setusers] = useState([]);
  const getUsernames = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/users",
    }).then((res) => {
      setusers(res.data);
    })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getUsernames();
  }, []);

  return (
    <>
      <div>UserHome</div>
      <Logout />
      <ul>
        {users.map((user) => <li key={user._id}>{user.username}</li>)}
      </ul>
    </>
  );
}
