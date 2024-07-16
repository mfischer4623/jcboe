const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY305', {
    BUSY: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMSSN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ETMDTJ: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ETMDAT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ETMCDE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMDS1: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMDS2: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMDS3: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMDS4: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMDS5: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMDS6: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMSTS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMDTS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ETMDTC: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PPAY305',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
