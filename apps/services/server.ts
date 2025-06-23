import app from './src/app';
import logger from 'libs/helpers/winston.helper';
import { SERVER_PORT } from 'libs/config/config';

app.listen(SERVER_PORT, () => {
  logger.info(`Server running on port ${SERVER_PORT}`)
});