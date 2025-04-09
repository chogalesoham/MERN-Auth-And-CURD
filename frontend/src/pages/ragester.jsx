import React, { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Register = () => {
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setRegisterInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password } = registerInfo;
    if (!name || !email || !password) {
      toast.error("All Fields Are Required");
      return;
    }

    try {
      const url = `${BASE_URL}/api/auth/signin`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerInfo),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data?.message);
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Register error:", error);
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <div className="max-w-sm border border-gray-300 shadow-lg bg-white rounded-lg p-8 m-4">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4 max-w-sm mx-auto">
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg px-4 py-3"
            onChange={handleInput}
            type="text"
            name="name"
            placeholder="User Name"
            required
          />
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg px-4 py-3"
            onChange={handleInput}
            type="email"
            name="email"
            placeholder="Email Address"
            required
          />
          <input
            className="w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-lg px-4 py-3"
            onChange={handleInput}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white hover:bg-red-600 font-medium rounded-lg shadow-md transition duration-300 px-4 py-3"
          >
            Register Now
          </button>
        </form>
        <p className="italic text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/" className="text-red-500 underline">
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
