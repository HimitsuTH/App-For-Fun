import "libs/helpers/dotenv.helper";

import express from "express";
import bodyParser from "body-parser";
import router from "./router/index";

const app = express();

const session = require("express-session");
const RedisStore = require("connect-redis")(session);
import redisHelper from "libs/helpers/redis.helper";
import passport from "passport";
import logger from 'libs/helpers/winston.helper';
import { SERVER_PORT } from 'libs/config/config';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    store: new RedisStore({ client: redisHelper }),
    secret: "your secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.listen(SERVER_PORT, () => {
  logger.info(`Server running on port ${SERVER_PORT}`)
});

export default app;
