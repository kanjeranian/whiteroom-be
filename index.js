const express = require("express");
const app = express();
const cors = require('cors')
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const socketRouter = require("./routes/socketRouter")(io).router;
app.use(
  cors({
    origin: "*",
    preflightContinue: false
  })
);

io.on("connection", (socket) => {
  // console.log(socket.id);
});

app.use("/api/v1", socketRouter);

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

server.listen(8001, () => {
  console.log("Server is running");
});
