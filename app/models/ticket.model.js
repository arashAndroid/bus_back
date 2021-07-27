module.exports = (sequelize, Sequelize) => {
    const Ticket = sequelize.define("tickets", {
        qrCode: {
            type: Sequelize.STRING,
        },

    });

    return Ticket;
};
