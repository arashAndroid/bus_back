module.exports = (sequelize, Sequelize) => {
    const Driver = sequelize.define("users", {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.INTEGER
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return Driver;
};