import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Import individual routes from the correct paths
import { signupRoute, loginRoute, logoutRoute } from ".routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app } from "./socket/socket.js"; // Import only the app instance

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

dotenv.config();

const server = app.listen(PORT, () => { // Create the server from app
  connectToMongoDB();
  console.log(`Server Running on port ${PORT}`);
});

app.use(express.json()); // Parse incoming JSON requests
app.use(cookieParser());

app.use("/api/auth", signupRoute); // Mount routes individually
app.use("/api/auth", loginRoute);
app.use("/api/auth", logoutRoute);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
