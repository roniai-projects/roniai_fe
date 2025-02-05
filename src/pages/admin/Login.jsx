import React, { useState } from "react";
import logoWide from "../../assets/logo-wide.png";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }

      const loginData = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        `${API_BASE_URL}/login`,
        loginData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.token;
      localStorage.setItem("jwtToken", token);

      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error:", error);
      setError("Incorrect email or password.");
    }
  };

  return (
    <main className="flex flex-row w-full min-h-screen h-auto bg-gray-50">
      <section className="grow relative">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt=""
          className="object-cover h-full absolute z-0"
        />
        <div className="h-full w-full bg-black/30 absolute z-10" />
      </section>
      <form
        onSubmit={handleLogin}
        className="max-w-xl w-full flex flex-col items-center justify-center gap-4"
      >
        <div className="flex flex-col gap-1">
          <img src={logoWide} alt="" className="w-44 h-auto mx-auto mb-2" />
          <label htmlFor="email" className="text-xs font-semibold">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            onChange={handleEmailChange}
            value={email}
            className="w-72 border rounded-lg px-5 py-2 text-xs placeholder:text-xs"
            placeholder="Enter your email address"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-xs font-semibold">
            Password
          </label>
          <input
            id="password"
            type="password"
            onChange={handlePasswordChange}
            value={password}
            className="w-72 border rounded-lg px-5 py-2 text-xs placeholder:text-xs"
            placeholder="Enter your password"
          />
        </div>
        <button
          className="bg-gradient-to-r mx-auto from-[#EDC6D7] via-[#CDB6D6] to-[#B0A7D4] rounded-full px-5 py-2 font-semibold text-sm hover:opacity-80 w-72 mt-2"
          type="submit"
        >
          Log In
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </form>
    </main>
  );
};

export default Login;
