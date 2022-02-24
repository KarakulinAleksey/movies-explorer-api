const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const routerUsers = require('./routes/users');
const { createUser, login } = require('./controllers/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('Mongo_OK'))
  .catch((e) => console.log(e));

app.use(bodyParser.json());

app.post('/signin', /* loginValidator, */ login);
app.post('/signup', /* createUserValidator, */ createUser);

app.use(routerUsers);

app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
