const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  const data = fs.readFileSync("./data.json");
  const goals = JSON.parse(data);
  res.send(goals);
});

app.get("/goals", (req, res) => {
  res.send({ name: "workout", done: false, date: null });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
