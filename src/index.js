const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", function (req, res) {
  return res.json({ mensaje: "Bien venido a mi proyecto backend API" })
})

app.listen(PORT, function () {
  console.log(`servidor iniciado en; http://127.0.0.1:${PORT}`);
  // solo se agrega comentario



})