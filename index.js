const fs = require("fs");
const path = require("path");
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
  res.send(goals[1]);
});

app.post("/goals/:userName", bodyParser.json(), (req, res) => {
  const userFolderPath = path.join("./app-data/users", req.params.userName);
  const userDirExists = fs.existsSync(userFolderPath);
  console.log("in");
  console.log(userDirExists);
  if (userDirExists) {
    const userCredPath = path.join(userFolderPath, "cred.json");
    const data = fs.readFileSync(userCredPath, "utf-8");
    const parsedData = JSON.parse(data);
    const credAreMatch =
      req.body.username === parsedData.username &&
      req.body.password === parsedData.password;
    if (credAreMatch) {
      return res.send({ hasAccess: true });
    } else {
      return res.send([
        { hasAccess: false },
        parsedData,
        JSON.stringify(req.body),
      ]);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
