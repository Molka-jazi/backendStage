  module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
      text: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return users;
  };
  