module.exports = (sequelize, Sequelize) => {
    const Bus = sequelize.define("buses", {
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
