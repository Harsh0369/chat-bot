import React from "react";
import { useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../components/Loading";
import { useState } from "react";
import { UserData } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");

  const { loginUser, btnLoading } = UserData();
  const navigate = useNavigate();


  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, navigate);
   }
  return (
    <div className="flex justify-center items-center h-screen bg-zinc-700">
      <form
        className="w-1/3 md:w-[500] bg-slate-200 rounded-md shadow-md p-6"
        onSubmit={submitHandler}
      >
        <h2 className="text-pretty font-semibold text-blue-500 text-2xl">
          Login
        </h2>
        <div className="mt-4">
          <label
            htmlFor="email"
            className="text-pretty font-semibold focus:bg-black"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            className="w-full mt-1.5 mb-4 p-1.5 border border-gray-300 rounded-md focus:bg-zinc-200  focus:ring-slate-500"
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <button
          className="bg-blue-500 rounded-lg py-2 px-4 text-white text-sm mt-1 hover:bg-blue-600 cursor-pointer hover:scale-110 hover:font-semibold"
          disabled={btnLoading}
        >
          {btnLoading ? <LoadingSpinner /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
