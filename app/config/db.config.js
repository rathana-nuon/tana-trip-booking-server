const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;
 
db.user = require('../model/User')(sequelize, Sequelize);
db.trip = require('../model/Trip')(sequelize, Sequelize);
db.place = require('../model/Place')(sequelize, Sequelize);
 
// db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
// db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
db.user.hasMany(db.trip, { foreignKey: 'post_by'});
db.trip.belongsTo(db.user, {foreignKey: 'post_by'});

db.user.hasMany(db.place, { foreignKey: 'user_id'});
db.place.belongsTo(db.user, {foreignKey: 'user_id'});

db.trip.hasMany(db.place, { foreignKey: 'trip_id'});
db.place.belongsTo(db.trip, {foreignKey: 'trip_id'});

module.exports = db;