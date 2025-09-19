import "libs/helpers/dotenv.helper";

import express from "express";
import bodyParser from "body-parser";
import router from "./router/index";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const session = require("express-session");
const RedisStore = require("connect-redis")(session);
import redisHelper from "libs/helpers/redis.helper";
import passport from "passport";
import logger from "libs/helpers/winston.helper";
import { SERVER_PORT, ENVIRONMENT } from "libs/config/config";
import { errorHandler } from 'libs/controllers/log.controller'

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    store: new RedisStore({ client: redisHelper }),
    secret: "your secret",
    rolling: true,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: ENVIRONMENT === "production", // Set to true only if using HTTPS in production
      sameSite: "Lax", // 'Lax' allows cookies on top-level navigations and POST requests from other sites
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(router);

console.log(
  `------------------- ENVIRONMENT : ${ENVIRONMENT} -------------------`
);

app.use(errorHandler)

app.listen(SERVER_PORT, () => {
  logger.info(`Server running on port ${SERVER_PORT}`);
});

export default app;
