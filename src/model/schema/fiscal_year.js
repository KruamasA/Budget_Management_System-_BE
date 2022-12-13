module.exports = (sequelize, Sequelize) => {
    const fiscalyear = sequelize.define(
        "fiscalyears", {
        fiscalyear_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING
        },
        budget: {
            type: Sequelize.INTEGER
        },
        total: {
            type: Sequelize.INTEGER
        },
        remain: {
            type: Sequelize.INTEGER
        },
        creator: {
            type: Sequelize.STRING
        }
    },
        {
            createdAt: true,
            updatedAt: true,
            timestamp: true,
        }
    );
    return fiscalyear;
};