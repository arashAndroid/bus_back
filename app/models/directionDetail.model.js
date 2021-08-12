module.exports = (sequelize, Sequelize) => {
  const DirectionDetail = sequelize.define("direction_details", {
    distanceFromSource: {
      type: Sequelize.INTEGER,
    },
    durationFromSource: {
      type: Sequelize.INTEGER,
    },
    order: {
      type: Sequelize.INTEGER,
    },
  });

  return DirectionDetail;
};
