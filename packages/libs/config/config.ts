const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const SERVER_PORT = process.env.SERVER_PORT || 3001;
const ENVIRONMENT = process.env.ENVIRONMENT || 'DEV';

export { REDIS_HOST,REDIS_PORT ,SERVER_PORT, ENVIRONMENT }