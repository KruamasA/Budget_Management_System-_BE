module.exports = (sequelize, Sequelize) => {
    const budgetgroup = sequelize.define(
        "budgetgroups", {
        budgetgroup_id: {
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
        fiscalyear_id: {
            type: Sequelize.INTEGER
        },
        creator: {
            type: Sequelize.STRING
        }, 
        note: {
            type: Sequelize.STRING
        }

    },
        {
            createdAt: true,
            updatedAt: true,
            timestamp: true,
        }
    );
    return budgetgroup;
};