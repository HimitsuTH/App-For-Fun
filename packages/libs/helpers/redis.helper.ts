import Redis from 'ioredis'
import logger from './winston.helper'
import { REDIS_HOST , REDIS_PORT } from '../config/config';

const redisHelper = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
})


redisHelper.on('error', (err: any) => {
    logger.error('Redis Connect Failed...', err)
    throw new Error('Rediis Connect Failed...')
})

redisHelper.on('connect', () => logger.info('Redis Connect Success...'))


export default redisHelper