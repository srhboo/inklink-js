const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const R = require("ramda");
const { generateRandomId } = require("./utils/id");

let usersOnline = {};
let gameRooms = { "23jfkwe9": { roomId: "23jfkwe9", name: "juniper" } };

io.on("connection", function(socket) {
  // client.on("register", handleRegister);

  // client.on("join", handleJoin);

  // client.on("leave", handleLeave);
  // client.on("chatrooms", handleGetChatrooms);

  // client.on("availableUsers", handleGetAvailableUsers);
  socket.on("chatMessage", ({ message, user }) => {
    io.in(user.currentRoomId).emit("chatMessage", { message, user });
  });
  socket.on("addUser", ({ nickname }) => {
    const newUser = {
      nickname,
      userId: socket.id,
      currentRoomId: "lobby"
    };
    socket.emit("addUserSuccess", { user: newUser });
    usersOnline = R.assoc(socket.id, newUser, usersOnline);
    io.emit("usersOnline", { usersOnline: R.values(usersOnline) });
  });

  console.log("connected");

  socket.on("disconnect", function() {
    console.log("client disconnect...", socket.id);
    usersOnline = R.dissoc(socket.id, usersOnline);
    // handleDisconnect();
  });

  socket.on("error", function(err) {
    console.log("received error from client:", socket.id);
    console.log(err);
  });

  socket.on("gameRooms", () => {
    io.emit("gameRooms", { gameRoomsById: gameRooms });
  });

  socket.on("addGameRoom", ({ name }) => {
    const roomId = generateRandomId();
    gameRooms = R.assoc(roomId, { roomId, name });
    io.emit("gameRooms", { gameRoomsById: gameRooms });
  });

  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    usersOnline = R.assocPath(
      [socket.id, "currentRoomId"],
      roomId,
      usersOnline
    );
    const user = usersOnline[socket.id];
    socket.emit("joinRoomSuccess", { roomId, user });
    io.in(roomId).emit("chatMessage", {
      message: `${user.nickname} has joined`
    });
  });
});

http.listen(3001, function() {
  console.log("listening on *:3001");
});
