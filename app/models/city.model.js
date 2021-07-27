module.exports = (sequelize, Sequelize) => {
    const City = sequelize.define("cities", {
        title: {
            type: 'TIMESTAMP',
        },

    });

    return City;
};
