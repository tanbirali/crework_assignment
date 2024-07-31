"use client";
import { useAuth } from "@/context/auth";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import Image from "next/image";
import { SyntheticEvent, useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  };
  const { login } = useAuth();
  const handleLogin = async (e: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/auth/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          email: `${formData.email}`,
          password: `${formData.password}`,
        }),
      });
      const data = await res.json();
      console.log(data);
      // console.log(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      login();
      setFormData({ email: "", password: "" });
    } catch (e) {
      console.log("Some Error occurred", e);
    }
  };
  return (
    <main
      className="flex min-h-screen flex-col
     items-center justify-between p-12 lg:p-24
     bg-gradient-to-b from-white to-violet-400"
    >
      <div
        className=" bg-white flex flex-col rounded-md border
       shadow-lg items-center p-2 lg:p-12 gap-6"
      >
        <h1 className="text-xl lg:text-3xl font-bold">
          Welcome to <span className="text-violet-800">Workflo</span>!{" "}
        </h1>
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Your email"
          className="outline-none bg-slate-50 border rounded-md w-full p-2"
          value={formData.email}
          onChange={handleInputChange}
        />
        <div className="flex w-full border rounded-md items-center">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            id="password"
            placeholder="Password"
            className="outline-none bg-slate-50 p-2 w-full"
            value={formData.password}
            onChange={handleInputChange}
          />
          {showPassword ? (
            <EyeIcon
              onClick={() => setShowPassword(false)}
              className="hover:cursor-pointer mr-1"
            />
          ) : (
            <EyeOffIcon
              onClick={() => setShowPassword(true)}
              className="hover:cursor-pointer mr-1"
            />
          )}
        </div>
        <button
          className="w-full bg-violet-500 
        rounded-md border text-white p-2"
          onClick={handleLogin}
        >
          Login
        </button>
        <h1 className="text-slate-600">
          Dont&apos;s have an account? Create a{" "}
          <a href="/signup" className="text-none text-blue-600">
            new account.
          </a>
        </h1>
      </div>
    </main>
  );
}
