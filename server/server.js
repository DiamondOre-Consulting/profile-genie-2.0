import cloudinary from "cloudinary";
import app from "./app.js";
import connectionToDB from "./config/db.config.js";
import { Server } from "socket.io";
import http from "http";
import { getAllSystemStats } from "./controller/admin.controller.js";

const PORT = process.env.PORT || 8000;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// getAllSystemStats(io);
// setInterval(() => {
//   getAllSystemStats(io);
// }, 10000);

const start = async () => {
  await connectionToDB();
  server.listen(PORT, "0.0.0.0", () => {
    console.log("App is running at :" + PORT);
  });
};

const shutdown = (signal) => {
  console.log(`${signal} received. Closing server...`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10000).unref();
};

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));

start().catch((error) => {
  console.error("Unable to start server", error);
  process.exit(1);
});
