const express = require('express');
require('dotenv').config();
const cors = require('cors');
const documentationRouter = require('./routes/documentation');
const signupRouter = require('./routes/signup');
const categoryRouter = require('./routes/category');
const signIn = require('./routes/signIn');
const formationRouter = require('./routes/formation');
const userRouter = require('./routes/profile');
const serviceRouter = require('./routes/service');
const putBcrypt = require('./routes/putBcrypt');

const app = express();
app.use(express.json());

const port = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.static('public'));

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/documentation', documentationRouter);
app.use('/category', categoryRouter);
app.use('/service', serviceRouter);
app.use('/connexion', signIn);
app.use('/category', categoryRouter);
app.use('/formation', formationRouter);
app.use('/profil', userRouter);
app.use('/signup', signupRouter);
app.use('/utilisateur', userRouter);
app.use('/putBcrypt', putBcrypt);

app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});
