const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

io.on("connection", function(socket) {
  // client.on("register", handleRegister);

  // client.on("join", handleJoin);

  // client.on("leave", handleLeave);

  socket.on("chatMessage", ({ message, nickname }) => {
    io.emit("chatMessage", { message, nickname });
  });

  // client.on("chatrooms", handleGetChatrooms);

  // client.on("availableUsers", handleGetAvailableUsers);
  console.log("connected");

  socket.on("disconnect", function() {
    console.log("client disconnect...", socket.id);
    // handleDisconnect();
  });

  socket.on("error", function(err) {
    console.log("received error from client:", socket.id);
    console.log(err);
  });
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
