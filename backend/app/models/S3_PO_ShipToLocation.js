const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('S3_PO_ShipToLocation', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Name'
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: true,
      primaryKey: true,
      field: 'Code'
    },
    addr1: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'Addr 1'
    },
    addr2: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Addr 2'
    },
    city: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'City'
    },
    state: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'State'
    },
    zip: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'Zip'
    }
  }, {
    sequelize,
    tableName: 'S3_PO_ShipToLocation',
    schema: 'dbo',
    timestamps: false,
    indexes: []
  });
};
