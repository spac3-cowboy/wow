import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector, setUser } from "../app/features/auth/authSlice";
import { BASE_URL } from "../constants/API";

export default function LoginPage() {
  const {isAuthenticated,redirectURL} = useSelector(authSelector)
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUpdateData = (e) => {
    let { name, value } = e.target;
    setData((prv) => {
      return {
        ...prv,
        [name]: value,
      };
    });
  };

  function handleLogin() {
     fetch(`${BASE_URL}/api/user/login`, {
        method: "POST",
        body:JSON.stringify(data),
        headers:{
          'Content-type':"application/json"
        }
     }).then(res=>res.json()).then(({data}) => {
      let {loggedInUser} = data;
      localStorage.setItem('USER_DATA', JSON.stringify(loggedInUser))
      dispatch(setUser(loggedInUser))
      toast.success(`Welcome ${loggedInUser.name}`, {
        duration:3000
        })
      navigate(redirectURL?redirectURL:'/')
      }).catch((err) => {
        console.log("ERROR:", err)
         setError(err.msg)
      })
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate(redirectURL?redirectURL:'/')
    }
  },[isAuthenticated])

  return (
    <div className=" h-screen w-full">
      <h1 className="text-center text-xl">Login Page</h1>
      <section className=" flex flex-col max-w-xl mx-auto mt-10 gap-5">
        <input
          className=" border rounded-md px-4 py-2 outline-none "
          placeholder="Email"
          type={"email"}
          name="email"
          value={data.email}
          onChange={handleUpdateData}
        />
        <input
          className=" border rounded-md px-4 py-2 outline-none "
          placeholder="Password"
          type={"password"}
          name="password"
          value={data.password}
          onChange={handleUpdateData}
        />
      {error &&   <p className=" text-cyan-500 font-bold">
          {error}
        </p>}
        <div className=" w-full flex flex-col gap-5">
          <button className=" underline" onClick={() => {
            navigate('/register')
                  }}>
          don't have an account ? register now
        </button>
        <button
          onClick={() => {
            handleLogin()
          }}
          className=" border rounded-md w-fit px-5 py-2 mx-auto"
        >
          Login
        </button>
</div>
      </section>
    </div>
  );
}
