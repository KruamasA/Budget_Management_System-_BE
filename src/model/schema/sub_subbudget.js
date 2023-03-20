module.exports = (sequelize, Sequelize) => {
    const sub_subbudget = sequelize.define(
        "sub_subbudgets", {
        sub_subbudget_id: {
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
        subbudget_id: {
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
        },
        due_date: {
            type: Sequelize.DATE
        },
        use: {
            type: Sequelize.INTEGER
        },
        save_date: {
            type: Sequelize.DATE
        }
    }, 
        {
            createdAt: true,
            updatedAt: true,
            timestamp: true,
        }
    );
    return sub_subbudget;
};

