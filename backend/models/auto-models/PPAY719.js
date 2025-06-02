const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY719', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ADAT: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING(50),
      allowNull: false
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    ID: {
      type: DataTypes.STRING(1),
      allowNull: true,
      primaryKey: true
    },
    REPORT: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    TITLE: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    ACTIVE: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    TONLY: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    WSBR01: {
      type: DataTypes.SMALLINT,
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
      type: DataTypes.SMALLINT,
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
    WSBR18: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    CUTOFF: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    FORMNO: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COPIES: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    DEVICE: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    LINES: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL1: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL2: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL3: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL4: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL5: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL6: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL7: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL8: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL9: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL10: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL11: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL12: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL13: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL14: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL15: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL16: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL17: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL18: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL19: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL20: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL21: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL22: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL23: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL24: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL25: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL26: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL27: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL28: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL29: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    COL30: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    REPFMT: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYSSN: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYORG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYBLD: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYSTA: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    PYPAS: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    PYMAJ: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYMIN: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYEXP: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYDEG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYETH: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYSEX: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    PYBDT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYCAT1: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCAT2: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCAT3: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCAT4: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCAT5: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCT1: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    PYCT2: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCT3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCT4: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCT5: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYPMS: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYSSNP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYAPHP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYORGP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYBLDP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYSTAP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYPASP: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    PYMAJP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYMINP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYEXPP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYDEGP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYETHP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYSEXP: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    PYBDTP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYCT1P: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYCT2P: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYCT3P: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYCT4P: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYCT5P: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYPMSP: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    PYINOM: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PYSNGL: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PYAOOR: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PPAY719',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
