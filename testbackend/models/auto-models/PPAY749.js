const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY749', {
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
      allowNull: true
    },
    SRT1: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT2: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT3: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT4: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT5: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT6: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT7: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT8: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT9: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT10: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT11: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT12: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT13: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT14: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT15: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT16: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT17: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    SRT18: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    EMSSAN: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    EMHORG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMBLDG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMSTAT: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    EMPASN: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    EMMAJ1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMIN1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMEXP1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMDEG1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMETH8: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMSEX: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    EMBDT1: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    EMBDT2: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    EMBDT3: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    EMCAT1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMCAT2: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMCAT3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMCAT4: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    EMCAT5: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    ACTIVE: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    TONLY: {
      type: DataTypes.BOOLEAN,
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
      type: DataTypes.BOOLEAN,
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
    REPFMT: {
      type: DataTypes.STRING(50),
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
    PYJOB: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCAT1: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCAT2: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCAT3: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCAT4: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCAT5: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    PYCT1: {
      type: DataTypes.STRING(1),
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
    PYSSNP: {
      type: DataTypes.BOOLEAN,
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
    PYJOBP: {
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
    PYINOM: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PYSNGL: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    PYAOOR: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PPAY749',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
