const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY739', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ADAT: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    RETN: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    SESN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    CM: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    ID: {
      type: DataTypes.STRING(1),
      allowNull: true,
      primaryKey: true
    },
    REPORT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TITLE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    ACTIVE: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    TONLY: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ABSID: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    WSBR01: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR02: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR03: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR04: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR05: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR06: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR07: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR08: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR09: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR10: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR11: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR12: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR13: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR14: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR15: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR16: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR17: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CUTOFF: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    FORMNO: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COPIES: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    DEVICE: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    LINES: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL1: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL2: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL4: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL5: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL6: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL7: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL8: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL9: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL10: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL11: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL12: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL13: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    COL14: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL15: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL16: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL17: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL18: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL19: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL20: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    COL21: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    REPFMT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PYSSN: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYORG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYBLD: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCC1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCC2: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCC3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCC4: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCC5: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCV1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCV2: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCV3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCB4: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCV5: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYSSNP: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYAPHP: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    PYORGP: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYBLDP: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCT1P: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCT2P: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCT3P: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCT4P: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCT5P: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYINOM: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PYSNGL: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PYAOOR: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'PPAY739',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
