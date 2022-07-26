
const { DATE } = require("sequelize");
var Sequelize = require("sequelize");
 
// create a sequelize instance with our local postgres database information.
const sequelize = new Sequelize("stage", "root", "", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  operatorsAliases: 0,
});  

const Users = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type:Sequelize.DATE
  },
  updatedAt:{
    allowNull: false,
    type: Sequelize.DATE
  }
});
module.exports =  {Users}


