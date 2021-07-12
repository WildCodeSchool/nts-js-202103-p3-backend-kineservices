const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(express.static('public'));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

module.exports = app;
