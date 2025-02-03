import React, { useState } from "react";
import twitter from "../Images/64cebe06bc8437de66e41758_X-EverythingApp-Logo-Black-Twitter.jpg";
//import { TWEET_API_END_POINT } from "../utils/constant.js";
import { USER_API_END_POINT } from "../utils/constant.js";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice.js";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    //  console.log(name, username, email, password);
    if (isLogin) {
      //login
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/login`,
          {
            Email,
            Password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        // console.log(res);
        dispatch(getUser(res?.data?.user));
        if (res.data.success) {
          Navigate("/");
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      //signUp
      try {
        const res = await axios.post(
          `${USER_API_END_POINT}/register`,
          {
            Name,
            Username,
            Email,
            Password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log(res);
        if (res.data.success) {
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const LoginSignupHandler = () => {
    setIsLogin(!isLogin);
  };
  return (
    <div className="w-screen h-screen  flex items-center justify-center">
      <div className="flex items-center justify-evenly w-[80%]">
        <div>
          <img
            className="ml-4 mt-11"
            src={twitter}
            width={"350px"}
            alt="twitter-logo"
          />
        </div>
        <div>
          <div className="my-5">
            <h1 className="font-bold text-6xl">Happening now.</h1>
          </div>
          <h1 className="mt-4 mb-2 text-2xl font-bold">
            {isLogin ? "Login" : "Signup"}
          </h1>
          <form className="flex flex-col w-[60%]" onSubmit={submitHandler}>
            {!isLogin && (
              <>
                <input
                  type="text"
                  value={Name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  placeholder="Name"
                  className="border border-gray-500 outline-blue-500 rounded-lg px-3 py-2 m-1 
                font-semibold"
                />
                <input
                  type="text"
                  value={Username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="UserName"
                  className="border border-gray-500 outline-blue-500 rounded-lg px-3 py-2 m-1
                font-semibold"
                />
              </>
            )}
            <input
              type="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              className="border border-gray-500 outline-blue-500 rounded-lg px-3 py-2 m-1 font-semibold"
            />
            <input
              type="password"
              value={Password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              className="border border-gray-500 outline-blue-500 rounded-lg px-3 py-2 m-1
              font-semibold"
            />
            <button className="bg-[#1D9BF0]  py-2 rounded-full my-4 text-white text-lg">
              {isLogin ? "Login" : "Signup"}
            </button>
            <h1>
              {isLogin ? "Dont have an account?" : "Already have an account?"}
              {""}
              <span
                onClick={LoginSignupHandler}
                className="cursor-pointer underline font-bold text-blue-600"
              >
                {isLogin ? "Signup" : "Login"}
              </span>
            </h1>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
