module.exports = (sequelize, Sequelize) => {
    const admin = sequelize.define(
        "admins", {
        admin_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        fname: {
            type: Sequelize.STRING
        },
        lname: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        mainAdmin_id: {
            type : Sequelize.INTEGER
            // type : Sequelize.{$main_admin}.{$mainAdmin_id}
        },
        token: { 
            type: Sequelize.STRING 
        }
    },
        {
            createdAt: true,
            updatedAt: true,
            timestamp: true,
        }
    );
    return admin;
};