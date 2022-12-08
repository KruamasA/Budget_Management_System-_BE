module.exports = (sequelize, Sequelize) => {
    const superbudget = sequelize.define(
        "superbudgets", {
        superbudget_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        budget: {
            type: Sequelize.INTEGER,
        },
        budgetgroup_id: {
            type: Sequelize.INTEGER,
        },
        fiscalyear_id: {
            type: Sequelize.INTEGER,
        }
    },
        {
            createdAt: true,
            updatedAt: true,
            timestamp: true,
        }
    );
    return superbudget;
};

