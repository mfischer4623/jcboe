const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PEIS127A', {
    LSLOC: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    LSSEC: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    LSUSG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    LSBUSY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PEIS127A',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
