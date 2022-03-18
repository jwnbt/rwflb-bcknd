const fs = require("fs");

const data = [];
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const day = date.getDate();
console.log(new Date(`${year}/${month}/${day}`));
