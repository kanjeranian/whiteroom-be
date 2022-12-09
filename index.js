const express = require("express");
const cors = require('cors')
const app = express();

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
}))

const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
// add socket router
const socketRouter = require("./routes/socketRouter")(io).router;

app.use("/api/v1", socketRouter);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});

io.on("connection", (socket) => {
  console.log(socket.id);
});

server.listen(8001, () => {
  console.log("Server is running");
});
