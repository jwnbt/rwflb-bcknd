const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("nothing here");
});

app.get("/goals", (req, res) => {
  const data = fs.readFileSync("./data.json");
  const goals = JSON.parse(data);
  res.send(goals);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
