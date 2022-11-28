const Sequelize = require('sequelize');
const { Op } = Sequelize;
let sequelizeInstance;

function getSequelizeInstance() {
  if (sequelizeInstance) {
    return sequelizeInstance;
  }

  const { logging: level, db } = require('config');
  const Sequelize = require("sequelize");

  const host = process.env.HOST || db.host;
  const database = process.env.DATABASE || db.database;
  const username = process.env.USER || db.username;
  const port = process.env.DBPORT || db.port;
  const password = process.env.PASSWORD || db.password;

  const dialectOpt = process.env.NODE_ENV === 'production' ? ({
    ssl: {
      rejectUnauthorized: false
    }
  }) : {};

  sequelizeInstance = new Sequelize(database, username, password, {
    host,
    port,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: level.level === 'debug',
    define: {
      freezeTableName: true,
      underscored: true,
    },
    ...dialectOpt
  });

  sequelizeInstance.options.define.underscored = true;
  return sequelizeInstance;
}

function startConfig(app) {
  let sequelize = getSequelizeInstance();
  let oldSetup = app.setup;

  app.set('sequelizeClient', sequelize);

  app.setup = function (...args) {
    let result = oldSetup.call(this, ...args);

    // Set up data relationships
    const models = sequelize.models;
    Object.keys(models).forEach(name => {
      if ('associate' in models[name]) {
        models[name].associate(models);
      }
    });

    // Sync to the database
    sequelize.sync({
      force: false,
      alter: false
    });

    return result;
  };
}

module.exports = { startConfig, getSequelizeInstance };