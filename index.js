const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 1000;
const bodyParserJSON = bodyParser.json();
const dataFilePath = "./data.json";

app.use(cors());

app.get("/", (req, res) => {
  res.send({ msg: "welcome" });
});

app.get("/goals", (req, res) => {
  fs.readFile("./data.json", "utf-8", (err, goals) => {
    if (err) throw err;
    console.log(`Goals Requested`);
    res.send(goals);
  });
});

app.put("/goals", bodyParserJSON, (req, res) => {
  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const nextPkey = parsedData.length + 1;
    const goalToAdd = { pkey: nextPkey, ...req.body };
    const dataToWrite = [...parsedData, goalToAdd];
    const dataToWriteJSON = JSON.stringify(dataToWrite, null, 2);
    fs.writeFile(dataFilePath, dataToWriteJSON, (err) => {
      if (err) throw err;
      console.log(`goal added: ${JSON.stringify(goalToAdd)}`);
    });
  });
  res.send("goal added");
});

app.patch("/goals", bodyParserJSON, (req, res) => {
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
      console.log(`goal updated: ${req.body}`);
    });
  });
  res.send("goal updated");
});

app.delete("/goals", bodyParserJSON, (req, res) => {
  fs.readFile(dataFilePath, "utf-8", (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const goalToDelIndex = parsedData.findIndex(
      (goal) => goal.pkey === req.body.pkey
    );
    parsedData.splice(goalToDelIndex, 1);
    const dataToWrite = [...parsedData];
    const dataToWriteJSON = JSON.stringify(dataToWrite, null, 2);
    fs.writeFile(dataFilePath, dataToWriteJSON, (err) => {
      if (err) throw err;
      console.log(`goal deleted: ${req.body}`);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
