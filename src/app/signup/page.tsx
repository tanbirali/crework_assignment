"use client";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
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
          name="name"
          id="name"
          placeholder="Full name"
          className="outline-none bg-slate-50 border rounded-md w-full p-2"
        />
        <input
          type="text"
          name="email"
          id="email"
          placeholder="Your email"
          className="outline-none bg-slate-50 border rounded-md w-full p-2"
        />
        <div className="flex w-full border rounded-md items-center">
          <input
            type={`${showPassword ? "text" : "password"}`}
            name="password"
            id="password"
            placeholder="Password"
            className="outline-none bg-slate-50 p-2 w-full"
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
        <button className="w-full bg-violet-500 rounded-md border text-white p-2">
          Sign up
        </button>
        <h1 className="text-slate-600">
          Already have an account?{" "}
          <a href="/" className="text-none text-blue-600">
            Log In.
          </a>
        </h1>
      </div>
    </main>
  );
};

export default SignUp;
