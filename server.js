const express = require('express');
const app = express();

appset('view engine', 'ejs');
app.use(express.static("public"));