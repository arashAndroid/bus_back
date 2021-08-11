module.exports = (sequelize, Sequelize) => {
  const TravelDetail = sequelize.define("travel_details", {
    departureDatetime: {
      type: Sequelize.DATE,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  });

  return TravelDetail;
};
