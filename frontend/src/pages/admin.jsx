import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState();

  const handleLogout = () => {
    localStorage.removeItem("login-User");
    localStorage.removeItem("token");
    toast.success("User Logout Succesfull");
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("login-User");
    setLoginUser(JSON.parse(user));
  }, []);

  if (!loginUser) {
    navigate("/");
  }

  return (
    <div className=" flex flex-col items-center justify-center">
      <h1 className=" text-4xl font-bold">Admin Panel</h1>
      <h1 className=" text-4xl font-bold">User = {loginUser?.name}</h1>
      <button onClick={handleLogout} className=" p-2 bg-black text-white">
        LogOut
      </button>
    </div>
  );
};

export default Admin;
