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
db.location = require('../model/Location')(sequelize, Sequelize);
db.city = require('../model/City')(sequelize, Sequelize);
db.district = require('../model/District')(sequelize, Sequelize);
db.commune = require('../model/Commune')(sequelize, Sequelize);
db.village = require('../model/Village')(sequelize, Sequelize);
db.likeTrip = require('../model/LikeTrip')(sequelize, Sequelize);
db.saveTrip = require('../model/SaveTrip')(sequelize, Sequelize);
 
// db.role.belongsToMany(db.user, { through: 'user_roles', foreignKey: 'roleId', otherKey: 'userId'});
// db.user.belongsToMany(db.role, { through: 'user_roles', foreignKey: 'userId', otherKey: 'roleId'});
db.user.hasMany(db.trip, { foreignKey: 'post_by', otherKey: 'post_by'});
db.trip.belongsTo(db.user, {foreignKey: 'post_by', otherKey: 'post_by'});

db.user.hasMany(db.place, { foreignKey: 'user_id', otherKey: 'user_id'});
db.place.belongsTo(db.user, {foreignKey: 'user_id', otherKey: 'user_id'});

db.trip.hasMany(db.place, { foreignKey: 'trip_id', otherKey: 'trip_id'});
db.place.belongsTo(db.trip, {foreignKey: 'trip_id', otherKey: 'trip_id'});

db.place.hasMany(db.location, { foreignKey: 'place_id', otherKey: 'place_id'});
db.location.belongsTo(db.place, {foreignKey: 'place_id', otherKey:'place_id'});

db.city.hasMany(db.district, { foreignKey: 'city_id', otherKey: 'city_id'});
db.district.belongsTo(db.city, {foreignKey: 'city_id', otherKey:'city_id'});

db.city.hasMany(db.location, { foreignKey: 'city_id', otherKey: 'city_id'});
db.location.belongsTo(db.city, {foreignKey: 'city_id', otherKey:'city_id'});

db.district.hasMany(db.commune, { foreignKey: 'district_id', otherKey: 'district_id'});
db.commune.belongsTo(db.district, {foreignKey: 'district_id', otherKey:'district_id'});

db.district.hasMany(db.location, { foreignKey: 'district_id', otherKey: 'district_id'});
db.location.belongsTo(db.district, {foreignKey: 'district_id', otherKey:'district_id'});

db.commune.hasMany(db.village, { foreignKey: 'commune_id', otherKey: 'commune_id'});
db.village.belongsTo(db.commune, {foreignKey: 'commune_id', otherKey:'commune_id'});

db.commune.hasMany(db.location, { foreignKey: 'commune_id', otherKey: 'commune_id'});
db.location.belongsTo(db.commune, {foreignKey: 'commune_id', otherKey:'commune_id'});

db.village.hasMany(db.location, { foreignKey: 'village_id', otherKey: 'village_id'});
db.location.belongsTo(db.village, {foreignKey: 'village_id', otherKey:'village_id'});

// table like
db.trip.hasMany(db.likeTrip, { foreignKey: 'trip_id', otherKey: 'trip_id'});
db.likeTrip.belongsTo(db.trip, {foreignKey: 'trip_id', otherKey:'trip_id'});

db.user.hasMany(db.likeTrip, { foreignKey: 'like_by', otherKey: 'like_by'});
db.likeTrip.belongsTo(db.user, {foreignKey: 'like_by', otherKey:'like_by'});

// table save
db.trip.hasMany(db.saveTrip, { foreignKey: 'trip_id', otherKey: 'trip_id'});
db.saveTrip.belongsTo(db.trip, {foreignKey: 'trip_id', otherKey:'trip_id'});

db.user.hasMany(db.saveTrip, { foreignKey: 'save_by', otherKey: 'save_by'});
db.saveTrip.belongsTo(db.user, {foreignKey: 'save_by', otherKey:'save_by'});


module.exports = db;