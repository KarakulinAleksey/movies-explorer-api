require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // 15
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');
// const routerUsers = require('./routes/users');
// const routerMovies = require('./routes/movies');
// const auth = require('./middlewares/auth');
// const { createUser, login } = require('./controllers/users');
const errorHandler = require('./middlewares/error-handler');
const errorRoutes = require('./middlewares/error-routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./configs/cors');
const rateLimiter = require('./configs/rate-limiter');

/* const {
  loginValidator,
  createUserValidator,
} = require('./validators/celebrate-validators'); */

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect(process.env.NODE_ENV === 'production' ? process.env.DATABASE : 'mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
  })
  .then(() => console.log('Mongo_OK'))
  .catch((e) => console.log(e));

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(rateLimiter);
app.use(requestLogger);

/* app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

app.use(auth);

app.use(routerUsers);
app.use(routerMovies); */

app.use(router);

app.use(errorRoutes);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
