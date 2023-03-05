import { createSlice } from '@reduxjs/toolkit'
let initialState = {
    currentRoom: null,
    users: [],
    audioStatus:true,
    videoStatus:false,
    localStream:null,
}
const roomSlice = createSlice({
    name: 'room',
    initialState,
    reducers: {
        setRoom: (state, { payload }) => {
            state.currentRoom = payload;
            state.users = payload.users;
            if(payload.roomType==="AUDIO"){
                state.audioStatus = true;
                state.videoStatus = false;
            }else if(payload.roomType === "VIDEO"){
                state.audioStatus = true;
                state.videoStatus = true;
            }
   
        },
        setLocalStream:(state,{payload})=>{
            state.localStream = payload;
        },
        resetRoom:()=>{
            return initialState
        }
    }
});

export default roomSlice.reducer;

export const { setRoom ,resetRoom,setLocalStream} = roomSlice.actions;

export const roomSelector = (state) => state.room;