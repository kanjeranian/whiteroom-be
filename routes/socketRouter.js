const express = require("express");
var cors = require('cors')

function socketRouter(io) {
  const router = express.Router();

  router.get("/forecast", (req, res) => {
    const count = req.query.count;
    if (!count) {
      res.json({
        message: "data not found",
      });
    }
    io.emit("mod_forecast", count);
    res.json({
      message: "successful delivered",
    });
  });

  router.get("/timer1start", (req, res) => {
    console.log('start')
    res.header("Access-Control-Allow-Origin", "*");
    io.emit("timer1start", "start");
    res.json({
      message: "start",
    });
  });

  router.get("/timer1minus", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    io.emit("timer1minus", "minus");
    res.json({
      message: "minus"
    })
  })

  router.get("/timer1stop", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    io.emit("timer1stop", "stop");
    res.json({
      message: "stop"
    })
  })

  return {
    router,
  };
}

module.exports = socketRouter;
