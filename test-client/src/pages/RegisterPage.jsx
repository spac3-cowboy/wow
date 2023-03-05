import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/API";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { authSelector, setUser } from "../app/features/auth/authSlice";

export default function RegisterPage() {
  const dispatch = useDispatch();
    const {redirectURL} = useSelector(authSelector);
    const [data, setData] = useState({
      name:"albiummid",
    email: "albiummid@gmail.com",
      password: "autht6899",
      repeatPassword:"autht6899",
      baseRole:'User'
    
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleUpdateData = (e) => {
    let { name, value } = e.target;
    setData((prv) => {
      return {
        ...prv,
        [name]: value,
      };
    });
  };

  function handleRegister() {
    fetch(`${BASE_URL}/api/user/register/regular`, {
      method:"POST",
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json',
      }
     }).then(res=>res.json()).then(({data}) => {
              if ( data.newUser) {
                localStorage.setItem('USER_DATA', JSON.stringify(data.newUser))
                dispatch(setUser(data.newUser))
                              toast.success(`Welcome ${data.newUser.name}`, {
                  duration:3000
                  })
               navigate(redirectURL?redirectURL:'/')
              } else {
                alert("ERROR")
                setError(data.msg)
      }
      }).catch((err) => {
        console.log("ERROR:", err)
         setError(err.msg)
      })
  }

  return (
    <div className=" h-screen w-full">
      <h1 className="text-center text-xl">Register Page</h1>
          <section className=" flex flex-col max-w-xl mx-auto mt-10 gap-5">
        <input
          className=" border rounded-md px-4 py-2 outline-none "
          placeholder="Your name "
          type={"name"}
          name="name"
          value={data.name}
          onChange={handleUpdateData}
        />
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
        <input
          className=" border rounded-md px-4 py-2 outline-none "
          placeholder="Re-enter Password"
          type={"password"}
          name="repeatPassword"
          value={data.repeatPassword}
          onChange={handleUpdateData}
        />
      {error &&   <p className=" text-cyan-500 font-bold">
          {error}
        </p>}
              <div className=" w-full flex flex-col gap-5">
          <button className=" underline" onClick={() => {
            navigate('/login')
                  }}>
          have an account ? Login now
        </button>
        <button
          onClick={() => {
            handleRegister()
          }}
          className=" border rounded-md w-fit px-5 py-2 mx-auto"
        >
          Register
        </button>
</div>
      </section>
    </div>
  );
}
