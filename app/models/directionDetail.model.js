module.exports = (sequelize, Sequelize) => {
  const DirectionDetail = sequelize.define("direction_details", {
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

  return DirectionDetail;
};
