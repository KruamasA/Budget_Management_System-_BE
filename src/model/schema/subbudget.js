module.exports = (sequelize, Sequelize) => {
    const subbudget = sequelize.define(
        "subbudgets", {
        subbudget_id: {
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
        budgetgroup_id: {
            type: Sequelize.INTEGER
        },
        superbudget_id: {
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
    return subbudget;
};

