const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1000;
const bodyParserJSON = bodyParser.json();
const dataFilePath = "./data.json";

app.use(cors({ origin: "https://wonderful-lovelace-495196.netlify.app" }));

app.get("/", (req, res) => {
  res.send({ msg: "welcome" });
});

app.get("/goals", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, goals) => {
    if (err) throw err;
    res.send(goals);
  });
});

app.put("/goals", bodyParserJSON, (req, res) => {
  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const nextPkey = parsedData.length + 1;
    const dataToWrite = [...parsedData, { pkey: nextPkey, ...req.body }];
    const dataToWriteJSON = JSON.stringify(dataToWrite, null, 2);
    fs.writeFile(dataFilePath, dataToWriteJSON, (err) => {
      if (err) throw err;
      console.log("data added");
    });
  });
  res.send("goal added");
});

app.patch("/goals", bodyParserJSON, (req, res) => {
  console.log(req.body);
  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const goalToUpdIndex = parsedData.findIndex(
      (goal) => goal.pkey === req.body.pkey
    );
    parsedData.splice(goalToUpdIndex, 1, req.body);
    const dataToWrite = [...parsedData];
    const dataToWriteJSON = JSON.stringify(dataToWrite, null, 2);
    fs.writeFile(dataFilePath, dataToWriteJSON, (err) => {
      if (err) throw err;
      console.log("data updated");
    });
  });
  res.send("goal updated");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
