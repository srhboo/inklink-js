const io = require("socket.io-client");

export default function() {
  const socket = io.connect("http://localhost:3001");

  function registerHandler(onMessageReceived) {
    socket.on("message", onMessageReceived);
  }

  function unregisterHandler() {
    socket.off("message");
  }

  socket.on("error", function(err) {
    console.log("received socket error:");
    console.log(err);
  });

  // function register(name) {
  //   socket.emit("register", name);
  // }

  // function join(chatroomName) {
  //   socket.emit("join", chatroomName);
  // }

  // function leave(chatroomName) {
  //   socket.emit("leave", chatroomName);
  // }

  function message(msg) {
    socket.emit("message", msg);
  }

  // function getChatrooms(cb) {
  //   socket.emit("chatrooms", null, cb);
  // }

  // function getAvailableUsers(cb) {
  //   socket.emit("availableUsers", null, cb);
  // }

  return {
    // register,
    // join,
    // leave,
    message,
    // getChatrooms,
    // getAvailableUsers,
    registerHandler,
    unregisterHandler
  };
}
