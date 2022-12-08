module.exports = (sequelize, Sequelize) => {
    const mainadmin = sequelize.define(
        "mainadmins", {
        mainAdmin_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        token: { 
            type: Sequelize.STRING 
        }
    },
    {
        createdAt: false,
        updatedAt: false
    }
    );
    return mainadmin;
};