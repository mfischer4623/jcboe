const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY408A', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLSSN: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLJOB: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    TMLJSQ: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLPED: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLLIN: {
      type: DataTypes.TIME,
      allowNull: false
    },
    TMLSRL: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLDAT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLLOC: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    TMLDAY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLABS: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TMLRSN: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TMLQTY: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TMLDRT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    TMLDAC: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TMLDES: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TMLXSN: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLXJB: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TMLXJS: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLXSR: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    TMLCUS: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    TMLCDT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PPAY408A',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
