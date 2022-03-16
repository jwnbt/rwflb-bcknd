const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/goals", (req, res) => {
  res.send({ name: "workout", done: false, date: null });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
