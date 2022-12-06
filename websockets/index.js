const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});
httpServer.listen(8080, () => {
  console.log("listening on *:8080");
});
io.on("connection", (socket) => {
  console.log(`client ${socket.id} has connected`);
  socket.on("register", (msgData) => {
    if (msgData === "driver") {
      socket.join("drivers");
    }
  });

  socket.on("order-cancelled", (order) => {
    socket.to("drivers").emit("order-cancelled", order);
    console.log(`order ${order} cancelled`);
  });

  socket.on("order-ready", (order_id) => {
    socket.to("drivers").emit("order-ready", order_id);
    console.log(`order ${order_id} ready`);
  });
});
