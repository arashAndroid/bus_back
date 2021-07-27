module.exports = (sequelize, Sequelize) => {
    const BusType = sequelize.define("bus_types", {
        title: {
            type: Sequelize.STRING
        },

    });

    return BusType;
};
