const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/goals", (req, res) => {
  const data = fs.readFileSync("./data.json");
  const goals = JSON.parse(data);
  res.send(goals);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
