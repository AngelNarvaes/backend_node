const express = require("express");

const cors = require('cors');
const Route = require("./router");

const app = express();

const PORT = 3000;

// <-- Permite peticiones desde cualquier origen
app.use(cors());
app.use(express.json());


app.get("/", function (req, res) {
  return res.json({ mensaje: "Bien venido a mi proyecto backend API" });
});


app.use("/api", Route);

app.listen(PORT, function () {
  console.log(`servidor iniciado en; http://127.0.0.1:${PORT}`);
});
