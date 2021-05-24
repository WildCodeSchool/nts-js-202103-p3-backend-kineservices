const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
// TODO: configure cors
app.use(cors());

// TODO: add your routes here

module.exports = app;
