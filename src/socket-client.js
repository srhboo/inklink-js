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

const sendChatMessage = ({ message, nickname }) => {
  socket.emit("chatMessage", { message, nickname });
};
// const test = function() {
// function register(name) {
//   socket.emit("register", name);
// }

// function join(chatroomName) {
//   socket.emit("join", chatroomName);
// }

// function leave(chatroomName) {
//   socket.emit("leave", chatroomName);
// }

// function getChatrooms(cb) {
//   socket.emit("chatrooms", null, cb);
// }

// function getAvailableUsers(cb) {
//   socket.emit("availableUsers", null, cb);
// }

// return {
// register,
// join,
// leave,
// chatMessage,
// getChatrooms,
// getAvailableUsers,
//     registerHandler,
//     unregisterHandler
//   };
// };

export const io = {
  registerOnReceiveChatMessage,
  unregisterOnReceiveChatMessage,
  sendChatMessage
};
