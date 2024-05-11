import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const ormconfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'viewer',
  synchronize: true,
  logging: false,
  entities: [`${__dirname}/../**/*.entity{.ts,.js}`]
};
export default ormconfig;
