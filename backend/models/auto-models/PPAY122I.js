const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY122I', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    DATABL: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    DAJURS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DATYPE: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    DASCOD: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DASJUR: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    DAPROC: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    DALLIN: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PPAY122I',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
