const express = require('express');
require('dotenv').config();
const cors = require('cors');
const documentationRouter = require('./routes/documentation');
const signupRouter = require('./routes/signup');
const categoryRouter = require('./routes/category');
const serviceRouter = require('./routes/service');
const signIn = require('./routes/signIn');

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);

app.use('/documentation', documentationRouter);
app.use('/signup', signupRouter);
app.use('/category', categoryRouter);
app.use('/service', serviceRouter);
app.use('/connexion', signIn);
app.use('/signup', signupRouter);
app.use('/category', categoryRouter);

app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});
