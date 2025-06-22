import 'winston-daily-rotate-file'

import * as path from 'path'

import * as winston from 'winston'

const logger: winston.Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf((info) => `${info.level} [${info.timestamp}] ${info.message}`),
        winston.format.splat(),
      ),
      level: 'debug',
    }),
    new winston.transports.DailyRotateFile({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      filename: path.join(process.cwd(), 'logs', 'console', '%DATE%.json'),
      datePattern: 'YYYY-MM-DD',
      createSymlink: true,
    }),
  ],
})

export default logger
