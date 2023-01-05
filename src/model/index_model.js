const Sequelize = require("sequelize");

const {database_name,host_db,password_db,username_db} = require("../config/config");
// const main_admin = require("./schema/main_admin");

const sequelize = new Sequelize(database_name, username_db, password_db, {
    dialect: "mysql",
    host: host_db,
    charset: "utf8",
    collate: "utf8_general_ci",
    operatorsAliaces: 0,
    timezone: "+07:00",
  });
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.mainadmins = require("./schema/main_admin")(sequelize,Sequelize)
db.subbudgets = require("./schema/subbudget")(sequelize,Sequelize)
db.admins = require("./schema/admin")(sequelize,Sequelize)
db.superbudgets = require("./schema/superbudget")(sequelize,Sequelize)
db.budgetgroups = require("./schema/budget_group")(sequelize,Sequelize)
db.fiscalyears = require("./schema/fiscal_year")(sequelize,Sequelize)


const {mainadmins,subbudgets,admins,superbudgets,budgetgroups,fiscalyears} = db

//admin 
mainadmins.hasMany(admins, {foreignKey: 'mainAdmin_id'});
admins.belongsTo(mainadmins, {foreignKey: 'mainAdmin_id'});

//budgetgroup
fiscalyears.hasMany(budgetgroups, {foreignKey: 'fiscalyear_id'});
budgetgroups.belongsTo(fiscalyears, {foreignKey: 'fiscalyear_id'});
// fiscalyears.belongsToMany(budgetgroups, {foreignKey: 'fiscalyear_id'});
// budgetgroups.belongsToMany(fiscalyears, {foreignKey: 'fiscalyear_id'});

//superbudget
fiscalyears.hasMany(superbudgets, {foreignKey: 'fiscalyear_id'});
superbudgets.belongsTo(fiscalyears, {foreignKey: 'fiscalyear_id'});

budgetgroups.hasMany(superbudgets, {foreignKey: 'budgetgroup_id'});
superbudgets.belongsTo(budgetgroups, {foreignKey: 'budgetgroup_id'});

// fiscalyears.belongsToMany(superbudgets, {foreignKey: 'fiscalyear_id'});
// superbudgets.belongsToMany(fiscalyears, {foreignKey: 'fiscalyear_id'});

// budgetgroups.belongsToMany(superbudgets, {foreignKey: 'budgetgroup_id'});
// superbudgets.belongsToMany(budgetgroups, {foreignKey: 'budgetgroup_id'});

//subbudget
fiscalyears.hasMany(subbudgets, {foreignKey: 'fiscalyear_id'});
subbudgets.belongsTo(fiscalyears, {foreignKey: 'fiscalyear_id'});

budgetgroups.hasMany(subbudgets, {foreignKey: 'budgetgroup_id'});
subbudgets.belongsTo(budgetgroups, {foreignKey: 'budgetgroup_id'});

superbudgets.hasMany(subbudgets, {foreignKey: 'superbudget_id'});
subbudgets.belongsTo(superbudgets, {foreignKey: 'superbudget_id'});

// fiscalyears.belongsToMany(subbudgets, {foreignKey: 'fiscalyear_id'});
// subbudgets.belongsToMany(fiscalyears, {foreignKey: 'fiscalyear_id'});

// budgetgroups.belongsToMany(subbudgets, {foreignKey: 'budgetgroup_id'});
// subbudgets.belongsToMany(budgetgroups, {foreignKey: 'budgetgroup_id'});

// superbudgets.belongsToMany(subbudgets, {foreignKey: 'superbudget_id'});
// subbudgets.belongsToMany(superbudgets, {foreignKey: 'superbudget_id'});


module.exports = db;