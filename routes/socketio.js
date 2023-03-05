const wordart = lulu.use("app/misc/wordart");
const UserSocketController = lulu.use(
  "app/controllers/SocketIO/UserSocketController"
);
const RoomSocketController = lulu.use(
  "app/controllers/SocketIO/RoomSocketController"
);
const ChatThreadItemSocketController = lulu.use(
  "app/controllers/SocketIO/ChatThreadItemSocketController"
);
const chalk = require("chalk");
const ErrorResponse = lulu.use("app/responses/ErrorResponse");

module.exports = function (io) {
  console.log(wordart.socketio);
  let clients = 0;
  io.on("connection", function (socket) {
    clients++;
    console.log(
      "Socket IO :: New client connected. Total Now: " +
        chalk.green.bold(clients)
    );
    lulu.context.ws.io = io;
    lulu.context.ws.socket = socket;

    socket.onAny((eventName, payload) => {
      lulu.context.ws.event = eventName;
      lulu.context.ws.payload = payload;
    });

    socket.on("user/list", function (payload) {
      UserSocketController.list(lulu.context.ws);
    });

    socket.on("user/profile/private", function (payload) {
      UserSocketController.privateProfileDetails(lulu.context.ws);
    });

    socket.on("join-room", function (payload) {
      RoomSocketController.joinRoom(lulu.context.ws);
    });
    socket.on("user-exists", function (payload) {
      RoomSocketController.userExistCheck(lulu.context.ws);
    });
    socket.on("update-user", function (payload) {
      RoomSocketController.updateUser(lulu.context.ws);
    });
    socket.on("user-join", function (payload) {
      RoomSocketController.userJoin(lulu.context.ws);
    });

    socket.on("send-thread-item", function (payload) {
      ChatThreadItemSocketController.chatThreadItemHandler(lulu.context.ws);
    });

    socket.on("disconnect", function () {
      clients--;
      console.log(
        "Socket IO :: A client disconnected. Now Total: " +
          chalk.red.bold(clients)
      );
    });
  });
};
