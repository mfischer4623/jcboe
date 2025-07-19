const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY775', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BDEMPL: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BDDEDC: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    BDCODE: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BDVALU: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    BDCOST: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    BDPURC: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BDYR01: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BDMO01: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    BDDY01: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PPAY775',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
