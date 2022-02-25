require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const cors = require('cors');
const { errors } = require('celebrate');
const { databaseUrl, databaseSettings } = require('./configs/database');
const errorHandler = require('./middlewares/error-handler');
const errorRoutes = require('./middlewares/error-routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsOptions = require('./configs/cors');
const rateLimiter = require('./configs/rate-limiter');

const router = require('./routes/index');

const { PORT = 3000 } = process.env;

const app = express();

mongoose
  .connect(databaseUrl, databaseSettings)
  .then(() => console.log('Mongo_OK'))
  .catch((e) => console.log(e));

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(rateLimiter);
app.use(requestLogger);

app.use(router);

app.use(errorRoutes);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listing on port ${PORT}`);
});
