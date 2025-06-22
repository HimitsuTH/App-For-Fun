import { Sequelize } from 'sequelize'
import winston from './winston.helper'
// use sequenlize
const sequelize = new Sequelize(process.env.DB as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT as string),
  dialect: process.env.DB_DIALECT as 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql',
});


sequelize.authenticate()
  .then(() => winston.info(`Database Connected ${process.env.DB_HOST}:${process.env.DB_PORT}`))
  .catch((err: any) => winston.error(`Unable to connect to database with ${process.env.DB_HOST}:${process.env.DB_PORT}`, err))

export default sequelize