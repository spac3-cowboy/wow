import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { BASE_URL } from "../constants/API";
import toast from 'react-hot-toast'
import { useSelector } from "react-redux";
import { authSelector } from "../app/features/auth/authSlice";

export default function NewHome() {
  const navigate = useNavigate();
  const [roomInput, setRoomInput] = useState("");
  const { user } = useSelector(authSelector);
  const handleCreateRoom = async () => {
    const { data } = await axios.post(`${BASE_URL}/api/v1/room/create`, {
      data: { createdBy: user._id }
    });
    if (data.success) {
      toast.success('Room Created !');
      navigate(`/room/${data.room._id}`)
    } else {
      toast.error("Something went wrong! please try again.")
    }
}


  return (
  
      <section className="flex h-screen  justify-center gap-10 flex-col items-center p-10">

        <button
          className=" border px-5 py-2 bg-red-300"
          onClick={() => {
           handleCreateRoom()
          }}
        >
          Create a room
        </button>

        <p>or</p>
        
      <div className="border p-5 flex gap-5">
          <input
            type="text"
            name="room"
            id=""
            onChange={(e) => setRoomInput(e.target.value)}
            value={roomInput}
            className="outline-none border p-2"
            placeholder="ENTER Room ID"
          />
        <button
          className=" px-2 border rounded-md"
            onClick={() => {
              navigate(`/room/${roomInput}`);
            }}
          >
            Join ROOM
          </button>
      </div>

      </section>
  );
}
