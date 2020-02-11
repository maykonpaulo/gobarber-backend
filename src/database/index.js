import { Sequelize } from 'sequelize';

import mongoose from 'mongoose';
import databaseConfig from '../config/database';

import { File, User, Appointment } from '../app/models';

const models = [File, User, Appointment];

class Database {
  constructor() {
    this.sequelize();
    this.mongo();
  }

  sequelize() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: true,
      useUnifiedTopology: true
    });
  }
}

export default new Database();
