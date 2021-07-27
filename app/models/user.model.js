module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        cash: {
            type: Sequelize.INTEGER
        },
        password: {
            type: Sequelize.STRING
        }
    });

    return User;
};