import { Sequelize } from 'sequelize-typescript';

import config from '../config/env';

import { Transaction } from '../models/Transactions';
import { User } from '../models/Users';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: config.MYSQL_HOST,
  username: config.MYSQL_USER,
  password: config.MYSQL_ROOT_PASSWORD,
  database: config.MYSQL_DATABASE,
  models: [Transaction, User],
  logging: false,
});
