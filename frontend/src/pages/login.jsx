import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const navigale = useNavigate();
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      toast.error("all Information Requred");
      return;
    }

    try {
      const url = `${BASE_URL}/api/auth/login`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", JSON.stringify(data?.token));
        localStorage.setItem("login-User", JSON.stringify(data?.user));
        toast.success(data?.message);
        navigale("/admin");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <div
        className="max-w-sm border border-gray-300 shadow-lg bg-white rounded-lg "
        style={{ margin: "15px", padding: "2rem" }}
      >
        <h2
          className="text-2xl font-semibold text-center text-gray-800"
          style={{ paddingTop: "1.25rem" }}
        >
          Please Login
        </h2>
        <form
          onSubmit={handleLoginForm}
          className="space-y-4 max-w-sm"
          style={{ margin: "auto", paddingTop: "1.5rem" }}
        >
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg"
            style={{ padding: "0.75rem 1.25rem", marginBottom: "1rem" }}
            onChange={handleInputs}
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            required
          />
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg"
            style={{ padding: "0.75rem 1.25rem", marginBottom: "1rem" }}
            onChange={handleInputs}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="w-full bg-red-500 text-white hover:bg-red-600 font-medium rounded-lg shadow-md transition duration-300 cursor-pointer flex items-center justify-center"
            style={{ marginTop: "1rem", padding: "0.75rem" }}
          >
            Login
          </button>
        </form>
        <p
          className="italic text-sm text-center text-gray-600 mt-4"
          style={{ margin: "1rem 0" }}
        >
          Don't have an account ?{" "}
          <Link
            to="/ragester"
            style={{ textDecoration: "underline" }}
            className="text-red-500 "
          >
            Register
          </Link>
          here
        </p>
      </div>
    </section>
  );
};

export default Login;
