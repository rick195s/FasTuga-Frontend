const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://127.0.0.1:5173",
    methods: ["GET", "POST"],
  },
});
httpServer.listen(8081, () => {
  console.log("listening on *:8081");
});

io.on("connection", (socket) => {
  console.log(`client ${socket.id} has connected`);

  // register as driver, chef, delivery, etc
  socket.on("register", (msgData) => {
    socket.join(msgData);
  });

  socket.on("order-cancelled", (order_id) => {
    socket.to("drivers").emit("order-cancelled", order_id);
    socket.to("chefs").emit("order-cancelled", order_id);
    socket.to("board").emit("order-cancelled", order_id);

    console.log(`order ${order_id} cancelled`);
  });

  socket.on("order-ready", (order_id) => {
    socket.broadcast.emit("order-ready", order_id);
    console.log(`order ${order_id} ready`);
  });

  socket.on("order-delivered", (order_id) => {
    socket.to("managers").emit("order-delivered", order_id);
    socket.to("board").emit("order-delivered", order_id);

    console.log(`order ${order_id} delivered`);
  });

  socket.on("new-order", (order) => {
    order.order_items?.forEach((item) => {
      if (item.product.type == "hot dish") {
        socket.to("chefs").emit("new-order");
      }
    });

    socket.to("board").emit("new-order");
    console.log(`new order`);
  });
});
