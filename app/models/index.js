const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,

  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.bus = require("../models/bus.model.js")(sequelize, Sequelize);
db.busType = require("../models/busType.model.js")(sequelize, Sequelize);
db.city = require("../models/city.model.js")(sequelize, Sequelize);
db.ticket = require("../models/ticket.model.js")(sequelize, Sequelize);
db.driver = require("../models/driver.model.js")(sequelize, Sequelize);
db.travel = require("../models/travel.model.js")(sequelize, Sequelize);
db.travelDetail = require("../models/travelDetail.model.js")(
  sequelize,
  Sequelize
);
db.direction = require("../models/direction.model.js")(sequelize, Sequelize);
db.directionDetail = require("./directionDetail.model.js")(
  sequelize,
  Sequelize
);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.busType.hasMany(db.bus, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.bus.belongsTo(db.busType);

db.travel.hasMany(db.travelDetail, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.travelDetail.belongsTo(db.travel);

db.direction.hasMany(db.directionDetail, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.directionDetail.belongsTo(db.direction);

db.direction.hasMany(db.travel, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.travel.belongsTo(db.direction);

db.city.hasMany(db.directionDetail, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.directionDetail.belongsTo(db.city);

db.city.hasMany(db.travelDetail, {
  foreignKey: "destinationId",
  as: "destination",
  allowNull: false,
  onDelete: "RESTRICT",
});
db.travelDetail.belongsTo(db.city, {
  foreignKey: "destinationId",
  as: "destination",
  allowNull: false,
  onDelete: "RESTRICT",
});
db.city.hasMany(db.travelDetail, {
  foreignKey: "sourceId",
  as: "source",
  allowNull: false,
  onDelete: "RESTRICT",
});
db.travelDetail.belongsTo(db.city, {
  foreignKey: "sourceId",
  as: "source",
  allowNull: false,
  onDelete: "RESTRICT",
});

db.bus.hasMany(db.travel, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.travel.belongsTo(db.bus);

db.driver.hasMany(db.travel, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.travel.belongsTo(db.driver);

db.travel.hasMany(db.ticket, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.ticket.belongsTo(db.travel);

db.user.hasMany(db.ticket, {
  foreignKey: { allowNull: false },
  onDelete: "RESTRICT",
});
db.ticket.belongsTo(db.user);

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
