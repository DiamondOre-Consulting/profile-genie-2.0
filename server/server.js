import cloudinary from "cloudinary";
import app from "./app.js";
import connectionToDB from "./config/db.config.js";
import { Server } from "socket.io";
import http from "http";
import { getAllSystemStats } from "./controller/admin.controller.js";

const PORT = process.env.PORT || 5500;

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

getAllSystemStats(io);
setInterval(() => {
  getAllSystemStats(io);
}, 10000);

server.listen(PORT, async () => {
  await connectionToDB();
  console.log("App is running at :" + PORT);
});
