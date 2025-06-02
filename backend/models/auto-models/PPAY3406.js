const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PPAY3406', {
    USG: {
      type: DataTypes.STRING(1),
      allowNull: true
    },
    BUSY: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNLSSN: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CNLJOB: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNLSEQ: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNLINE: {
      type: DataTypes.TIME,
      allowNull: false
    },
    CNTRAC: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNLADD: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CNLAMT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    CNLPCT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    CNLDES: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CNLACT: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CNLDOK: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CNLENC: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    CNASDT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNAEDT: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNNCHK: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNACHK: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNPCHK: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    CNAAMT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    CNMAMT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    CNPAMT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    MEMBER: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'PPAY3406',
    schema: 'dbo',
    timestamps: false,
    underscored: true
  });
};
