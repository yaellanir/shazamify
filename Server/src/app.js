import express, { json, response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import path from "path";
import * as url from "url";

import "./Database/mongoose.js";
import userRouter from "./Routes/user.routes.js";
import matchesRouter from "./Routes/match.routes.js";
import deezerRouter from "./Routes/deezer.routes.js";

// import {createServer} from "http";
// import {Server} from "socket.io";
// import {socketIO} from "socket.io"
// import http from "http"

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const app = express();

const server = http.Server(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(json());
app.use(cors());
const publicPath = path.join(__dirname, "build");
app.use(express.static(publicPath));

app.use(userRouter);
app.use(matchesRouter);
app.use(deezerRouter);

io.on("connection", function (socket) {
  console.log("A user connected");

  //Whenever someone disconnects this piece of code executed
  socket.on("disconnect", function () {
    console.log("A user disconnected");
  });
});

// let server = http.createServer(app);
// let io = socketIO(server);
//  server.listen(PORT)

// const httpServer = createServer(app);
// const publicDirectoryPath = path.join(__dirname, "../../Client/public");
// const io = new Server(httpServer, {path: publicDirectoryPath});

// io.on("connection", (socket) => {
//   console.log("new websocket connection");
// });

// httpServer.listen(3000)

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

// app.use((req, res, next) => {
//   res.status(503).send("Send is currently down, Check back soon!");
// });

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "build", "index.html"));
});

export default server;
