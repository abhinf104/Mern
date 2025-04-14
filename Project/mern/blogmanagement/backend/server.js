const express = require("express");
const cors = require("cors");
const http = require("http"); // Add this import
const { Server } = require("socket.io"); // Change this import
const connectDB = require("./config/mongodb.js");
const connectCloudinary = require("./config/cloudinary.js");
require("dotenv").config();
const authRouter = require("./routes/auth-routes");
const userRouter = require("./routes/user-routes");
const postRouter = require("./routes/post-routes");
const imageRouter = require("./routes/image-routes");
const commentRouter = require("./routes/comment-routes");
const notFound = require("./middlewares/not-found");

//for parsing cookie into json
const cookieParser = require("cookie-parser");
// app config
const app = express();
const PORT = 3000;

// Create HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.IO event handlers
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Handle joining a post's room
  socket.on("joinPost", (postId) => {
    socket.join(`post_${postId}`);
    console.log(`Socket ${socket.id} joined post_${postId}`);
  });

  // Handle leaving a post's room
  socket.on("leavePost", (postId) => {
    socket.leave(`post_${postId}`);
    console.log(`Socket ${socket.id} left post_${postId}`);
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// middlewares
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "http://localhost:5173",
    ], // frontend URLs
    credentials: true,
  })
);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));

//creating routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
// --- Ensure you are using .router if imageRouter is an object ---
app.use("/api/images", imageRouter); // Assuming imageRouter exports { router: ... }
// --- End Check ---
app.use("/api/comments", commentRouter);

// Error handling middlewares
app.use(notFound);

const start = async () => {
  try {
    await connectDB();
    await connectCloudinary();

    // Important: Use 'server.listen' instead of 'app.listen'
    server.listen(PORT, () => {
      console.log(`Server is listening at http://localhost:${PORT}`);
      console.log(`Socket.IO is ready for connections`);
    });
  } catch (error) {
    console.log("Server startup error:", error);
  }
};
start();
