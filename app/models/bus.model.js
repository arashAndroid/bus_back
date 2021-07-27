module.exports = (sequelize, Sequelize) => {
    const Bus = sequelize.define("bus", {
        title: {
            type: Sequelize.STRING
        },
        capacity: {
            type: Sequelize.INTEGER
        },
        plate: {
            type: Sequelize.STRING
        },

    });

    return Bus;
};
