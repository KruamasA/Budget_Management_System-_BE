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
        },
        creator: {
            type: Sequelize.STRING
        },
        note: {
            type: Sequelize.STRING
        },
        due_date: {
            type: Sequelize.DATE
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

