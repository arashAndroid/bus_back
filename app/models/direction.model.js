module.exports = (sequelize, Sequelize) => {
  const Direction = sequelize.define("direction", {
    title: {
      type: Sequelize.STRING,
    },
  });

  return Direction;
};
