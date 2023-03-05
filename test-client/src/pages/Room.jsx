import React, { useCallback, useEffect, useRef, useState } from 'react'
import { authSelector } from '../app/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import socket from '../utils/Socket';
import { toast } from 'react-hot-toast';
import { resetRoom, roomSelector, setLocalStream, setRoom } from '../app/features/room/roomSlice';
import { peer } from '../utils/PeerInstance';
import VideoPlayer from '../components/VideoPlayer';
import AudioPlayer from '../components/AudioPlayer';
export default function Room() {
  const { user } = useSelector(authSelector)
  const dispatch = useDispatch();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { users, currentRoom ,audioStatus,videoStatus} = useSelector(roomSelector);
  const currentPeerIdRef = useRef(null);
  const getMediaDevices = navigator.mediaDevices;
  const [streams, setStreams] = useState([])
  const [makingCall,setMakingCall] = useState(false);
  const config = {
    "AUDIO":{
      video:false,
      audio:true,
    },
    "VIDEO":{
      audio:true,
      video:true
    }
  }
  const streamSetting = config[currentRoom?.roomType || 'VIDEO']

  //   useEffect(() => {
  //       // For POST in SOCKET
  //       // for connect to a new user...
  //       if (!roomId || !user) return
  //           socket.connect()
  //           socket.emit('connect-room', {
  //               userId: user?._id,
  //               roomId    
  //               })        
  //   }, [socket,roomId,user])
    
  //   useEffect(() => {
  //       // For GET from SOCKET
  //       socket.on(`connect-room-${roomId}`, (payload) => {
  //           // dispatch(setRoom(payload.room))
  //         toast.success(`${payload.user.name} has joined !`);
  //       })

  //       socket.on('get-room', ({ room }) => {
  //           dispatch(setRoom(room))
  //       })


  //       // handle disconnect user
  //       socket.on(`disconnected-from-room-${roomId}`, ({ user, room }) => {
  //          dispatch(setRoom(room))
  //         toast.error(`${user.name} is disconnected from room !`)
  //         //
  //         // when we are creating with dom
  //         // document.getElementById(user.peerId).remove();

  //         setStreams(prv=>prv.filter(x=>x.peerId != user.peerId))
  //       })

  //       return () => {
  //           socket.off(`connect-room-${roomId}`);
  //           socket.off(`disconnected-from-room-${roomId}`)
  //           socket.off('get-room')
  //       }
  //   },[socket])



  //   // Streaming features 
  // const saveVideoStream = (peerId, stream) => {
  //  let isExist = document.getElementById(peerId);
  //   if (isExist) {
  //     return
  //   }
  //     setStreams((prv) =>
  //     prv.filter(x=>x.peerId !== peerId).concat({
  //       peerId,
  //       stream,
  //     })
  //   );

  //   // let videoEl = document.createElement("video");
  //   // videoEl.id = peerId;
  //   // videoEl.srcObject = stream;
  //   // videoEl.addEventListener("loadedmetadata", () => {
  //   //   videoEl.play();
  //   // });

  //   // const videoGridRef = document.getElementById("videoGrid");

  //   // videoGridRef.append(videoEl);
  //   // let totalUsers = document.getElementsByTagName("video").length;
  //   // if (totalUsers > 1) {
  //   //   for (let index = 0; index < totalUsers; index++) {
  //   //     document.getElementsByTagName("video")[index].style.width =
  //   //       100 / totalUsers + "%";
  //   //   }
  //   // }
  // }


  
  // useEffect(() => {
  //     peer.on('open', (id) => {
  //     currentPeerIdRef.current = id;
  //       socket.emit('join-room', roomId, id, user?._id);
  //       getMediaDevices.getUserMedia(streamSetting).then(stream => {
  //           saveVideoStream(id, stream)
  //        })
  //   });

  //   peer.on('call', (call) => {
  //    getMediaDevices.getUserMedia(streamSetting).then(stream => {
  //       // saveVideoStream(currentPeerIdRef.current, stream)
  //       call.answer(stream);
  //     })
      
  //     call.on('stream', (remoteStream) => {
  //       saveVideoStream(call.peer, remoteStream);
  //     })
  //   })

  //   return ()=>{
  //     peer?.off('call')
  //     peer?.off('open')
  //   }
  // }, [peer,user,roomId,currentPeerIdRef,getMediaDevices])
  
  // useEffect(() => {
  //       socket.on(`user-connected-at-${roomId}`, (remotePeerId) => {
  //       getMediaDevices.getUserMedia(streamSetting).then(stream => {
  //         // saveVideoStream(currentPeerIdRef.current, stream)
  //         let call = peer.call(remotePeerId, stream);
  //         call.on('stream', (remoteStream) => {
  //           saveVideoStream(call.peer,remoteStream)
  //         })
  //     })
  //       });
  //   return () => {
  //     socket.off(`user-connected-at-${roomId}`)
  //     peer?.off('call')
  //   }
  // },[socket,peer])

  async function userJoin(){
    // user exists
    socket.emit('user-exists',{user,socketId:socket.id,roomId})

    // if user found...
    socket.on('user-found',(currentUser)=>{
      if(currentUser){
        socket.emit('update-user',{
          user:currentUser,
          socketId:socket.id,
        })
      }
    })

    socket.on('user-notfound',()=>{
      socket.emit('user-join',{roomId,user})
    })
  }

  useEffect(()=>{
    userJoin();
  },[socket])



  return (
      <div className=' h-screen w-screen bg-cyan-200 '>
          <h6 className=' text-center py-2 m-0'>
              Name: {user?.name}
          </h6>
          <h6 className=' text-center py-5'>
            <span className=' text-rose-600 font-bold'> {currentRoom?.roomType}</span> RoomID: {roomId}
          </h6>

      <section id="videoGrid" >
          
      </section>

      <section className="grid grid-cols-4 gap-5 place-items-center">
      {currentRoom && streams?.map((x, idx) => <div key={idx} className=" rounded-lg m-2 p-2 bg-[rgba(0,0,0,0.2)]" >
        {
          videoStatus?<VideoPlayer stream={ x.stream } muted={currentPeerIdRef.current === x.peerId} /> :<AudioPlayer muted={currentPeerIdRef.current === x.peerId} stream={ x.stream } />
        }
        <p className='  text-center font-bold'>
          {
            users?.find(item=>item.peerId === x.peerId)?.name
          }
        </p>
      </div>)} 
      </section>


          <div className=' p-10 pt-5'>
               <h2>
             connected Users :
          </h2>
          <div className=' max-h-40 overflow-y-scroll container  flex gap-2 flex-wrap'>
              {
                      users?.map((x, idx) => {
                          let isAdmin = x._id === currentRoom.createdBy;
                      return <div key={idx} className=' flex gap-2 bg-[rgba(0,0,0,0.2)] text-black my-2 p-2 w-fit rounded-md'>
                          {isAdmin && <span className=' text-white bg-red-400 px-2'>Admin</span>}
                          <span>
                              {idx + 1}.
                          </span>
                          <h4>
                              {x.name}
                          </h4>
                         
                      </div>
                  })
              }
          </div>
          </div>
         

          <div className="flex justify-around">
              <button
                  onClick={() => {
            socket.disconnect();
            dispatch(resetRoom())
                      navigate('/')
               }}
                  className='bg-red-400 text-white  px-5 py-2 rounded-md'>
              Leave Meeting
              </button>
              {/* <button className=' bg-pink-400 text-white px-5 py-2 rounded-md'>
                  ask to perticipate
              </button> */}
         </div>
    </div>
  )
}
