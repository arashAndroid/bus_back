module.exports = (sequelize, Sequelize) => {
    const Travel = sequelize.define("travels", {
        departureDatetime: {
            type: 'TIMESTAMP',
        },
        price: {
            type: Sequelize.INTEGER
        },
        status: {
            type: Sequelize.INTEGER
        },

    });

    return Travel;
};
