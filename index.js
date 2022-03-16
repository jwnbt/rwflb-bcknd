const express = require("express");
var cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.get("/goals", (req, res) => {
  res.send({ name: "workout", done: false, date: null });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
