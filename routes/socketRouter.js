const express = require("express");

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
    io.emit("timer1start", "");
    res.json({
      message: "start",
    });
  });

  router.get("/timer1minus", (req,res)=>{
    io.emit("timer1minus", "");
    res.json({
      message: "minus"
    })
  })

  router.get("/timer1stop", (req,res)=>{
    io.emit("timer1stop", "");
    res.json({
      message: "stop"
    })
  })

  return {
    router,
  };
}

module.exports = socketRouter;
