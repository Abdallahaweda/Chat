// import dotenv from "dotenv";
// dotenv.config();
require("dotenv").config();
const express = require("express");
const cors = require("cors");
// import { Server } from "socket.io";
const path = require("path");
// import { fileURLToPath } from "url";
const mongoose = require("mongoose");
const userRouote = require("./Routes/userRoute.js");
const chatRouote = require("./Routes/chatRoute.js");
const messageRouote = require("./Routes/messageRouote.js");
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
let app = express();

let PORT = process.env.PORT || 3000;
let uri = process.env.ATLAS_URI;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/users", userRouote);
app.use("/api/chats", chatRouote);
app.use("/api/messages", messageRouote);

app.listen(PORT, (req, res) => {
  console.log(`Server's running on port ${PORT}`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connection established"))
  .catch((error) => console.log("MongoDB connection failed: ", error.message));
