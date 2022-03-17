const fs = require("fs");

const data = fs.readFileSync("./data.json");

fs.writeFileSync("./data.json");
