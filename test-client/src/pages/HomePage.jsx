import { Modal } from "@mantine/core";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSelector } from "../app/features/auth/authSlice";
import { BASE_URL } from "../constants/API";
export default function HomePage() {
  const [modalPreview, setModalPreview] = useState(false);
  const {user} = useSelector(authSelector);
  const navigate = useNavigate();

  const handleCreateRoom =  async ( type='VIDEO'||"AUDIO" ) => {
    try{
      const { data } = await axios.post(`${BASE_URL}/api/v1/room/create`, {
        data: { createdBy: user._id,roomType:type }
      });
      if (data.success) {
        toast.success('Room Created !');
        navigate(`/room/${data.room._id}`)
      } else {
        console.log(data,'e')
        toast.error("Something went wrong! please try again.")
      }
    }catch(err){
      console.log(err,'err')
      toast.error("Something went wrong! please try again.")
    }
  }

  return (
    <div className=" bg-blue-100 h-screen">
      <h1 className="text-xl text-center">Hello ! {user?.name}</h1>

      <div className=" flex justify-around mt-20">

        <button
          onClick={() => {
            setModalPreview(true);
          }}
          className="px-5 py-2 bg-red-200 text-center rounded-md "
        >
          Go Live
        </button>
      </div>
      <Modal
        opened={modalPreview}
        centered
        onClose={() => {
          setModalPreview(false);
        }}
      >
        <section className="grid grid-cols-2 gap place-items-center h-full">
          <div className="">
            <button
              onClick={() => {
               handleCreateRoom('AUDIO')
              }}
              className="px-5 py-2 bg-red-200 text-center rounded-md "
            >
              Audio
            </button>
          </div>
          <div className="">
            <button
              onClick={() => {
                handleCreateRoom('VIDEO')
              }}
              className="px-5 py-2 bg-green-200 text-center rounded-md "
            >
              Video
            </button>
          </div>
        </section>
      </Modal>
    </div>
  );
}
