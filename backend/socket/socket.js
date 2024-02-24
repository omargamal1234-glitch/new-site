import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
  },
});

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // Emit online users to everyone
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // Handle disconnections
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  // Handle message sending
  socket.on("sendMessage", (data) => {
    const { senderId, receiverId, message } = data;

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      // Send the message to the receiver's socket
      io.to(receiverSocketId).emit("receiveMessage", { senderId, message });
    } else {
      // Handle the case where the receiver is not online
      console.log("Receiver not online:", receiverId);
      // You can send a notification to the sender, store the message for later delivery, etc.
    }
  });
});

export { app, io, server };
