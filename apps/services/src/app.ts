import 'libs/helpers/dotenv.helper'

import express from 'express';
import bodyParser from 'body-parser';
import router from './router/index'

const app = express();

const session = require('express-session');
const RedisStore = require('connect-redis')(session);
import redisHelper from 'libs/helpers/redis.helper';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router)

app.use(session({
  store: new RedisStore({ client: redisHelper }),
  secret: 'your secret',
  resave: false,
  saveUninitialized: false,
}));



export default app
