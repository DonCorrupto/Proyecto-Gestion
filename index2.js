var express = require("express");
var app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "web")));

app.listen(3000);
