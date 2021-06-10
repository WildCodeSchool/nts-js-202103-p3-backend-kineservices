const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
// TODO: configure cors
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
// TODO: add your routes here

module.exports = app;
