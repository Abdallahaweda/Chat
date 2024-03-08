const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onLineUsers = [];

io.on("connection", (socket) => {
  console.log("message", socket.id);

  //listen to a connection

  socket.on("addNewUser", (userId) => {
    !onLineUsers.some((user) => user.userId === userId) &&
      onLineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("onLineUsers", onLineUsers);
    io.emit("getOnLineUsers", onLineUsers);
  });
  //* add message
  socket.on("sendMessage", (message) => {
    const user = onLineUsers.find(
      (user) => user.userId === message.recipientId
    );
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });
  socket.on("disconnect", () => {
    onLineUsers = onLineUsers.filter((user) => user.socketId !== socket.id);

    io.emit("getOnLineUsers", onLineUsers);
  });
});

io.listen(5000);
