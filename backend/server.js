import express from 'express'
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
const port = process.env.PORT || 5000;
import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import chatRouter from './routes/chatRoute.js';
import messageRouter from './routes/messageRouter.js';
import path from "path";
import { fileURLToPath } from "url";
import { dirname, join } from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
connectDB();
const app = express();

app.use((req, res, next) => {
    res.set("Cache-Control", "no-store, no-cache");
     next();
    });
  

  

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use('/api/users',userRoutes);
app.use('/api/users/admin',adminRoutes);
app.use("/api/users/chat", chatRouter);
app.use("/api/users/message", messageRouter);

// app.get('/', (req, res) => res.send('Server is Ready'));
app.use(express.static(path.join(__dirname, 'dist'), { type: 'module' }));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.use(errorHandler);
app.use(notFound);


const server = app.listen(port, () => console.log(`Server started on port ${port}`));

const io = new Server(server, {
  pingTimeOut: 60000,
  cors: {
    origin : 'http://localhost:3000',
  }
});


io.on('connection', (socket) => {
  console.log("connected to socket.io");
  socket.on('setup', (userData) => {
    socket.join(userData && userData._id);
console.log(userData._id,"userData._id")
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User joined room: ", room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));


  socket.on('new message', (newMessageReceived) => {
    var chat = newMessageReceived.chat;

    if(!chat.users) return console.log('chat.user not defined');

    chat.users.forEach((user) => {
      if (user._id == newMessageReceived.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageReceived);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});