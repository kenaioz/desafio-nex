import { Sequelize } from 'sequelize-typescript';
import { Transaction } from '../models/Transactions';

import config from '../config/env';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.MYSQL_HOST,
  username: config.MYSQL_USER,
  password: config.MYSQL_ROOT_PASSWORD,
  database: config.MYSQL_DATABASE,
  models: [Transaction],
  logging: false,
});
