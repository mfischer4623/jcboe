const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY408B', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLSSN: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLJOB: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLJSQ: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLPED: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLLIN: {
      type: DataTypes.TIME,
      allowNull: false
    },
    TWLSRL: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLDAT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLDAY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLLOC: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLDES: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TWLQTY: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TWLTYP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLORT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TWLRAT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TWLACT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TWLXSN: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLXJB: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TWLXJS: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLXSR: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLSPF: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLSPT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLSCD: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TWLCUS: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    TWLCDT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PPAY408B',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
