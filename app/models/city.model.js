module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("cities", {
        title: {
            type: Sequelize.STRING,
        },

    });

    return City;
};
