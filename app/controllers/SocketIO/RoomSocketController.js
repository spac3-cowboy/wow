const Handler = lulu.use('app/errors/Handler');
const UserService = lulu.use('app/services/UserService');
const response = lulu.use('app/responses/Response');
// const Active = lulu.use('app/models/mongoose/Active')
module.exports = {
    joinRoom:async({io,socket,event,payload})=>{
        socket.join(payload.roomId)
    },
    userExistCheck:async({io,socket,event,payload})=>{
        const {socketId,user} = payload;
        let isActive = await Active.findOne({
            email:user.email
        });
        if(isActive){
            io.in(socketId).emit('user-found',user);
        }else{
            io.in(socketId).emit('user-notfound');
        }  
    },
    updateUser:async ({io,socket,event,payload})=>{
        //socket.on('update-user')
        const {roomId,user,socketId} = payload;
        socket.join(roomId);

        // Find user in active and update
        await Active.findOneAndUpdate({
           email:user.email
        },{
            $set:{
                roomId,
            }
        },{
            new:true
        });

        let activeUsers = await Active.find({
            roomId
        });

        let allUsers = activeUsers?.filter(x=>x.email != user.email);

        io.in(socketId).emit('activeUsers',activeUsers);

        // notify every user that someone joined !
        socket.to(roomId).broadcast.emit('new-user-join',[{...user,socketId}])

        
    },
    userJoin:async({io,socket,event,payload})=>{
        //socket.on('user-join')
        const {roomId,user,socketId} = payload;
        socket.join(roomId);

        // store new user to activeList

        let isActive = await Active.findOne({email:user.email});

        if(!isActive){
            const active = await Active.create({
                ...user,
                roomId
            })
            let activeUsers = await Active.find({
                roomId
            });
            let allUsers = activeUsers?.filter(x=>x.email != user.email);
    
            io.in(socketId).emit('activeUsers',activeUsers);
        }else{
            socket.to(roomId).broadcast.emit('new-user-join',user)
        }
    },
    joinStreamRoom:async({io,socket,event,payload})=>{
        //socket.on('join-stream-room')
        const {roomId,peerId,socketId,user} = payload;

        socket.join(roomId)
        // Emit ot other users
        socket.to(roomId).broadcast.emit('user-connected',{
            peerId,
            user,
            roomId,
            socketId
        })        

    },

    list : async function (ws) {
        try{
            const users = await UserService.list();
            ws.io.emit(ws.event, response.build('User List Loaded', {users}, 200)); // wrap data in object to avoid confusion
            ws.io.emit('some/other/event', response.build('Some Other Event Emitted', {
                lulu: true,
                userCount: users.length,
                usersAreHero: false,
            }, 200)); // wrap data in object to avoid confusion
        }
        catch(error){
            ws.io.emit(ws.event, Handler(error));
        }
    },
    privateProfileDetails : async function (ws) {
        try{
            const user = await UserService.details(ws.payload.privateId);
            ws.io.emit(ws.event, response.build('Private User Details Loaded.', {user}, 200)); // wrap data in object to avoid confusion
        }
        catch(error){
            ws.io.emit(ws.event, Handler(error));
        }
    }
}