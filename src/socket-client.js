const ioClient = require("socket.io-client");

const socket = ioClient.connect("http://localhost:3001");

socket.on("error", function(err) {
  console.log("received socket error:");
  console.log(err);
});

const registerOnReceiveChatMessage = onChatMessageReceived => {
  socket.on("chatMessage", onChatMessageReceived);
};

const unregisterOnReceiveChatMessage = () => {
  socket.off("chatMessage");
};

const registerOnReceiveUsersOnline = onUsersOnlineReceived => {
  socket.on("usersOnline", onUsersOnlineReceived);
};

const unregisterOnReceiveUsersOnline = () => {
  socket.off("usersOnline");
};

const fetchGameRooms = () => {
  socket.emit("gameRooms");
};

const registerOnReceiveGameRooms = onGameroomsReceived => {
  socket.on("gameRooms", onGameroomsReceived);
};

const unregisterOnReceiveGameRooms = () => {
  socket.off("gameRooms");
};

const sendChatMessage = ({ message, user }) => {
  socket.emit("chatMessage", { message, user });
};

const addUser = ({ nickname, roomId }) => {
  socket.emit("addUser", { nickname, roomId });
};

const registerOnReceiveAddUserSuccess = onAddUserSuccessReceived => {
  socket.on("addUserSuccess", onAddUserSuccessReceived);
};

const unregisterOnReceiveAddUserSuccess = () => {
  socket.off("addUserSuccess");
};

const joinRoom = ({ roomId }) => {
  socket.emit("joinRoom", { roomId });
};

const registerOnJoinRoomSuccess = onAddUserSuccessReceived => {
  socket.on("joinRoomSuccess", onAddUserSuccessReceived);
};

const unregisterOnJoinRoomSuccess = () => {
  socket.off("joinRoomSuccess");
};

export const io = {
  registerOnReceiveChatMessage,
  unregisterOnReceiveChatMessage,
  sendChatMessage,
  registerOnReceiveUsersOnline,
  unregisterOnReceiveUsersOnline,
  addUser,
  registerOnReceiveAddUserSuccess,
  unregisterOnReceiveAddUserSuccess,
  fetchGameRooms,
  registerOnReceiveGameRooms,
  unregisterOnReceiveGameRooms,
  joinRoom,
  registerOnJoinRoomSuccess,
  unregisterOnJoinRoomSuccess
};
