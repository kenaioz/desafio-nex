import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  NODE_ENV: string;
  MYSQL_USER: string;
  MYSQL_ROOT_PASSWORD?: string;
  MYSQL_DATABASE?: string;
  MYSQL_HOST: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  MYSQL_USER: process.env.MYSQL_USER || 'root',
  MYSQL_ROOT_PASSWORD: process.env.MYSQL_ROOT_PASSWORD,
  MYSQL_DATABASE: process.env.MYSQL_DATABASE,
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
};

export default config;
