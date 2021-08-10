module.exports = (sequelize, Sequelize) => {
  const DirectionStation = sequelize.define("direction_stations", {
    distanceFromSource: {
      type: Sequelize.INTEGER,
    },
    arrivalTime: {
      type: Sequelize.DATE,
    },
    order: {
      type: Sequelize.INTEGER,
    },
  });

  return DirectionStation;
};
