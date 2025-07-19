const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY150', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ADAT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    RETN: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    SESN: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CM: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    STMP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    BCCOCD: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    BCLOC: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    BCCONM: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    BCCOAD: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    BCCOCY: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    BCCOST: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    BCCOZ1: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    BCCOZ2: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    BCRACT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    BCRACB: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    BCRDSG: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PPAY150',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
