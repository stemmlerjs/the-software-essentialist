import { Sequelize, DataTypes, Model } from 'sequelize';

// Define your Sequelize instance
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'users.db', // SQLite database file
});


export const UserModel = sequelize.define('User', {
  // Model attributes are defined here
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false,
  modelName: 'User', // Model name
  tableName: 'users', // Table name in the database
});