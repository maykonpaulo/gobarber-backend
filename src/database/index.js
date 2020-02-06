import { Sequelize } from 'sequelize';

import databaseConfig from '../config/database';

import { File, User, Appointment } from '../app/models';

const models = [File, User, Appointment];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
