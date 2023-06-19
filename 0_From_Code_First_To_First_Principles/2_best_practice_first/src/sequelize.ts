
import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user';

const sequelize = new Sequelize({
  database: 'mydatabase',
  username: 'postgres',
  password: 'mysecretpassword',
  host: 'postgres',
  port: 5432,
  dialect: 'postgres',
  models: [
    User
  ]
});

export default sequelize;
