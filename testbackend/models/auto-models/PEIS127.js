const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PEIS127', {
    LCCODE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    LCNAME: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    LCSHRT: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    'LCADM#': {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    LCATL0: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    LCATL2: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    LCRLOC: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    'LCSEC#': {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    LCUSG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    LCBUSY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PEIS127',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
