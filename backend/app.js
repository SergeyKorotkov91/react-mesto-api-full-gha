const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const routes = require('./routes/index');
const error = require('./middlewares/error')
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;

const app = express();
app.use(requestLogger);
app.use(express.json());
app.use(helmet());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cors({
  origin: [
    'https://kanc1er.nomoreparties.co',
    'http://kanc1er.nomoreparties.co',  
    'http://localhost:3000'
  ],
  credentials: true,
  maxAge: 30,
}));

mongoose.connect(config.mongodbURI, {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

app.use(cookieParser());

app.use('/', routes);

app.use(errorLogger);

app.use(errors());

app.use(error);

app.listen(PORT);
